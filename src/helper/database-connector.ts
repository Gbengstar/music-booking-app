import { connect } from 'mongoose';

export const connectDatabase = async () => {
  const databaseUri = process.env.MONGODB_URL;
  if (!databaseUri) {
    throw new Error('Mongodb database uri is required to startup server');
  }
  await connect(databaseUri);
};
