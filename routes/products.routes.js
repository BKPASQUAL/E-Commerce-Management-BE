const express = require("express");
const productController = require("../controller/products.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

module.exports = router;
