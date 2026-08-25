import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ShipSocketClientService } from '../../src/modules/ship/ship-socket-client.service';

/**
 * Boots the real AppModule (real Prisma + Redis + guards) against the
 * integration test database, mirroring the pipes configured in `src/main.ts`.
 * ShipSocketClientService is stubbed out so tests don't open a real
 * connection to the external AIS stream.
 */
export async function createIntegrationApp(): Promise<INestApplication> {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ShipSocketClientService)
    .useValue({})
    .compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.init();
  return app;
}
