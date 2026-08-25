import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/redis.constants';
import { RedisService } from 'src/shared/redis.service';

@Injectable()
export class ShipRepository {
  private readonly logger = new Logger(ShipRepository.name);
  
  // In-memory storage for batching
  private shipPositions: Map<string, any> = new Map();
  private shipStaticData: Map<string, any> = new Map();
  private pendingPositionWrites: Map<string, any> = new Map();
  private pendingStaticWrites: Map<string, any> = new Map();

  private batchSize = Number(process.env.SHIP_REDIS_BATCH_SIZE) || 500;
  private inactivityTimeoutMs = Number(process.env.SHIP_INACTIVITY_TIMEOUT_MS) || 24 * 60 * 60 * 1000;
  private timezoneOffsetMs = 3 * 60 * 60 * 1000; // UTC+3 offset in milliseconds

  constructor(
    private prisma: PrismaService,
    @Inject(REDIS_CLIENT) private redis: Redis,
    private redisService: RedisService
  ) {}

  // Helper method to get current time with UTC+3 offset
  private getCurrentTime(): number {
    return Date.now() + this.timezoneOffsetMs;
  }

  // In-memory operations
  storePosition(mmsi: string, data: any): void {
    this.shipPositions.set(mmsi, data);
    this.pendingPositionWrites.set(mmsi, data);
  }

  storeStaticData(id: string, data: any): void {
    this.shipStaticData.set(id, data);
  }

  getPosition(mmsi: string): any {
    return this.shipPositions.get(mmsi);
  }

  getStaticData(id: string): any {
    return this.shipStaticData.get(id);
  }

  getPendingPositionWritesCount(): number {
    return this.pendingPositionWrites.size;
  }

  shouldFlushBatch(): boolean {
    return this.pendingPositionWrites.size >= this.batchSize;
  }

  // Redis operations
  async writeShipsToRedis(): Promise<void> {
    try {
      const posEntries = Array.from(this.pendingPositionWrites.entries());
      if (!posEntries.length) {
        return;
      }
      this.logger.log(`FLUSHING ${posEntries.length} positions to Redis`);

      // Batch fetch existing ship names to preserve them
      const existingNames = await this.fetchExistingShipNames(posEntries);

      const pipe = this.redisService.pipeline();

      for (const [id, stored] of posEntries) {
        try {
          const lon = Number(stored.Longitude ?? stored.Long ?? stored.lon ?? 0);
          const lat = Number(stored.Latitude ?? stored.Lat ?? stored.lat ?? 0);
          
          // GEOADD: lon, lat order
          pipe.call('geoadd', 'shipsGeo', lon, lat, id);
          
          const key = `ship:${id}`;
          const ts = stored.time_utc ? String(stored.time_utc) : String(new Date(stored._lastSeen ?? this.getCurrentTime()).toISOString());
          const lastSeen = stored._lastSeen ?? this.getCurrentTime();
          const timeSinceLastSeen = this.getCurrentTime() - lastSeen;
          
          const trim = (val: any) => (typeof val === 'string' ? val.trim() : val ?? '');
          
          const staticData = this.shipStaticData.get(String(id));
          const shipName = trim(stored.ShipName ?? stored.Shipname ?? stored.name ?? staticData?.name);
          const finalShipName = shipName || existingNames.get(String(id)) || '';
          
          pipe.hset(key, {
            mmsi: String(stored.MMSI ?? ''),
            shipName: finalShipName,
            latitude: String(lat),
            longitude: String(lon),
            trueHeading: String(stored.TrueHeading ?? 0),
            cog: String(stored.Cog ?? 0),
            sog: String(stored.Sog ?? 0),
            timestamp: ts,
            _lastSeen: String(lastSeen),
          });
        } catch (e) {
          this.logger.debug('Failed to queue pending position write', e as any);
        }
      }

      // Execute pipeline
      try {
        await pipe.exec();
      } catch (e) {
        this.logger.debug('Redis batch exec failed', e as any);
      }

      // Clear the flushed entries
      for (const [id] of posEntries) {
        this.pendingPositionWrites.delete(id);
      }
    } catch (e) {
      this.logger.debug('writeShipsToRedis error', e as any);
    }
  }

  private async fetchExistingShipNames(posEntries: [string, any][]): Promise<Map<string, string>> {
    const existingNames = new Map<string, string>();
    try {
      const fetchPipeline = this.redisService.pipeline();
      for (const [id] of posEntries) {
        fetchPipeline.hget(`ship:${id}`, 'shipName');
      }
      const results = await fetchPipeline.exec();
      if (results) {
        let idx = 0;
        for (const [id] of posEntries) {
          const [err, name] = results[idx] || [null, null];
          if (!err && name && typeof name === 'string') {
            existingNames.set(String(id), name);
          }
          idx++;
        }
      }
    } catch (e) {
      this.logger.debug('Failed to fetch existing ship names from Redis', e as any);
    }
    return existingNames;
  }

  async updateInactiveShipsInRedis(): Promise<number> {
    try {
      const now = this.getCurrentTime();
      const keys = await this.redis.keys('ship:*');
      if (keys.length === 0) return 0;

      const pipe = this.redisService.pipeline();
      let archivedCount = 0;

      for (const key of keys) {
        try {
          const lastSeenStr = await this.redis.hget(key, '_lastSeen');
          if (lastSeenStr) {
            const lastSeen = Number(lastSeenStr);
            const timeSinceLastSeen = now - lastSeen;
            
            if (timeSinceLastSeen >= this.inactivityTimeoutMs) {
              // Delete from Redis and geospatial index
              const shipId = key.replace('ship:', '');
              pipe.del(key);
              pipe.zrem('shipsGeo', shipId);
              archivedCount++;
            }
          }
        } catch (e) {
          this.logger.debug(`Failed to check activity for ${key}`, e as any);
        }
      }

      if (archivedCount > 0) {
        await pipe.exec();
        this.logger.debug(`Removed ${archivedCount} inactive ships from Redis`);
      }
      return archivedCount;
    } catch (e) {
      this.logger.warn('Failed to update inactive ships in Redis', e as any);
      return 0;
    }
  }

  // Database operations
  async updateInactiveShipsInDb(): Promise<number> {
    try {
      const now = this.getCurrentTime();
      const inactivityThreshold = new Date(now - this.inactivityTimeoutMs);

      // Find inactive ships
      const inactiveShips = await this.prisma.ship.findMany({
        where: {
          lastSeenAt: {
            lt: inactivityThreshold
          }
        },
        include: {
          ShipStaticData: true
        }
      });

      if (inactiveShips.length === 0) {
        return 0;
      }

      // Archive ships in a transaction
      let archivedCount = 0;
      for (const ship of inactiveShips) {
        try {
          await this.prisma.$transaction(async (tx) => {
            // Upsert archived ship (handles case where ship was partially archived before)
            await tx.archivedShip.upsert({
              where: { id: ship.id },
              update: {
                mmsi: ship.mmsi,
                shipName: ship.shipName,
                latitude: ship.latitude,
                longitude: ship.longitude,
                rateOfTurn: ship.rateOfTurn,
                trueHeading: ship.trueHeading,
                cog: ship.cog,
                sog: ship.sog,                       
                navigationalStatus: ship.navigationalStatus,
                timestamp: ship.timestamp,
                lastSeenAt: ship.lastSeenAt,
                archivedAt: new Date()
              },
              create: {
                id: ship.id,
                mmsi: ship.mmsi,
                shipName: ship.shipName,
                latitude: ship.latitude,
                longitude: ship.longitude,
                rateOfTurn: ship.rateOfTurn,
                trueHeading: ship.trueHeading,
                cog: ship.cog,
                sog: ship.sog,
                navigationalStatus: ship.navigationalStatus,
                timestamp: ship.timestamp,
                lastSeenAt: ship.lastSeenAt,
                archivedAt: new Date()
              }
            });

            // Upsert archived static data if exists
            if (ship.ShipStaticData) {
              await tx.archivedShipStaticData.upsert({
                where: { id: ship.ShipStaticData.id },
                update: {
                  callSign: ship.ShipStaticData.callSign,
                  destination: ship.ShipStaticData.destination,
                  dimensionA: ship.ShipStaticData.dimensionA,
                  dimensionB: ship.ShipStaticData.dimensionB,
                  dimensionC: ship.ShipStaticData.dimensionC,
                  dimensionD: ship.ShipStaticData.dimensionD,
                  etaDay: ship.ShipStaticData.etaDay,
                  etaHour: ship.ShipStaticData.etaHour,
                  etaMinute: ship.ShipStaticData.etaMinute,
                  etaMonth: ship.ShipStaticData.etaMonth,
                  maximumStaticDraught: ship.ShipStaticData.maximumStaticDraught,
                  name: ship.ShipStaticData.name,
                  valid: ship.ShipStaticData.valid,
                  updatedAt: ship.ShipStaticData.updatedAt,
                  archivedAt: new Date()
                },
                create: {
                  id: ship.ShipStaticData.id,
                  archivedShipId: ship.id,
                  callSign: ship.ShipStaticData.callSign,
                  destination: ship.ShipStaticData.destination,
                  dimensionA: ship.ShipStaticData.dimensionA,
                  dimensionB: ship.ShipStaticData.dimensionB,
                  dimensionC: ship.ShipStaticData.dimensionC,
                  dimensionD: ship.ShipStaticData.dimensionD,
                  etaDay: ship.ShipStaticData.etaDay,
                  etaHour: ship.ShipStaticData.etaHour,
                  etaMinute: ship.ShipStaticData.etaMinute,
                  etaMonth: ship.ShipStaticData.etaMonth,
                  maximumStaticDraught: ship.ShipStaticData.maximumStaticDraught,
                  name: ship.ShipStaticData.name,
                  valid: ship.ShipStaticData.valid,
                  createdAt: ship.ShipStaticData.createdAt,
                  updatedAt: ship.ShipStaticData.updatedAt,
                  archivedAt: new Date()
                }
              });
            }

            // Delete static data (if exists) - use deleteMany to avoid FK constraint errors
            await tx.shipStaticData.deleteMany({
              where: { shipId: ship.id }
            });

            // Delete ship from active table - use deleteMany to handle concurrent deletions
            await tx.ship.deleteMany({
              where: { id: ship.id }
            });
          });
          archivedCount++;
        } catch (e) {
          this.logger.warn(`Failed to archive ship ${ship.id}`, e as any);
        }
      }
      
      if (archivedCount > 0) {
        this.logger.debug(`Archived ${archivedCount} inactive ships to ArchivedShip table`);
      }
      return archivedCount;
    } catch (e) {
      this.logger.warn('Failed to archive inactive ships in DB', e as any);
      return 0;
    }
  }

  async persistShipsToDb(): Promise<{ shipsCount: number; staticCount: number }> {
    try {
      const shipSnapshot = Array.from(this.shipPositions.values());
      const staticSnapshot = Array.from(this.shipStaticData.values());
      
      if (!shipSnapshot.length && !staticSnapshot.length) {
        return { shipsCount: 0, staticCount: 0 };
      }

      const shipMap = new Map<string, any>();
      for (const stored of shipSnapshot) {
        const id = stored.UserID || stored.MMSI;
        if (!id) continue;
        shipMap.set(String(id), stored);
      }

      const staticMap = new Map<string, any>();
      for (const s of staticSnapshot) {
        if (!s || !s.id) continue;
        staticMap.set(String(s.id), s);
      }

      const shipIds = new Set<string>(shipMap.keys());
      const shipStaticIds = new Set<string>(staticMap.keys());
      const batchSize = 50;
      
      let shipPersistedOps = 0;
      let staticShipPersistedOps = 0;

      // Create minimal Ship records for ships with only static data
      const missingShipIds = Array.from(shipStaticIds).filter(id => !shipIds.has(id));
      if (missingShipIds.length > 0) {
        shipPersistedOps += await this.createMinimalShipRecords(missingShipIds, staticMap, batchSize);
      }

      // Persist position data
      shipPersistedOps += await this.persistShipPositions(shipIds, shipMap, staticMap, batchSize);

      // Persist static data
      staticShipPersistedOps += await this.persistShipStaticData(shipStaticIds, staticMap, batchSize);

      this.logger.debug(`Persisted ${shipPersistedOps} DB operations (ships) to DB`);
      this.logger.debug(`Persisted ${staticShipPersistedOps} DB operations (static ships) to DB`);

      // Clear persisted entries
      for (const stored of shipSnapshot) {
        if (stored && stored.id) this.shipPositions.delete(String(stored.id));
      }
      for (const s of staticSnapshot) {
        if (s && s.id) this.shipStaticData.delete(String(s.id));
      }

      return { shipsCount: shipPersistedOps, staticCount: staticShipPersistedOps };
    } catch (err) {
      this.logger.error('Error persisting ships to DB', err as any);
      return { shipsCount: 0, staticCount: 0 };
    }
  }

  private async createMinimalShipRecords(
    missingShipIds: string[],
    staticMap: Map<string, any>,
    batchSize: number
  ): Promise<number> {
    let created = 0;
    for (let i = 0; i < missingShipIds.length; i += batchSize) {
      const batchIds = missingShipIds.slice(i, i + batchSize);
      const batchStatements: any[] = [];
      
      for (const id of batchIds) {
        const staticData = staticMap.get(id);
        const now = new Date();
        batchStatements.push((this.prisma as any).$executeRaw`
          INSERT INTO "Ship" (
            "id","mmsi","shipName","latitude","longitude","rateOfTurn","trueHeading","cog","sog","navigationalStatus","timestamp","lastSeenAt"
          ) VALUES (
            ${id}, ${id}, ${staticData.name || ''}, ${0}, ${0}, ${0}, ${0}, ${0}, ${0}, ${15}, ${now}, ${now}
          )
          ON CONFLICT ("id") DO NOTHING;
        `);
      }
      
      if (batchStatements.length > 0) {
        try {
          await (this.prisma as any).$transaction(batchStatements);
          created += batchStatements.length;
          this.logger.debug(`Created ${batchStatements.length} minimal Ship records for static data`);
        } catch (e) {
          this.logger.warn(`Failed to create minimal Ship records`, e as any);
        }
      }
    }
    return created;
  }

  private async persistShipPositions(
    shipIds: Set<string>,
    shipMap: Map<string, any>,
    staticMap: Map<string, any>,
    batchSize: number
  ): Promise<number> {
    let persisted = 0;
    const shipIdLength = shipIds.size;

    for (let i = 0; i < shipIdLength; i += batchSize) {
      const batchIds = Array.from(shipIds).slice(i, i + batchSize);
      const batchStatements: any[] = [];
      
      for (const id of batchIds) {
        const stored = shipMap.get(id);
        const lastSeen = stored._lastSeen ?? this.getCurrentTime();
        
        const staticData = staticMap.get(id);
        const shipName = stored.ShipName || stored.Shipname || stored.name || staticData?.name || '';
        
        const dbRecord: any = {
          id: String(id),
          mmsi: stored.MMSI ? String(stored.MMSI) : null,
          shipName: shipName,
          latitude: Number(stored.Latitude ?? 0),
          longitude: Number(stored.Longitude ?? 0),
          rateOfTurn: Number(stored.RateOfTurn ?? 0),
          trueHeading: Math.trunc(Number(stored.TrueHeading ?? 0)),
          cog: Number(stored.Cog ?? 0),
          sog: Number(stored.Sog ?? 0),
          navigationalStatus: Math.trunc(Number(stored.NavigationalStatus ?? 15)),
          timestamp: stored.time_utc ? new Date(stored.time_utc) : (stored._lastSeen ? new Date(stored._lastSeen) : new Date()),
          lastSeenAt: new Date(lastSeen),
        };

        batchStatements.push((this.prisma as any).$executeRaw`
          INSERT INTO "Ship" (
            "id","mmsi","shipName","latitude","longitude","rateOfTurn","trueHeading","cog","sog","navigationalStatus","timestamp","lastSeenAt"
          ) VALUES (
            ${dbRecord.id}, ${dbRecord.mmsi}, ${dbRecord.shipName}, ${dbRecord.latitude}, ${dbRecord.longitude}, ${dbRecord.rateOfTurn}, ${dbRecord.trueHeading}, ${dbRecord.cog}, ${dbRecord.sog}, ${dbRecord.navigationalStatus}, ${dbRecord.timestamp}, ${dbRecord.lastSeenAt}
          )
          ON CONFLICT ("id") DO UPDATE SET
            "mmsi" = EXCLUDED."mmsi",
            "shipName" = CASE WHEN EXCLUDED."shipName" != '' THEN EXCLUDED."shipName" ELSE "Ship"."shipName" END,
            "latitude" = EXCLUDED."latitude",
            "longitude" = EXCLUDED."longitude",
            "rateOfTurn" = EXCLUDED."rateOfTurn",
            "trueHeading" = EXCLUDED."trueHeading",
            "cog" = EXCLUDED."cog",
            "sog" = EXCLUDED."sog",
            "navigationalStatus" = EXCLUDED."navigationalStatus",
            "timestamp" = EXCLUDED."timestamp",
            "lastSeenAt" = EXCLUDED."lastSeenAt";
        `);
      }

      if (batchStatements.length > 0) {
        try {
          await (this.prisma as any).$transaction(batchStatements);
          persisted += batchStatements.length;
        } catch (e) {
          this.logger.warn(`Failed to persist data for ship batch`, e as any);
        }
      }
    }
    return persisted;
  }

  private async persistShipStaticData(
    shipStaticIds: Set<string>,
    staticMap: Map<string, any>,
    batchSize: number
  ): Promise<number> {
    let persisted = 0;
    const shipStaticIdLength = shipStaticIds.size;

    for (let i = 0; i < shipStaticIdLength; i += batchSize) {
      const batchIds = Array.from(shipStaticIds).slice(i, i + batchSize);
      const batchStatements: any[] = [];
      
      for (const id of batchIds) {
        const s = staticMap.get(id);
        const dbRecord: any = {
          id: String(id),
          shipId: String(id),
          callSign: s.callSign ?? null,
          destination: s.destination ?? null,
          dimensionA: Number(s.dimensionA ?? 0),
          dimensionB: Number(s.dimensionB ?? 0),
          dimensionC: Number(s.dimensionC ?? 0),
          dimensionD: Number(s.dimensionD ?? 0),
          etaDay: s.etaDay == null ? null : Number(s.etaDay),
          etaHour: s.etaHour == null ? null : Number(s.etaHour),
          etaMinute: s.etaMinute == null ? null : Number(s.etaMinute),
          etaMonth: s.etaMonth == null ? null : Number(s.etaMonth),
          maximumStaticDraught: Number(s.maximumStaticDraught ?? 0),
          name: s.name ?? '',
          valid: Boolean(s.valid ?? true),
          now: new Date(),
        };

        batchStatements.push((this.prisma as any).$executeRaw`
          INSERT INTO "ShipStaticData" (
            "id","shipId","callSign","destination","dimensionA","dimensionB","dimensionC","dimensionD","etaDay","etaHour","etaMinute","etaMonth","maximumStaticDraught","name","valid","createdAt","updatedAt"
          ) VALUES (
            ${dbRecord.id}, ${dbRecord.shipId}, ${dbRecord.callSign}, ${dbRecord.destination}, ${dbRecord.dimensionA}, ${dbRecord.dimensionB}, ${dbRecord.dimensionC}, ${dbRecord.dimensionD}, ${dbRecord.etaDay}, ${dbRecord.etaHour}, ${dbRecord.etaMinute}, ${dbRecord.etaMonth}, ${dbRecord.maximumStaticDraught}, ${dbRecord.name}, ${dbRecord.valid}, ${dbRecord.now}, ${dbRecord.now}
          )
          ON CONFLICT ("id") DO UPDATE SET
            "callSign" = EXCLUDED."callSign",
            "destination" = EXCLUDED."destination",
            "dimensionA" = EXCLUDED."dimensionA",
            "dimensionB" = EXCLUDED."dimensionB",
            "dimensionC" = EXCLUDED."dimensionC",
            "dimensionD" = EXCLUDED."dimensionD",
            "etaDay" = EXCLUDED."etaDay",
            "etaHour" = EXCLUDED."etaHour",
            "etaMinute" = EXCLUDED."etaMinute",
            "etaMonth" = EXCLUDED."etaMonth",
            "maximumStaticDraught" = EXCLUDED."maximumStaticDraught",
            "name" = EXCLUDED."name",
            "valid" = EXCLUDED."valid",
            "updatedAt" = EXCLUDED."updatedAt";
        `);
      }

      if (batchStatements.length > 0) {
        try {
          await (this.prisma as any).$transaction(batchStatements);
          persisted += batchStatements.length;
        } catch (e: any) {
          // If batch fails due to foreign key constraint, try individual inserts
          if (e?.code === 'P2010' && e?.meta?.code === '23503') {
            this.logger.debug(`Batch insert failed, retrying individual static data records`);
            for (const id of batchIds) {
              try {
                const s = staticMap.get(id);
                const dbRecord: any = {
                  id: String(id),
                  shipId: String(id),
                  callSign: s.callSign ?? null,
                  destination: s.destination ?? null,
                  dimensionA: Number(s.dimensionA ?? 0),
                  dimensionB: Number(s.dimensionB ?? 0),
                  dimensionC: Number(s.dimensionC ?? 0),
                  dimensionD: Number(s.dimensionD ?? 0),
                  etaDay: s.etaDay == null ? null : Number(s.etaDay),
                  etaHour: s.etaHour == null ? null : Number(s.etaHour),
                  etaMinute: s.etaMinute == null ? null : Number(s.etaMinute),
                  etaMonth: s.etaMonth == null ? null : Number(s.etaMonth),
                  maximumStaticDraught: Number(s.maximumStaticDraught ?? 0),
                  name: s.name ?? '',
                  valid: Boolean(s.valid ?? true),
                  now: new Date(),
                };

                // Check if Ship exists first
                const shipExists = await this.prisma.ship.findUnique({
                  where: { id: dbRecord.shipId }
                });

                if (shipExists) {
                  await (this.prisma as any).$executeRaw`
                    INSERT INTO "ShipStaticData" (
                      "id","shipId","callSign","destination","dimensionA","dimensionB","dimensionC","dimensionD","etaDay","etaHour","etaMinute","etaMonth","maximumStaticDraught","name","valid","createdAt","updatedAt"
                    ) VALUES (
                      ${dbRecord.id}, ${dbRecord.shipId}, ${dbRecord.callSign}, ${dbRecord.destination}, ${dbRecord.dimensionA}, ${dbRecord.dimensionB}, ${dbRecord.dimensionC}, ${dbRecord.dimensionD}, ${dbRecord.etaDay}, ${dbRecord.etaHour}, ${dbRecord.etaMinute}, ${dbRecord.etaMonth}, ${dbRecord.maximumStaticDraught}, ${dbRecord.name}, ${dbRecord.valid}, ${dbRecord.now}, ${dbRecord.now}
                    )
                    ON CONFLICT ("id") DO UPDATE SET
                      "callSign" = EXCLUDED."callSign",
                      "destination" = EXCLUDED."destination",
                      "dimensionA" = EXCLUDED."dimensionA",
                      "dimensionB" = EXCLUDED."dimensionB",
                      "dimensionC" = EXCLUDED."dimensionC",
                      "dimensionD" = EXCLUDED."dimensionD",
                      "etaDay" = EXCLUDED."etaDay",
                      "etaHour" = EXCLUDED."etaHour",
                      "etaMinute" = EXCLUDED."etaMinute",
                      "etaMonth" = EXCLUDED."etaMonth",
                      "maximumStaticDraught" = EXCLUDED."maximumStaticDraught",
                      "name" = EXCLUDED."name",
                      "valid" = EXCLUDED."valid",
                      "updatedAt" = EXCLUDED."updatedAt";
                  `;
                  persisted++;
                } else {
                  this.logger.debug(`Skipping static data for ship ${id} - Ship record not found`);
                }
              } catch (individualError) {
                this.logger.debug(`Failed to persist static data for ship ${id}`, individualError as any);
              }
            }
          } else {
            this.logger.warn(`Failed to persist data for static ship batch`, e as any);
          }
        }
      }
    }
    return persisted;
  }
}
