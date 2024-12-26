const express = require("express");
const userRoutes = require("./user.routes");
const categoriesRoutes = require("./category.routes");
const productRoutes = require("./products.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productRoutes);

module.exports = router;
