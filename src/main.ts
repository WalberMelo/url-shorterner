import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: configService.get<string>('CORS_METHODS'),
    credentials: configService.get<boolean>('CORS_CREDENTIALS'),
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(configService.get('PORT') || 3333);
}
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
