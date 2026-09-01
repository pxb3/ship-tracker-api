
import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipResolver } from './ship.resolver';
import { ShipGrpcController } from './ship-grpc.controller';
import { RedisModule } from 'src/shared/redis.module';

// API-facing module: GraphQL + gRPC read paths only. Ingestion (websocket,
// Redis/DB writes, archiving) lives in ShipIngestionModule (ingestion worker process).
@Module({
  imports: [RedisModule],
  controllers: [ShipGrpcController],
  providers: [ShipService, ShipResolver],
})
export class ShipModule {}
