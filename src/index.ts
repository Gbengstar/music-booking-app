import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './helper/database-connector';
import { mainRouter } from './route';
import { globalErrorHandler } from './middleware/global-error.middleware';
import { notFoundPathHandler } from './middleware/not-found-path.middleware';
import { envConfigValidator } from './validator/env.validator';
import { validate } from './helper/validator.helper';
import { requestLogger } from './middleware/request-logger.middleware';

async function app(): Promise<void> {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);
  app.use('/api/v1', mainRouter);
  app.use('*', notFoundPathHandler);
  app.use(globalErrorHandler);

  const env = await validate(envConfigValidator, process.env);
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log('App is ready to receive requests on port: ', env.PORT);
  });
}

app().catch((error) => {
  console.error('Error message: ', error.message);
  console.error('Error stack: ', error.stack);
});
