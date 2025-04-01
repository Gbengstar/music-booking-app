import { connect } from 'mongoose';

export const connectDatabase = async () => {
  const databaseUri = process.env.MONGODB_URL;
  await connect(databaseUri).then(() => {
    console.debug('Database connected');
  });
};
