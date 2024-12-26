const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbClient;
let usersCollection;
let categoriesCollection;

async function connectToDatabase() {
  try {
    dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await dbClient.connect();
    const ecommercedb = dbClient.db("E-Commerce");
    usersCollection = ecommercedb.collection("users");
    categoriesCollection = ecommercedb.collection("categories");

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function getUsersCollection() {
  return usersCollection;
}

function getCategoriesCollection() {
  return categoriesCollection;
}

module.exports = {
  connectToDatabase,
  getUsersCollection,
  getCategoriesCollection,
};
