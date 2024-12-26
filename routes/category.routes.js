const express = require('express');
const { addCategory, getAllCategories } = require('../controller/categories.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', addCategory);
router.get('/', getAllCategories);


module.exports = router;