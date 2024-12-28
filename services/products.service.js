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

async function updateProduct(productId, updateData) {
  try {
    const productCollection = getproductCollection();
    return await productCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Database update error");
  }
}

async function deleteProduct(productId) {
  try {
    const productCollection = getproductCollection();
    return await productCollection.deleteOne({ _id: new ObjectId(productId) });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Database deletion error");
  }
}

async function getMinimumQuantityProducts() {
  try {
    const productCollection = getproductCollection();
    // Fetch products sorted by quantity in ascending order and limit to 10
    return await productCollection
      .find({})
      .sort({ quantity: 1 })
      .limit(6)
      .toArray();
  } catch (error) {
    console.error("Error getting minimum quantity products:", error);
    throw new Error("Database query error");
  }
}

async function getProductCount() {
  try {
    const productCollection = getproductCollection();
    return await productCollection.countDocuments({});
  } catch (error) {
    console.error("Error getting product count:", error);
    throw new Error("Database query error");
  }
}

module.exports = {
  findProductByName,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMinimumQuantityProducts,
  getProductCount, 
};
