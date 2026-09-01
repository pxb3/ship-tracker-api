import { Module } from '@nestjs/common';
import { RedisModule } from 'src/shared/redis.module';
import { ShipIngestionService } from './ship-ingestion.service';
import { ShipRepository } from './ship.repository';
import { ShipSocketClientService } from './ship-socket-client.service';

// Ingestion-only module: websocket ingest -> Redis/DB writes + inactivity archiving.
// No controllers/resolvers here; runs as a background worker (see ingestion-main.ts).
@Module({
  imports: [RedisModule],
  providers: [ShipIngestionService, ShipRepository, ShipSocketClientService],
})
export class ShipIngestionModule {}
