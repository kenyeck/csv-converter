import { Db, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DB_MONGO_URL ?? '');
const dbName = 'cvs_converter';
let db: Db | null = null;

export async function getDb() {
  if (db) {
    return db;
  }
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
  return db;
}
