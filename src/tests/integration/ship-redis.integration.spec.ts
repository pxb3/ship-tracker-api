import { execSync } from 'child_process';
import Redis from 'ioredis';
import { RedisService } from '../../shared/redis.service';
import { ShipGrpcController } from '../../modules/ship/ship-grpc.controller';

const CONTAINER_NAME = 'stp-test-redis-6380';
const HOST_PORT = 6380;

describe('Ship Redis integration', () => {
  let containerId: string | null = null;
  let client: Redis;

  beforeAll(async () => {
    // start a redis container on port 6380
    try {
      const out = execSync(`docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:6379 redis:7`).toString().trim();
      containerId = out;
    } catch (e) {
      // maybe already running, try to remove and start
      try {
        execSync(`docker rm -f ${CONTAINER_NAME}`);
        const out = execSync(`docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:6379 redis:7`).toString().trim();
        containerId = out;
      } catch (err) {
        console.error('Failed to start redis container', err);
        throw err;
      }
    }

    client = new Redis({ host: '127.0.0.1', port: HOST_PORT });

    // wait for redis ready
    for (let i = 0; i < 20; i++) {
      try {
        const p = await client.ping();
        if (p === 'PONG') break;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }
  }, 60000);

  afterAll(async () => {
    try {
      if (client) await client.quit();
    } catch (e) {}
    if (containerId) {
      try {
        execSync(`docker rm -f ${CONTAINER_NAME}`);
      } catch (e) {}
    }
  });

  test('writes ship to redis and reads via ShipGrpcController', async () => {
    const redisService = new RedisService(client as any);

    // add a sample ship
    const id = '9000001';
    const lon = 12.34;
    const lat = 56.78;
    await redisService.geoAdd('shipsGeo', lon, lat, id);
    await redisService.hSetObject(`ship:${id}`, {
      id,
      mmsi: id,
      shipName: 'TestShip',
      latitude: String(lat),
      longitude: String(lon),
      timestamp: new Date().toISOString(),
    });

    // create controller with stub snapshot provider
    const stubSocket: any = { getCurrentSnapshot: () => [] };
    const controller = new ShipGrpcController(stubSocket, redisService);

    const res = await controller.Subscribe({ box: { minLat: 56.0, minLon: 12.0, maxLat: 57.0, maxLon: 13.0 } });

    expect(res).toBeDefined();
    expect(Array.isArray(res.ships)).toBeTruthy();
    const found = res.ships.find((s: any) => s.id === id || s.mmsi === id);
    expect(found).toBeDefined();
    expect(found.name === 'TestShip' || found.shipName === 'TestShip').toBeTruthy();
  }, 30000);
});
