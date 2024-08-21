import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1/');
  await app.listen(PORT, () =>
    console.log('---------server started on PORT---', PORT),
  );
};
bootstrap();
