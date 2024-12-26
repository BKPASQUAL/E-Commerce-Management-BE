const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbClient;
let usersCollection;
let categoriesCollection;
let productCollection

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
    productCollection = ecommercedb.collection("products");

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

function getproductCollection() {
  return productCollection;
}

module.exports = {
  connectToDatabase,
  getUsersCollection,
  getCategoriesCollection,
  getproductCollection
};
