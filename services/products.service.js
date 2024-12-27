const { getproductCollection } = require("../config/db");
const { ObjectId } = require("mongodb");

async function findProductByName(productName) {
  try {
    const productCollection = getproductCollection();
    return await productCollection.findOne({ productName });
  } catch (error) {
    console.error("Error finding product by name:", error);
    throw new Error("Database query error");
  }
}

async function createProduct(productData) {
  try {
    const productCollection = getproductCollection(); 
    const result = await productCollection.insertOne(productData);
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Database insertion error");
  }
}

async function getAllProducts() {
  try {
    const productCollection = getproductCollection();
    return await productCollection.find({}).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Database query error");
  }
}

async function getProductById(productId) {
  try {
    const productCollection = getproductCollection();
    return await productCollection.findOne({ _id: new ObjectId(productId) });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw new Error("Database query error");
  }
}

module.exports = {
  findProductByName,
  createProduct,
  getAllProducts,
  getProductById
};