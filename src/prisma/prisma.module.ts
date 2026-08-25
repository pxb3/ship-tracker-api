import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Global module providing a single shared PrismaService (and its underlying
 * PrismaClient/connection pool) to the whole application. Because this module
 * is marked @Global(), any module can inject PrismaService without needing to
 * import PrismaModule directly, as long as PrismaModule is imported once (in
 * AppModule).
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
