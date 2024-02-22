import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api', {
  //   exclude: [{ path: 'auth', method: RequestMethod.ALL }],
  // });
  await app.listen(3000);
}
bootstrap();
