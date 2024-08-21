import * as express from 'express';
import helmet from 'helmet';
import { Context } from 'aws-lambda';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';

const express_app = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express_app));

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: 'Content-Type,Authorization,',
  });

  app.use(helmet());

  await app.init();

  return createServer(express_app);
}

export const handler = async (event: any, context: Context) => {
  const server = await bootstrap();

  return proxy(server, event, context, 'PROMISE').promise;
};
