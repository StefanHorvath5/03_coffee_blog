import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  app.use(cookieParser());

  const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
  if (!FRONTEND_ORIGIN) {
    throw new Error('FRONTEND_ORIGIN is not defined');
  }

  app.enableCors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skip: (req) => req.method === 'OPTIONS',
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, please try again after 15 minutes',
  });

  app.use('/api/auth', authLimiter);

  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      limit: 200,
      skip: (req) => req.method === 'OPTIONS',
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(Number(process.env.PORT), '0.0.0.0');
  console.log(`Backend running on ${Number(process.env.PORT)}`);
}
bootstrap();

// // local:
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
// import * as cookieParser from 'cookie-parser';
// import helmet from 'helmet';
// import { rateLimit } from 'express-rate-limit';
// import * as express from 'express';
// import * as dotenv from 'dotenv';
// dotenv.config();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(helmet());

//   app.use(express.json({ limit: '100kb' }));
//   app.use(express.urlencoded({ extended: true, limit: '100kb' }));

//   app.use(cookieParser());

//   app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

//   app.useGlobalFilters(new AllExceptionsFilter());

//   app.enableCors({
//     origin: process.env.FRONTEND_ORIGIN,
//     credentials: true,
//   });

//   await app.listen(Number(process.env.PORT));
//   console.log(`Backend running on ${Number(process.env.PORT)}`);
// }
// bootstrap();
