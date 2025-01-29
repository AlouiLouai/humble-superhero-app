import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Access the ConfigService to get the PORT value from .env
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Use the Swagger UI , already have fastify/static for CSS, HTML within UI
  const config = new DocumentBuilder()
    .setTitle('Superhero API')
    .setDescription('API documentation for the Humble Superhero Assessment')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  await app.listen(port);
}

// Call and await the bootstrap function here
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
