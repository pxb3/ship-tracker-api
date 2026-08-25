import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './redis.constants';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
        const maxAttempts = Number(process.env.REDIS_MAX_CONNECT_ATTEMPTS ?? 10);
        const baseDelay = Number(process.env.REDIS_CONNECT_DELAY_MS ?? 200);
        const client = new Redis(url, { lazyConnect: false });

        client.on('error', (err) => {
          try {
            // eslint-disable-next-line no-console
            console.error('Redis provider error', err);
          } catch (e) {}
        });

        let attempt = 0;
        while (attempt < maxAttempts) {
          try {
            attempt += 1;
            // ping will throw if not connected
            const pong = await client.ping();
            if (pong && pong === 'PONG') {
              try {
                // eslint-disable-next-line no-console
                console.debug(`Redis provider connected (attempt ${attempt}) to ${url}`);
              } catch (e) {}
              break;
            }
          } catch (e) {
            const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), 10000);
            try {
              // eslint-disable-next-line no-console
              console.warn(`Redis connection attempt ${attempt} failed, retrying in ${delay}ms`);
            } catch (err) {}
            await sleep(delay);
          }
        }

        if (attempt >= maxAttempts) {
          try {
            // eslint-disable-next-line no-console
            console.error(`Could not connect to Redis at ${url} after ${maxAttempts} attempts`);
          } catch (e) {}
        }

        return client;
      },
    },
    // RedisService wrapper (class provider) so it can be injected by type
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
