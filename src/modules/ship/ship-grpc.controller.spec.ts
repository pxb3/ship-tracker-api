import { Test, TestingModule } from '@nestjs/testing';
import { ShipGrpcController } from './ship-grpc.controller';
import { RedisService } from 'src/shared/redis.service';

describe('ShipGrpcController', () => {
  let controller: ShipGrpcController;
  let redisService: {
    getClient: jest.Mock;
    geoRadius: jest.Mock;
    pipeline: jest.Mock;
  };
  let pipelineMock: { hgetall: jest.Mock; exec: jest.Mock };

  beforeEach(async () => {
    pipelineMock = {
      hgetall: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    redisService = {
      getClient: jest.fn().mockReturnValue({ status: 'ready' }),
      geoRadius: jest.fn(),
      pipeline: jest.fn().mockReturnValue(pipelineMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipGrpcController],
      providers: [
        { provide: RedisService, useValue: redisService },
      ],
    }).compile();

    controller = module.get<ShipGrpcController>(ShipGrpcController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Subscribe', () => {
    const bboxRequest = { box: { minLat: 0, minLon: 0, maxLat: 10, maxLon: 10 } };

    it('returns ships within the bbox found via geo radius lookup', async () => {
      redisService.geoRadius.mockResolvedValue(['111', '222']);
      pipelineMock.exec.mockResolvedValue([
        [null, { mmsi: '111', shipName: ' Aurora ', latitude: '5', longitude: '5', trueHeading: '90', cog: '1', timestamp: 't1' }],
        [null, { mmsi: '222', shipName: 'Borealis', latitude: '5', longitude: '5', trueHeading: '0', cog: '0', timestamp: 't2' }],
      ]);

      const result = await controller.Subscribe(bboxRequest);

      expect(redisService.geoRadius).toHaveBeenCalled();
      expect(result.ships).toHaveLength(2);
      expect(result.ships[0]).toEqual({
        id: '111',
        mmsi: '111',
        latitude: 5,
        longitude: 5,
        name: 'Aurora',
        heading: 90,
        timeUtc: 't1',
        cog: '1',
      });
    });

    it('filters out ships outside of the requested bbox', async () => {
      redisService.geoRadius.mockResolvedValue(['111']);
      pipelineMock.exec.mockResolvedValue([
        [null, { mmsi: '111', shipName: 'Outside', latitude: '50', longitude: '50', trueHeading: '0', cog: '0' }],
      ]);

      const result = await controller.Subscribe(bboxRequest);

      expect(result.ships).toEqual([]);
    });

    it('returns an empty ships array when geo radius yields no ids', async () => {
      redisService.geoRadius.mockResolvedValue([]);

      const result = await controller.Subscribe(bboxRequest);

      expect(result).toEqual({ ships: [] });
      expect(redisService.pipeline).not.toHaveBeenCalled();
    });

    it('returns undefined when the redis client is not ready', async () => {
      redisService.getClient.mockReturnValue({ status: 'connecting' });

      const result = await controller.Subscribe(bboxRequest);

      expect(result).toBeUndefined();
      expect(redisService.geoRadius).not.toHaveBeenCalled();
    });

    it('applies default bbox bounds when the request has no box', async () => {
      redisService.geoRadius.mockResolvedValue([]);

      await controller.Subscribe({});

      expect(redisService.geoRadius).toHaveBeenCalledWith('shipsGeo', 0, 0, expect.any(Number));
    });
  });
});
