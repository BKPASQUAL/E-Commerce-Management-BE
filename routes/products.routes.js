const express = require("express");
const productController = require("../controller/products.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", verifyToken , productController.addProduct);
router.get("/", verifyToken, productController.getAllProducts);
router.get("/minimumQuantity", verifyToken , productController.getMinimumQuantityProducts);
router.get("/:id", verifyToken ,productController.getProductById);
router.put("/:id",verifyToken,  productController.updateProduct);
router.delete("/:id", verifyToken , productController.deleteProduct);

module.exports = router;
