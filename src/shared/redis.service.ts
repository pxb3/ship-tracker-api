import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  // Use string token to avoid circular imports with redis.module
  constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {}

  getClient(): Redis {
    return this.client;
  }

  // Convenience wrappers
  async geoAdd(key: string, lon: number, lat: number, member: string) {
    return this.client.geoadd(key, lon, lat, member);
  }

  async hSetObject(key: string, obj: Record<string, any>) {
    // convert to string map
    const flat: Record<string, string> = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      flat[k] = v == null ? '' : String(v);
    }
    return this.client.hset(key, flat);
  }

  async hGetAll(key: string) {
    return this.client.hgetall(key);
  }

  pipeline() {
    return this.client.pipeline();
  }

  async geoRadius(key: string, lon: number, lat: number, radiusMeters: number) {
    // return array of members (ioredis GEORADIUS returns array)
    // Use WITHCOORD to include coords if available
    // @ts-ignore
    if (typeof (this.client as any).georadius === 'function') {
      // ioredis signature: georadius(key, longitude, latitude, radius, unit, ...)
      // use 'm' for meters and WITHCOORD
      // @ts-ignore
      return (this.client as any).georadius(key, lon, lat, radiusMeters, 'm', 'WITHCOORD');
    }
    // fallback to raw command
    // use sendCommand for ioredis
    // @ts-ignore
    return (this.client as any).sendCommand(['GEORADIUS', key, String(lon), String(lat), String(radiusMeters), 'm', 'WITHCOORD']);
  }

  async onModuleDestroy() {
    try {
      await this.client.quit();
      // eslint-disable-next-line no-console
      console.debug('Redis client quit gracefully');
    } catch (e) {
      try {
        // fallback to force disconnect
        this.client.disconnect();
        // eslint-disable-next-line no-console
        console.debug('Redis client disconnected');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while closing Redis client', err);
      }
    }
  }
}
