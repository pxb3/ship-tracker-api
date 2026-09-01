import { NestFactory } from '@nestjs/core';
import { IngestionAppModule } from './ingestion-app.module';

// No inbound HTTP/gRPC/GraphQL server here — this process only connects out
// to the AIS websocket, Redis and Postgres, so an application context (no
// listening port) is all that's needed.
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(IngestionAppModule);
  app.enableShutdownHooks();
}

bootstrap();
