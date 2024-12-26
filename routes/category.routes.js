const express = require('express');
const { addCategory } = require('../controller/categories.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', addCategory);


module.exports = router;