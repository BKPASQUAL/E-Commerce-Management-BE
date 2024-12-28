const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbClient;
let usersCollection;
let categoriesCollection;
let productCollection;

async function connectToDatabase() {
  try {
    dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    
    // Establish the database connection
    await dbClient.connect();

    // Select the database
    const ecommercedb = dbClient.db("E-Commerce");

    // Initialize collections
    usersCollection = ecommercedb.collection("users");
    categoriesCollection = ecommercedb.collection("categories");
    productCollection = ecommercedb.collection("products");

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Database connection failed");
  }
}

function getUsersCollection() {
  if (!usersCollection) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return usersCollection;
}

function getCategoriesCollection() {
  if (!categoriesCollection) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return categoriesCollection;
}

function getProductCollection() {
  if (!productCollection) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return productCollection;
}

async function closeDatabaseConnection() {
  if (dbClient) {
    await dbClient.close();
    console.log("Database connection closed");
  } else {
    console.warn("Database connection is not open");
  }
}

module.exports = {
  connectToDatabase,
  getUsersCollection,
  getCategoriesCollection,
  getProductCollection,
  closeDatabaseConnection,
};
