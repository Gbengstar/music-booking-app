import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './helper/database-connector';
import { mainRouter } from './route';
import { globalErrorHandler } from './middleware/global-error.middleware';

async function app(): Promise<void> {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/', mainRouter);

  await connectDatabase();
  const PORT = process.env.PORT;
  if (!PORT) {
    throw new Error('Port is required to start up server');
  }
  app.listen(PORT, () => {
    console.log('App is ready to receive requests on port: ', PORT);
  });
}

app().catch((error) => {
  console.error('Error message: ', error.message);
  console.error('Error stack: ', error.stack);
});
