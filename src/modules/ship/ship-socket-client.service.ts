import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import WebSocket from 'ws';
import { ShipIngestionService } from './ship-ingestion.service';

@Injectable()
export class ShipSocketClientService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ShipSocketClientService.name);
  private API_KEY = process.env.SHIP_SOCKET_API_KEY || '';
  private socket: WebSocket | null = null;

  // WebSocket connection state
  private shouldReconnect = true;
  private reconnectAttempts = 0;
  private maxReconnectDelayMs = 60_000;
  private heartbeatIntervalMs = 20_000;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private lastPongAt: number | null = null;

  // Batch and persistence timers
  private batchIntervalMs = Number(process.env.SHIP_REDIS_BATCH_MS) || 500;
  private batchTimer: NodeJS.Timeout | null = null;
  private persistIntervalMs = Number(process.env.SHIP_PERSIST_INTERVAL_MS) || 20_000;
  private persistTimer: NodeJS.Timeout | null = null;
  private activityCheckIntervalMs = Number(process.env.SHIP_ACTIVITY_CHECK_MS) || 1 * 60 * 1000;
  private activityCheckTimer: NodeJS.Timeout | null = null;

  constructor(private readonly shipIngestion: ShipIngestionService) {}

  onModuleInit() {
    this.shouldReconnect = true;
    this.connect();

    // Start batch flush timer for Redis writes
    if (!this.batchTimer) {
      this.batchTimer = setInterval(() => void this.shipIngestion.flushToRedis(), this.batchIntervalMs);
    }

    // Start periodic persistence to DB
    if (!this.persistTimer) {
      this.persistTimer = setInterval(() => void this.shipIngestion.persistToDatabase(), this.persistIntervalMs);
    }

    // Start activity check timer
    if (!this.activityCheckTimer) {
      this.activityCheckTimer = setInterval(() => void this.shipIngestion.checkShipActivity(), this.activityCheckIntervalMs);
    }
  }

  private connect() {
    const url = process.env.SHIP_SOCKET_URL || '';
    this.logger.debug(`Connecting to AIS stream at ${url}`);

    // Clean up existing socket if present
    if (this.socket) {
      try {
        // @ts-ignore - removeAllListeners exists on ws
        if (typeof (this.socket as any).removeAllListeners === 'function') {
          (this.socket as any).removeAllListeners();
        }
      } catch (e) {
        this.logger.debug('Error removing listeners from previous socket', e as any);
      }
      try {
        // @ts-ignore - terminate exists on ws
        if (typeof (this.socket as any).terminate === 'function') {
          (this.socket as any).terminate();
        } else {
          this.socket.close();
        }
      } catch (e) {
        this.logger.debug('Error closing previous socket', e as any);
      }
      this.socket = null;
    }

    this.socket = new WebSocket(url);

    this.socket.on('open', () => {
      this.logger.debug('WebSocket open');
      this.reconnectAttempts = 0;
      this.sendSubscription();
      this.startHeartbeat();
    });

    this.socket.on('error', (err) => {
      this.logger.error('WebSocket error', err as any);
    });

    this.socket.on('close', (code, reason) => {
      this.logger.warn(`WebSocket closed: code=${code} reason=${reason.toString()}`);
      this.stopHeartbeat();
      if (this.shouldReconnect) {
        this.scheduleReconnect();
      }
    });

    // @ts-ignore - pong event exists on ws
    this.socket.on('pong', () => {
      this.lastPongAt = Date.now();
    });

    this.socket.on('message', (data) => this.handleMessage(data));
  }

  private sendSubscription() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    const subscriptionMessage = {
      APIkey: this.API_KEY,
      BoundingBoxes: [
        [
          [-180, -90],
          [180, 90],
        ],
      ],
    };
    this.logger.debug('Sending subscription with API key: ' + this.API_KEY);
    try {
      this.socket.send(JSON.stringify(subscriptionMessage));
    } catch (err) {
      this.logger.error('Failed to send subscription', err as any);
    }
  }

  private scheduleReconnect() {
    this.reconnectAttempts += 1;
    const backoff = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), this.maxReconnectDelayMs);
    this.logger.debug(`Scheduling reconnect in ${backoff}ms (attempt ${this.reconnectAttempts})`);
    setTimeout(() => {
      if (this.shouldReconnect) this.connect();
    }, backoff);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.lastPongAt = Date.now();
    this.heartbeatTimer = setInterval(() => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
      try {
        // ws client has ping method
        // @ts-ignore
        if (typeof this.socket.ping === 'function') {
          // send a ping; server should reply with pong
          // @ts-ignore
          this.socket.ping();
        } else {
          // fallback: send application-level ping
          this.socket.send(JSON.stringify({ type: 'ping' }));
        }
      } catch (err) {
        this.logger.warn('Heartbeat send failed', err as any);
      }

      // if we haven't received a pong in 3 intervals, force reconnect
      if (this.lastPongAt && Date.now() - this.lastPongAt > this.heartbeatIntervalMs * 3) {
        this.logger.warn('No pong received recently — terminating socket to force reconnect');
        try {
          // terminate and allow reconnect logic to create a fresh socket
          // @ts-ignore
          if (typeof (this.socket as any).terminate === 'function') (this.socket as any).terminate();
          else this.socket?.close();
        } catch (e) {
          this.logger.error('Error terminating socket', e as any);
        }
      }
    }, this.heartbeatIntervalMs);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    this.lastPongAt = null;
  }

  onModuleDestroy() {
    this.shouldReconnect = false;
    this.stopHeartbeat();

    // Stop all timers
    if (this.persistTimer) {
      clearInterval(this.persistTimer);
      this.persistTimer = null;
    }
    if (this.activityCheckTimer) {
      clearInterval(this.activityCheckTimer);
      this.activityCheckTimer = null;
    }
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }

    // Close WebSocket connection
    if (this.socket) {
      try {
        // @ts-ignore
        if (typeof (this.socket as any).removeAllListeners === 'function') {
          (this.socket as any).removeAllListeners();
        }
      } catch (e) {
        this.logger.debug('Error removing listeners', e as any);
      }
      try {
        this.socket.close();
      } catch (e) {
        this.logger.error('Error closing socket on destroy', e as any);
      }
      this.socket = null;
    }
  }

  private handleMessage(data: WebSocket.Data) {
    let aisMessage: any;
    try {
      aisMessage = JSON.parse(data.toString());
    } catch (e) {
      this.logger.warn('Failed to parse message', data.toString());
      return;
    }

    // Handle control messages
    if (aisMessage?.type === 'pong') {
      this.lastPongAt = Date.now();
      return;
    }

    // Delegate message processing to service layer
    if (aisMessage["MessageType"] === "ShipStaticData") {
      const staticData = aisMessage.Message.ShipStaticData || null;
      if (staticData) {
        this.shipIngestion.processStaticData(staticData);
      }
    }

    if (aisMessage["MessageType"] === "PositionReport") {
      const metaData = aisMessage.MetaData || null;
      const positionReport = aisMessage.Message.PositionReport || null;
      this.shipIngestion.processPositionReport(metaData, positionReport);
    }
  }
}
