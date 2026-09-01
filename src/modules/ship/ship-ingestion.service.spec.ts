import { Test, TestingModule } from '@nestjs/testing';
import { ShipIngestionService } from './ship-ingestion.service';
import { ShipRepository } from './ship.repository';

describe('ShipIngestionService', () => {
  let service: ShipIngestionService;
  let shipRepository: {
    storePosition: jest.Mock;
    storeStaticData: jest.Mock;
    shouldFlushBatch: jest.Mock;
    writeShipsToRedis: jest.Mock;
    updateInactiveShipsInDb: jest.Mock;
    updateInactiveShipsInRedis: jest.Mock;
    persistShipsToDb: jest.Mock;
  };

  beforeEach(async () => {
    shipRepository = {
      storePosition: jest.fn(),
      storeStaticData: jest.fn(),
      shouldFlushBatch: jest.fn().mockReturnValue(false),
      writeShipsToRedis: jest.fn().mockResolvedValue(undefined),
      updateInactiveShipsInDb: jest.fn().mockResolvedValue(0),
      updateInactiveShipsInRedis: jest.fn().mockResolvedValue(0),
      persistShipsToDb: jest.fn().mockResolvedValue({ shipsCount: 0, staticCount: 0 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipIngestionService,
        { provide: ShipRepository, useValue: shipRepository },
      ],
    }).compile();

    service = module.get<ShipIngestionService>(ShipIngestionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processPositionReport', () => {
    it('stores a valid position report merged with metadata', () => {
      const metaData = { MMSI: 123456789 };
      const positionReport = { Valid: true, Latitude: 1, Longitude: 2 };

      service.processPositionReport(metaData, positionReport);

      expect(shipRepository.storePosition).toHaveBeenCalledTimes(1);
      const [mmsi, stored] = shipRepository.storePosition.mock.calls[0];
      expect(mmsi).toBe(123456789);
      expect(stored).toMatchObject({ MMSI: 123456789, Latitude: 1, Longitude: 2 });
      expect(typeof stored._lastSeen).toBe('number');
    });

    it('does nothing when positionReport is missing', () => {
      service.processPositionReport({ MMSI: 1 }, null);

      expect(shipRepository.storePosition).not.toHaveBeenCalled();
    });

    it('does nothing when the report is explicitly invalid', () => {
      service.processPositionReport({ MMSI: 1 }, { Valid: false });

      expect(shipRepository.storePosition).not.toHaveBeenCalled();
    });

    it('treats a missing Valid flag as valid by default', () => {
      service.processPositionReport({ MMSI: 1 }, {});

      expect(shipRepository.storePosition).toHaveBeenCalled();
    });

    it('skips storage when MMSI is missing', () => {
      service.processPositionReport({}, { Valid: true });

      expect(shipRepository.storePosition).not.toHaveBeenCalled();
    });

    it('flushes to Redis when the repository indicates the batch should flush', () => {
      shipRepository.shouldFlushBatch.mockReturnValue(true);

      service.processPositionReport({ MMSI: 1 }, { Valid: true });

      expect(shipRepository.writeShipsToRedis).toHaveBeenCalledTimes(1);
    });

    it('does not flush to Redis when the batch threshold is not reached', () => {
      shipRepository.shouldFlushBatch.mockReturnValue(false);

      service.processPositionReport({ MMSI: 1 }, { Valid: true });

      expect(shipRepository.writeShipsToRedis).not.toHaveBeenCalled();
    });
  });

  describe('processStaticData', () => {
    it('stores normalized static data for a valid payload', () => {
      const staticData = {
        UserID: 111,
        CallSign: 'ABC',
        Destination: 'PORT',
        Dimension: { A: 1, B: 2, C: 3, D: 4 },
        Eta: { Day: 1, Month: 2, Hour: 3, Minute: 4 },
        MaximumStaticDraught: 5.5,
        Name: 'Test Ship',
        Valid: true,
      };

      service.processStaticData(staticData);

      expect(shipRepository.storeStaticData).toHaveBeenCalledTimes(1);
      const [id, entry] = shipRepository.storeStaticData.mock.calls[0];
      expect(id).toBe('111');
      expect(entry).toMatchObject({
        id: '111',
        callSign: 'ABC',
        destination: 'PORT',
        dimensionA: 1,
        dimensionB: 2,
        dimensionC: 3,
        dimensionD: 4,
        etaDay: 1,
        etaMonth: 2,
        etaHour: 3,
        etaMinute: 4,
        maximumStaticDraught: 5.5,
        name: 'Test Ship',
        valid: true,
      });
    });

    it('does nothing when staticData is missing', () => {
      service.processStaticData(null);

      expect(shipRepository.storeStaticData).not.toHaveBeenCalled();
    });

    it('does nothing when the id cannot be resolved', () => {
      service.processStaticData({ Valid: true });

      expect(shipRepository.storeStaticData).not.toHaveBeenCalled();
    });

    it('does nothing when the payload is explicitly invalid', () => {
      service.processStaticData({ UserID: 111, Valid: false });

      expect(shipRepository.storeStaticData).not.toHaveBeenCalled();
    });

    it('falls back to lowercase/alternate field names', () => {
      service.processStaticData({ MMSI: 222, callSign: 'xyz', valid: true });

      expect(shipRepository.storeStaticData).toHaveBeenCalledWith(
        '222',
        expect.objectContaining({ id: '222', callSign: 'xyz' }),
      );
    });
  });

  describe('checkShipActivity', () => {
    it('calls both DB and Redis inactivity checks', async () => {
      shipRepository.updateInactiveShipsInDb.mockResolvedValue(2);
      shipRepository.updateInactiveShipsInRedis.mockResolvedValue(3);

      await service.checkShipActivity();

      expect(shipRepository.updateInactiveShipsInDb).toHaveBeenCalledTimes(1);
      expect(shipRepository.updateInactiveShipsInRedis).toHaveBeenCalledTimes(1);
    });

    it('does not throw when the repository rejects', async () => {
      shipRepository.updateInactiveShipsInDb.mockRejectedValue(new Error('db down'));

      await expect(service.checkShipActivity()).resolves.toBeUndefined();
    });
  });

  describe('flushToRedis', () => {
    it('delegates to the repository', async () => {
      await service.flushToRedis();

      expect(shipRepository.writeShipsToRedis).toHaveBeenCalledTimes(1);
    });
  });

  describe('persistToDatabase', () => {
    it('delegates to the repository', async () => {
      shipRepository.persistShipsToDb.mockResolvedValue({ shipsCount: 1, staticCount: 1 });

      await service.persistToDatabase();

      expect(shipRepository.persistShipsToDb).toHaveBeenCalledTimes(1);
    });
  });
});
