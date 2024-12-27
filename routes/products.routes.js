const express = require('express');
const { addProduct, getAllProducts } = require('../controller/products.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', addProduct);
router.get('/', getAllProducts);


module.exports = router;