import { ShipRepository } from './ship.repository';

describe('ShipRepository', () => {
  let prisma: any;
  let redis: any;
  let redisService: any;
  let pipelineMock: { call: jest.Mock; hset: jest.Mock; hget: jest.Mock; zrem: jest.Mock; del: jest.Mock; exec: jest.Mock };
  let repo: ShipRepository;

  beforeEach(() => {
    pipelineMock = {
      call: jest.fn().mockReturnThis(),
      hset: jest.fn().mockReturnThis(),
      hget: jest.fn().mockReturnThis(),
      zrem: jest.fn().mockReturnThis(),
      del: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(undefined),
    };

    prisma = {
      ship: { findMany: jest.fn() },
      $transaction: jest.fn(),
      $executeRaw: jest.fn(),
    };

    redis = {
      keys: jest.fn(),
      hget: jest.fn(),
    };

    redisService = {
      pipeline: jest.fn().mockReturnValue(pipelineMock),
      geoRadius: jest.fn(),
    };

    repo = new ShipRepository(prisma, redis, redisService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.SHIP_REDIS_BATCH_SIZE;
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('in-memory storage', () => {
    it('stores and retrieves positions', () => {
      const data = { MMSI: 111, Latitude: 1 };
      repo.storePosition('111', data);

      expect(repo.getPosition('111')).toEqual(data);
      expect(repo.getPendingPositionWritesCount()).toBe(1);
    });

    it('stores and retrieves static data', () => {
      const data = { id: '111', name: 'Test' };
      repo.storeStaticData('111', data);

      expect(repo.getStaticData('111')).toEqual(data);
    });

    it('reports shouldFlushBatch as false below the configured batch size', () => {
      repo.storePosition('111', {});

      expect(repo.shouldFlushBatch()).toBe(false);
    });

    it('reports shouldFlushBatch as true once the configured batch size is reached', () => {
      process.env.SHIP_REDIS_BATCH_SIZE = '2';
      const smallBatchRepo = new ShipRepository(prisma, redis, redisService);

      smallBatchRepo.storePosition('111', {});
      smallBatchRepo.storePosition('222', {});

      expect(smallBatchRepo.shouldFlushBatch()).toBe(true);
    });
  });

  describe('writeShipsToRedis', () => {
    it('does nothing when there are no pending writes', async () => {
      await repo.writeShipsToRedis();

      expect(redisService.pipeline).not.toHaveBeenCalled();
    });

    it('flushes pending positions to Redis and clears the pending queue', async () => {
      repo.storePosition('111', { MMSI: '111', Latitude: 5, Longitude: 6, ShipName: 'NewName', _lastSeen: 123 });
      pipelineMock.exec.mockResolvedValueOnce([[null, 'OldName']]).mockResolvedValueOnce(undefined);

      await repo.writeShipsToRedis();

      expect(pipelineMock.call).toHaveBeenCalledWith('geoadd', 'shipsGeo', 6, 5, '111');
      expect(pipelineMock.hset).toHaveBeenCalledWith(
        'ship:111',
        expect.objectContaining({ mmsi: '111', shipName: 'NewName', latitude: '5', longitude: '6' }),
      );
      expect(repo.getPendingPositionWritesCount()).toBe(0);
    });

    it('falls back to the existing Redis ship name when none is provided in the new data', async () => {
      repo.storePosition('111', { MMSI: '111', Latitude: 5, Longitude: 6, _lastSeen: 123 });
      pipelineMock.exec.mockResolvedValueOnce([[null, 'OldName']]).mockResolvedValueOnce(undefined);

      await repo.writeShipsToRedis();

      expect(pipelineMock.hset).toHaveBeenCalledWith(
        'ship:111',
        expect.objectContaining({ shipName: 'OldName' }),
      );
    });
  });

  describe('updateInactiveShipsInRedis', () => {
    it('returns 0 immediately when there are no ship keys', async () => {
      redis.keys.mockResolvedValue([]);

      const result = await repo.updateInactiveShipsInRedis();

      expect(result).toBe(0);
      expect(redisService.pipeline).not.toHaveBeenCalled();
    });

    it('removes ships that have been inactive past the timeout', async () => {
      redis.keys.mockResolvedValue(['ship:111']);
      redis.hget.mockResolvedValue(String(Date.now() - 25 * 60 * 60 * 1000));

      const result = await repo.updateInactiveShipsInRedis();

      expect(result).toBe(1);
      expect(pipelineMock.del).toHaveBeenCalledWith('ship:111');
      expect(pipelineMock.zrem).toHaveBeenCalledWith('shipsGeo', '111');
      expect(pipelineMock.exec).toHaveBeenCalled();
    });

    it('keeps ships that were recently seen', async () => {
      redis.keys.mockResolvedValue(['ship:111']);
      redis.hget.mockResolvedValue(String(Date.now()));

      const result = await repo.updateInactiveShipsInRedis();

      expect(result).toBe(0);
      expect(pipelineMock.exec).not.toHaveBeenCalled();
    });

    it('returns 0 when Redis lookups fail', async () => {
      redis.keys.mockRejectedValue(new Error('redis down'));

      const result = await repo.updateInactiveShipsInRedis();

      expect(result).toBe(0);
    });
  });

  describe('updateInactiveShipsInDb', () => {
    it('returns 0 when there are no inactive ships', async () => {
      prisma.ship.findMany.mockResolvedValue([]);

      const result = await repo.updateInactiveShipsInDb();

      expect(result).toBe(0);
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it('archives inactive ships (and their static data) in a transaction', async () => {
      const tx = {
        archivedShip: { upsert: jest.fn().mockResolvedValue(undefined) },
        archivedShipStaticData: { upsert: jest.fn().mockResolvedValue(undefined) },
        shipStaticData: { deleteMany: jest.fn().mockResolvedValue(undefined) },
        ship: { deleteMany: jest.fn().mockResolvedValue(undefined) },
      };
      prisma.$transaction.mockImplementation(async (cb: any) => cb(tx));
      prisma.ship.findMany.mockResolvedValue([
        { id: 'ship-1', ShipStaticData: { id: 'static-1' } },
      ]);

      const result = await repo.updateInactiveShipsInDb();

      expect(result).toBe(1);
      expect(tx.archivedShip.upsert).toHaveBeenCalledTimes(1);
      expect(tx.archivedShipStaticData.upsert).toHaveBeenCalledTimes(1);
      expect(tx.shipStaticData.deleteMany).toHaveBeenCalledWith({ where: { shipId: 'ship-1' } });
      expect(tx.ship.deleteMany).toHaveBeenCalledWith({ where: { id: 'ship-1' } });
    });

    it('continues past a ship whose archival transaction fails', async () => {
      prisma.$transaction.mockRejectedValue(new Error('tx failed'));
      prisma.ship.findMany.mockResolvedValue([{ id: 'ship-1', ShipStaticData: null }]);

      const result = await repo.updateInactiveShipsInDb();

      expect(result).toBe(0);
    });

    it('returns 0 when the query itself throws', async () => {
      prisma.ship.findMany.mockRejectedValue(new Error('db down'));

      const result = await repo.updateInactiveShipsInDb();

      expect(result).toBe(0);
    });
  });

  describe('persistShipsToDb', () => {
    beforeEach(() => {
      prisma.$executeRaw.mockReturnValue('statement');
      prisma.$transaction.mockResolvedValue(undefined);
    });

    it('returns zero counts and skips DB calls when there is nothing to persist', async () => {
      const result = await repo.persistShipsToDb();

      expect(result).toEqual({ shipsCount: 0, staticCount: 0 });
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it('persists pending position data', async () => {
      repo.storePosition('111', { UserID: '111', MMSI: '111', Latitude: 1, Longitude: 2 });

      const result = await repo.persistShipsToDb();

      expect(result).toEqual({ shipsCount: 1, staticCount: 0 });
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it('creates minimal ship records for static-only data and clears persisted static entries', async () => {
      repo.storeStaticData('222', { id: '222', name: 'StaticShip' });

      const result = await repo.persistShipsToDb();

      expect(result).toEqual({ shipsCount: 1, staticCount: 1 });
      expect(repo.getStaticData('222')).toBeUndefined();
    });

    it('does not count a batch whose transaction rejects', async () => {
      repo.storePosition('111', { UserID: '111', MMSI: '111', Latitude: 1, Longitude: 2 });
      prisma.$transaction.mockRejectedValue(new Error('tx failed'));

      const result = await repo.persistShipsToDb();

      expect(result).toEqual({ shipsCount: 0, staticCount: 0 });
    });
  });
});
