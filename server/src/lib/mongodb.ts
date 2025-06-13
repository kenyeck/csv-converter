import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'csv_converter';
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Use global variable in development to preserve connection across hot reloads
  if (!(global as any)._mongoClientPromise) { // eslint-disable-line @typescript-eslint/no-explicit-any
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect(); // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  clientPromise = (global as any)._mongoClientPromise; // eslint-disable-line @typescript-eslint/no-explicit-any
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  return (await clientPromise).db(dbName);
}
