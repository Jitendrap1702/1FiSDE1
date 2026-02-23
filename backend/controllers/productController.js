const ProductModel = require('../models/productModel');
const slugify = require('slugify');

// Get all products
exports.getAllProducts = async (req,res) => {
    try{
        const products = await ProductModel.find({});
        res.status(200).json({
            message: 'Get all products',
            data: products
        });
    }catch (error){
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const {name, brandName, description, category, cashback, variants, colors} = req.body;
    try{
        const slug = slugify(name, { lower: true });
        const newProduct = await ProductModel.create({name, brandName, description, category, cashback, variants, colors, slug});
        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct
        });
    }catch (error) {
        res.status(500).json({ 
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Get a product by slug
exports.getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await ProductModel.findOne({ slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            message: 'Product found',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// Update a product by Slug
exports.updateProductBySlug = async (req, res) => {
    const { slug } = req.params;
    const { name, brandName, description, category, cashback, variants } = req.body;
    try {
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { slug },
            { name, brandName, description, category, cashback, variants },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete a product by Slug
exports.deleteProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const deletedProduct = await ProductModel.findOneAndDelete({ slug });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            message: 'Product deleted successfully',
            data: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};