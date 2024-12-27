const express = require("express");
const productController = require("../controller/products.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/minimumQuantity", productController.getMinimumQuantityProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
