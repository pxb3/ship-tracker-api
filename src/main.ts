import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation pipe for REST endpoints
  // Note: GraphQL has its own validation via schema, and we've added class-validator
  // decorators to critical input types. Keep forbidNonWhitelisted=true for REST security.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.enableCors({
    origin: process.env.FRONTEND_URL, // or your frontend URL
    credentials: true,
  });
  app.useLogger(['log', 'error', 'warn', 'debug']);

  // start gRPC microservice for ship streaming
  // prefer runtime proto in dist (when built), otherwise fall back to src for dev
  const distProto = join(__dirname, 'proto', 'ship.proto');
  const srcProto = join(process.cwd(), 'src', 'proto', 'ship.proto');
  const protoPath = existsSync(distProto) ? distProto : srcProto;
  const grpcPort = process.env.SHIP_GRPC_PORT ?? '50051';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'ship',
      protoPath,
      url: `0.0.0.0:${grpcPort}`,
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
