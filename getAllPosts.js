import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://indhiraraj7:D0Jhg0ZfDNpLWvSY@cluster0.3p5fm7c.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function getPosts() {
  try {
    // Connect to the "testDb" database and access its "testCollection" collection
    await client.connect();
    const database = client.db("testDb");
    const collection = database.collection("testCollection");


    // Find all documents in the "testCollection" collection
    const documents = await collection.find({}).toArray();


    return JSON.stringify(documents, null, 2);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}

export default getPosts;
