import { Collection, MongoClient, ObjectId } from 'mongodb';

type MongoObject = Record<string, unknown>;

const uri = 'mongodb://root:password@localhost:27017/test?authSource=admin';
const dbName = 'test';
const collectionName = 'activities';

let client: MongoClient | undefined;
let collection: Collection | undefined;

// CONNECT
async function connect(): Promise<void> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log('MongoDB connected');
  }
}

// DISCONNECT
async function disconnect(): Promise<void> {
  if (client) {
    await client.close();
    client = undefined;
    collection = undefined;
    console.log('MongoDB disconnected');
  }
}

// INSERT
async function insert(data: MongoObject): Promise<MongoObject> {
  if (!collection) throw new Error('Not connected to database');
  const result = await collection.insertOne(data);
  return { _id: result.insertedId, ...data };
}

// INSERT MANY
async function insertMany(data: MongoObject[]): Promise<string[]> {
  if (!collection) throw new Error('Not connected to database');
  const result = await collection.insertMany(data);
  return Object.values(result.insertedIds).map((id) => id.toString());
}

// FIND ONE
async function findById(id: string): Promise<MongoObject | null> {
  if (!collection) throw new Error('Not connected to database');
  return await collection.findOne({ _id: new ObjectId(id) });
}

// FIND MANY
async function findAll(query: MongoObject = {}): Promise<MongoObject[]> {
  if (!collection) throw new Error('Not connected to database');
  return await collection.find(query).toArray();
}

// UPDATE
async function updateOne(
  id: string,
  updates: MongoObject,
): Promise<MongoObject | null> {
  if (!collection) throw new Error('Not connected to database');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates },
  );
  return result.modifiedCount ? { _id: new ObjectId(id), ...updates } : null;
}

// DELETE ONE
async function deleteOne(id: string): Promise<boolean> {
  if (!collection) throw new Error('Not connected to database');

  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// DELETE MANY
async function deleteMany(ids: string[]): Promise<number> {
  if (!collection) throw new Error('Not connected to database');

  const result = await collection.deleteMany({
    _id: {
      $in: ids.map((id) => new ObjectId(id)),
    },
  });
  return result.deletedCount;
}

export {
  connect,
  deleteMany,
  deleteOne,
  disconnect,
  findAll,
  findById,
  insert,
  insertMany,
  updateOne,
};
