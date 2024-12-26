const express = require('express');
const { addProduct } = require('../controller/products.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', addProduct);


module.exports = router;