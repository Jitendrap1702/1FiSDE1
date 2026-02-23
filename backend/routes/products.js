const express = require('express');
const ProductModel = require('../models/productModel');
const { getAllProducts, createProduct, getProductBySlug, updateProductBySlug, deleteProductBySlug } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a product by slug
router.get('/:slug', getProductBySlug);

// Update a product by slug
router.put('/:slug', updateProductBySlug);

// Delete a product by slug
router.delete('/:slug', deleteProductBySlug);

module.exports = router;