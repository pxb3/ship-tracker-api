import { Test, TestingModule } from '@nestjs/testing';
import WebSocket from 'ws';
import { ShipSocketClientService } from './ship-socket-client.service';
import { ShipIngestionService } from './ship-ingestion.service';

jest.mock('ws', () => {
  const { EventEmitter } = require('events');
  class MockWebSocket extends EventEmitter {
    static OPEN = 1;
    static instances: MockWebSocket[] = [];
    readyState = MockWebSocket.OPEN;
    send = jest.fn();
    close = jest.fn();
    terminate = jest.fn();
    ping = jest.fn();
    url: string;
    constructor(url: string) {
      super();
      this.url = url;
      MockWebSocket.instances.push(this);
    }
  }
  return MockWebSocket;
});

const MockWebSocketCtor = WebSocket as unknown as { instances: any[] };

describe('ShipSocketClientService', () => {
  let service: ShipSocketClientService;
  let shipIngestion: {
    processPositionReport: jest.Mock;
    processStaticData: jest.Mock;
    flushToRedis: jest.Mock;
    persistToDatabase: jest.Mock;
    checkShipActivity: jest.Mock;
  };

  beforeEach(async () => {
    jest.useFakeTimers();
    (MockWebSocketCtor as any).instances = [];

    shipIngestion = {
      processPositionReport: jest.fn(),
      processStaticData: jest.fn(),
      flushToRedis: jest.fn().mockResolvedValue(undefined),
      persistToDatabase: jest.fn().mockResolvedValue(undefined),
      checkShipActivity: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipSocketClientService,
        { provide: ShipIngestionService, useValue: shipIngestion },
      ],
    }).compile();

    service = module.get<ShipSocketClientService>(ShipSocketClientService);
  });

  afterEach(() => {
    service.onModuleDestroy();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  function latestSocket(): any {
    const instances = (MockWebSocketCtor as any).instances;
    return instances[instances.length - 1];
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('connects on init and sends a subscription once the socket opens', () => {
    service.onModuleInit();
    const socket = latestSocket();

    socket.emit('open');

    expect(socket.send).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(socket.send.mock.calls[0][0]);
    expect(payload).toHaveProperty('APIkey');
    expect(payload.BoundingBoxes).toEqual([[[-180, -90], [180, 90]]]);
  });

  it('delegates PositionReport messages to ShipService', () => {
    service.onModuleInit();
    const socket = latestSocket();

    const message = JSON.stringify({
      MessageType: 'PositionReport',
      MetaData: { MMSI: 111 },
      Message: { PositionReport: { Valid: true, Latitude: 1 } },
    });
    socket.emit('message', message);

    expect(shipIngestion.processPositionReport).toHaveBeenCalledWith(
      { MMSI: 111 },
      { Valid: true, Latitude: 1 },
    );
  });

  it('delegates ShipStaticData messages to ShipService', () => {
    service.onModuleInit();
    const socket = latestSocket();

    const message = JSON.stringify({
      MessageType: 'ShipStaticData',
      Message: { ShipStaticData: { UserID: 111, Name: 'Test' } },
    });
    socket.emit('message', message);

    expect(shipIngestion.processStaticData).toHaveBeenCalledWith({ UserID: 111, Name: 'Test' });
  });

  it('ignores malformed JSON messages without throwing', () => {
    service.onModuleInit();
    const socket = latestSocket();

    expect(() => socket.emit('message', 'not-valid-json')).not.toThrow();
    expect(shipIngestion.processPositionReport).not.toHaveBeenCalled();
    expect(shipIngestion.processStaticData).not.toHaveBeenCalled();
  });

  it('starts batch, persistence and activity-check timers that call into ShipService', () => {
    service.onModuleInit();

    jest.advanceTimersByTime(60_000);

    expect(shipIngestion.flushToRedis).toHaveBeenCalled();
    expect(shipIngestion.persistToDatabase).toHaveBeenCalled();
    expect(shipIngestion.checkShipActivity).toHaveBeenCalled();
  });

  it('schedules a reconnect with backoff after the socket closes unexpectedly', () => {
    service.onModuleInit();
    const firstSocket = latestSocket();

    firstSocket.emit('close', 1006, Buffer.from('abnormal'));

    jest.advanceTimersByTime(1000);

    expect((MockWebSocketCtor as any).instances.length).toBe(2);
  });

  it('stops reconnecting and closes the socket on destroy', () => {
    service.onModuleInit();
    const socket = latestSocket();

    service.onModuleDestroy();

    expect(socket.close).toHaveBeenCalled();

    jest.clearAllMocks();
    jest.advanceTimersByTime(100_000);

    expect(shipIngestion.flushToRedis).not.toHaveBeenCalled();
    expect((MockWebSocketCtor as any).instances.length).toBe(1);
  });
});
