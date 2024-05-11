import knex from "knex";
import dotenv from 'dotenv';

dotenv.config();

export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: process.env.CONNECTION_FILENAME,
  },
  useNullAsDefault: true,
});
