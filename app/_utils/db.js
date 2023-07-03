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
// ************************************************************************************************//
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb //
// ************************************************************************************************//

if (!process.env.DATABASE_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGO_DB_URL"');
}

const uri = process.env.DATABASE_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise = MongoClient;

if (process.env.NODE_ENV === "development") {

	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}

	clientPromise = global._mongoClientPromise;

} else {

	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();

}

console.debug(`process.env.NODE_ENV = ${process.env.NODE_ENV}`)

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;