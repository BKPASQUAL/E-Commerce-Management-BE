const { validationResult } = require("express-validator");
const productService = require("../services/products.service");

// Add a new product
async function addProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productName, productCode, mrp, sellingPrice, category, brand } = req.body;

  try {
    // Check if the product already exists
    const productExists = await productService.findProductByName(productName);
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create the product
    const newProduct = {
      productName,
      productCode,
      mrp,
      sellingPrice,
      category, 
      brand,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await productService.createProduct(newProduct);

    return res.status(201).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({ message: "Server error while adding product" });
  }
}

async function getAllProducts(req,res) {
   try {
      const product = await productService.getAllProducts();
      return res.status(200).json({ product });
    } catch (error) {
      console.error("Error in getAllProduct:", error);
      return res.status(500).json({ message: "Server error while retrieving product" });
    }
  }

module.exports = {
  addProduct,
  getAllProducts
};
