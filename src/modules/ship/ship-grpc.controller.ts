import { Controller, Logger, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ShipSocketClientService } from './ship-socket-client.service';
import { RedisService } from 'src/shared/redis.service';

type BBox = { minLat: number; minLon: number; maxLat: number; maxLon: number };

@Controller()
export class ShipGrpcController {
  private readonly logger = new Logger(ShipGrpcController.name);
  constructor(private readonly shipSocket: ShipSocketClientService, private redisService: RedisService) {}

  // Unary method: return the latest ships inside the requested bbox
  @GrpcMethod('ShipService', 'Subscribe')
  async Subscribe(request: any): Promise<any> {
    const boxReq = request?.box;
    const box: BBox = {
      minLat: boxReq?.minLat ?? -90,
      minLon: boxReq?.minLon ?? -180,
      maxLat: boxReq?.maxLat ?? 90,
      maxLon: boxReq?.maxLon ?? 180,
    };

    this.logger.debug(`gRPC Subscribe (unary) called for bbox ${JSON.stringify(box)}`);

    // Try Redis first (if available). Use geospatial radius around bbox center and filter
    try {
      const client = this.redisService.getClient();
      if (client && (client.status === 'ready' || (client as any).connected)) {
        const centerLat = (box.minLat + box.maxLat) / 2;
        const centerLon = (box.minLon + box.maxLon) / 2;

        // compute radius as distance from center to corner (meters)
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const haversineMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
          const R = 6371000; // earth meters
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        };

        const radiusMeters = Math.max(1, haversineMeters(centerLat, centerLon, box.maxLat, box.maxLon));

        // GEORADIUS: lon, lat order
        // Use GEOSEARCH/GEORADIUS depending on available command; GEORADIUS is widely supported
        let geoRes: any[] = [];
        try {
          geoRes = await this.redisService.geoRadius('shipsGeo', centerLon, centerLat, radiusMeters as number);
        } catch (e) {
          this.logger.debug('Redis georadius failed', e as any);
        }

        // geoRes is an array of items: either [member] or [member, [lon, lat]] depending on server
        const ids: string[] = [];
        for (const item of geoRes) {
          if (!item) continue;
          if (typeof item === 'string') {
            ids.push(item);
          } else if (Array.isArray(item)) {
            // first element is member string
            const member = item[0];
            if (member) ids.push(member.toString());
            else if (Array.isArray(item) && item.length > 1 && Array.isArray(item[1])) ids.push(item[1][0]?.toString() ?? '');
          }
        }

        if (!ids.length) {
          this.logger.debug(`Error with ids extraction from georadius result: ${JSON.stringify(geoRes)}`);
          return { ships: [] };
        }

        this.logger.debug(`Found ${ids.length} ship IDs from georadius`);

        // fetch details in pipeline via provider
        const pipe = this.redisService.pipeline();
        for (const id of ids) {
          pipe.hgetall(`ship:${id}`);
        }
        const res = await pipe.exec();
        if (!res) return { ships: [] };
        const ships: any[] = [];
        let filteredByActive = 0;
        let filteredByBbox = 0;
        for (const [idx, [err, data]] of res.entries()) {
          if (err || !data) continue;
          try {
            const s: any = data;
            
            // ensure numeric lat/lon
            const lat = Number(s.latitude ?? 0);
            const lon = Number(s.longitude ?? 0);
            if (lat >= box.minLat && lat <= box.maxLat && lon >= box.minLon && lon <= box.maxLon) {
              ships.push({
                id: s.mmsi ?? ids[idx], // use mmsi as id
                mmsi: s.mmsi ?? '',
                latitude: lat,
                longitude: lon,
                name: (s.shipName ?? '').trim(), // trim whitespace
                heading: Number(s.trueHeading ?? 0),
                timeUtc: s.timestamp ?? s._lastSeen ?? '',
                cog: s.cog ?? '0',
              });
            } else {
              filteredByBbox++;
            }
          } catch (e) {
            this.logger.debug('Error parsing redis ship data', e as any);
          }
        }

        this.logger.debug(`Returning ${ships.length} ships (filtered ${filteredByActive} inactive, ${filteredByBbox} outside bbox)`);
        return { ships };
      }
    } catch (e) {
      this.logger.debug('Redis lookup failed', e as any);
    }
  }
}
