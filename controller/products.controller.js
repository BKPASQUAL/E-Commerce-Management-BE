const { validationResult } = require("express-validator");
const productService = require("../services/products.service");

async function addProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productName, productCode, description, sellingPrice, category, brand ,quantity } = req.body;

  try {
    const productExists = await productService.findProductByName(productName);
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = {
      productName,
      productCode,
      description,
      sellingPrice,
      category, 
      brand,
      quantity,
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

  async function getProductById(req, res) {
    const { id } = req.params;
  
    try {
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json({ product });
    } catch (error) {
      console.error("Error in getProductById:", error);
      return res.status(500).json({ message: "Server error while retrieving product" });
    }
  }

  async function updateProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const result = await productService.updateProduct(id, updateData);
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error in updateProduct:", error);
      return res.status(500).json({ message: "Server error while updating product" });
    }
  }
  
  async function deleteProduct(req, res) {
    const { id } = req.params;
  
    try {
      const result = await productService.deleteProduct(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      return res.status(500).json({ message: "Server error while deleting product" });
    }
  }
  
  async function getMinimumQuantityProducts(req, res) {
    try {
      const products = await productService.getMinimumQuantityProducts();
      return res.status(200).json({ products });
    } catch (error) {
      console.error("Error in getMinimumQuantityProducts:", error);
      return res.status(500).json({ message: "Server error while retrieving minimum quantity products" });
    }
  }

  
module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMinimumQuantityProducts
};
