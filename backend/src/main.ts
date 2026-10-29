import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.use(cookieParser());
  
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
  })

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
