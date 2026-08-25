
import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipResolver } from './ship.resolver';
import { ShipRepository } from './ship.repository';
import { ShipSocketClientService } from './ship-socket-client.service';
import { ShipGrpcController } from './ship-grpc.controller';
import { RedisModule } from 'src/shared/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [ShipGrpcController],
  providers: [ShipService, ShipRepository, ShipResolver, ShipSocketClientService],
})
export class ShipModule {}
