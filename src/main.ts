import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Access the ConfigService to get the PORT value from .env
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.enableCors();
  await app.listen(port);
}

// Call and await the bootstrap function here
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
