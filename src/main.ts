import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan("dev"));
  await app.listen(8080);

}

bootstrap();
