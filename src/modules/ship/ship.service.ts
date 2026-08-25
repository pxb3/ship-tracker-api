import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseCrudService } from "../../shared/base/base.service";
import { 
    CreateManyShipArgs,
    CreateOneShipArgs,
    DeleteManyShipArgs,
    DeleteOneShipArgs,
    FindFirstShipArgs,
    FindManyShipArgs,
    FindUniqueShipArgs,
    UpdateManyShipArgs,
    UpdateOneShipArgs,
    Ship,
    ShipAggregateArgs,
    ShipGroupByArgs,
} from "../../shared/prismagraphql/ship";
import { ShipRepository } from './ship.repository';

@Injectable()
export class ShipService extends BaseCrudService<
    Ship,
    FindFirstShipArgs,
    FindUniqueShipArgs,
    FindManyShipArgs,
    ShipGroupByArgs,
    ShipAggregateArgs,
    CreateOneShipArgs,
    CreateManyShipArgs,
    UpdateOneShipArgs,
    UpdateManyShipArgs,
    DeleteOneShipArgs,
    DeleteManyShipArgs
> {
  private readonly logger = new Logger(ShipService.name);

  constructor(
    prisma: PrismaService,
    private readonly shipRepository: ShipRepository
  ) {
    super(prisma);
  }

  /**
   * Process incoming position report from AIS stream
   */
  processPositionReport(metaData: any, positionReport: any): void {
    if (!positionReport) {
      this.logger.debug('PositionReport message had no recognizable payload');
      return;
    }

    const valid = Boolean(positionReport.Valid ?? positionReport.valid ?? true);
    if (!valid) {
      return;
    }

    const stored = { ...metaData, ...positionReport, _lastSeen: Date.now() };
    const mmsi = stored.MMSI;

    if (mmsi) {
      this.shipRepository.storePosition(mmsi, stored);

      // Check if we should flush the batch
      if (this.shipRepository.shouldFlushBatch()) {
        void this.shipRepository.writeShipsToRedis();
      }
    } else {
      this.logger.log('PositionReport missing MMSI, skipping');
    }
  }

  /**
   * Process incoming static data from AIS stream
   */
  processStaticData(staticData: any): void {
    if (!staticData) {
      return;
    }

    // Normalize and be resilient to different payload shapes/casing
    const id = String(staticData.UserID ?? staticData.UserId ?? staticData.MMSI ?? '');
    const callSign = staticData.CallSign ?? staticData.callSign ?? null;
    const destination = staticData.Destination ?? staticData.destination ?? null;

    const dimensionA = Number(staticData.Dimension?.A ?? staticData.Dimension?.dimensionA ?? 0);
    const dimensionB = Number(staticData.Dimension?.B ?? staticData.Dimension?.dimensionB ?? 0);
    const dimensionC = Number(staticData.Dimension?.C ?? staticData.Dimension?.dimensionC ?? 0);
    const dimensionD = Number(staticData.Dimension?.D ?? staticData.Dimension?.dimensionD ?? 0);

    const etaDay = staticData.Eta?.Day ?? staticData.eta?.Day ?? staticData.eta?.day ?? null;
    const etaMonth = staticData.Eta?.Month ?? staticData.eta?.Month ?? staticData.eta?.month ?? null;
    const etaHour = staticData.Eta?.Hour ?? staticData.eta?.Hour ?? staticData.eta?.hour ?? null;
    const etaMinute = staticData.Eta?.Minute ?? staticData.eta?.Minute ?? staticData.eta?.minute ?? null;

    const maximumStaticDraught = Number(staticData.MaximumStaticDraught ?? staticData.maximumStaticDraught ?? 0);
    const name = staticData.Name ?? staticData.name ?? '';
    const valid = Boolean(staticData.Valid ?? staticData.valid ?? true);

    if (!valid || !id) {
      return;
    }

    const entry = {
      id: String(id),
      callSign,
      destination,
      dimensionA,
      dimensionB,
      dimensionC,
      dimensionD,
      etaDay: etaDay == null ? null : Number(etaDay),
      etaMonth: etaMonth == null ? null : Number(etaMonth),
      etaHour: etaHour == null ? null : Number(etaHour),
      etaMinute: etaMinute == null ? null : Number(etaMinute),
      maximumStaticDraught,
      name,
      valid,
      _lastSeen: Date.now(),
    };

    this.shipRepository.storeStaticData(String(id), entry);
  }

  /**
   * Check ship activity and mark inactive ships in both Redis and DB
   */
  async checkShipActivity(): Promise<void> {
    try {
      const dbCount = await this.shipRepository.updateInactiveShipsInDb();
      const redisCount = await this.shipRepository.updateInactiveShipsInRedis();
      
      if (dbCount > 0 || redisCount > 0) {
        this.logger.debug(`Activity check completed: ${dbCount} DB updates, ${redisCount} Redis updates`);
      }
    } catch (e) {
      this.logger.warn('checkShipActivity failed', e as any);
    }
  }

  /**
   * Flush pending position writes to Redis
   */
  async flushToRedis(): Promise<void> {
    await this.shipRepository.writeShipsToRedis();
  }

  /**
   * Persist ships from in-memory storage to database
   */
  async persistToDatabase(): Promise<void> {
    const result = await this.shipRepository.persistShipsToDb();
    if (result.shipsCount > 0 || result.staticCount > 0) {
      this.logger.debug(`Persistence completed: ${result.shipsCount} ships, ${result.staticCount} static records`);
    }
  }
}
