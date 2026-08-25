import { Module } from '@nestjs/common';
import { BaseCrudService } from './base/base.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  providers: [BaseCrudService],
  exports: [BaseCrudService, RedisModule],
})
export class SharedModule {}
