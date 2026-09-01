import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShipIngestionModule } from './modules/ship/ship-ingestion.module';

// Root module for the ingestion worker process: no HTTP/GraphQL/gRPC surface,
// just the websocket client + Redis/DB writers + inactivity archiving job.
@Module({
  imports: [PrismaModule, ShipIngestionModule],
})
export class IngestionAppModule {}
