import { MongoClient } from 'mongodb';

const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@rcsrc-canada.vwhedxp.mongodb.net/`;

export const getMongoClient = async () => {
    /**
     * Global is used here to maintain a cached connection across hot reloads
     * in development. This prevents connections growing exponentiatlly
     * during API Route usage.
     * https://github.com/vercel/next.js/pull/17666
     */
    if (!global.mongoClientPromise) {
        const client = new MongoClient(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        // client.connect() returns an instance of MongoClient when resolved
        global.mongoClientPromise = client.connect()
    }

    return global.mongoClientPromise;

}

export const getMongoDb = async (dbName) => {

    const mongoClient = await getMongoClient();
    return mongoClient.db(dbName);

}