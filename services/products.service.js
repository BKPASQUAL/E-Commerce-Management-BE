const { getproductCollection } = require("../config/db");

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

module.exports = {
  findProductByName,
  createProduct,
};
