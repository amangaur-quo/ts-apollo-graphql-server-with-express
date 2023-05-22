import { config } from 'dotenv';

const { parsed } = config();

export const {
  PORT,
  DB_URI = 'mongodb://127.0.0.1:27017/apollo-graphql-server',
  BASE_URL,
  URL = `${BASE_URL}${PORT}`,
  SECRET,
} = parsed;
