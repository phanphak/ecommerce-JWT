const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProduct, getProducts } = require('../controllers/productController');

router.post('/', auth, createProduct); // Only logged-in users (or admin) can add
router.get('/', getProducts);

module.exports = router;
