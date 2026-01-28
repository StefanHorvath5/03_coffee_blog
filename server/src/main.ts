import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 10, 
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
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(Number(process.env.PORT), '0.0.0.0');
  console.log(`Backend running on ${Number(process.env.PORT)}`);
}
bootstrap();
