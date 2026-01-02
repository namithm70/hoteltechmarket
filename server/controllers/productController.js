const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const uploadFile = require('../utils/s3Upload');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const productType = req.query.productType ? { productType: req.query.productType } : {};

    const products = await Product.find({ ...keyword, ...category, ...productType }).populate('vendor', 'name companyName');

    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('vendor', 'name companyName');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product (Vendor only)
// @route   POST /api/products
// @access  Private/Vendor
const createProduct = asyncHandler(async (req, res) => {
    // Note: req.body will contain text fields, req.files will contain images
    // For simplicity, we assume the frontend sends data + images
    // This logic depends on how we structure the form data submission.
    // For now, let's assume we create the initial product record.

    const {
        title,
        description,
        price,
        category,
        productType, // 'Hardware' or 'Software'
        stockCount,
        shippingWeight,
        dimensions,
        downloadLink,
        licenseType,
        trialLink
    } = req.body;

    // Basic validation for common fields
    if (!title || !description || !price || !category || !productType) {
        res.status(400);
        throw new Error('Please fill in all required base fields');
    }

    const productData = {
        vendor: req.user._id,
        title,
        description,
        price,
        category,
        productType,
        // Add images URL array here if processed
        images: req.body.images || [], // Expecting array of URLs or handle upload separately
    };

    // Add type-specific fields
    if (productType === 'Hardware') {
        productData.stockCount = stockCount;
        productData.shippingWeight = shippingWeight;
        productData.dimensions = dimensions;
    } else if (productType === 'Software') {
        productData.downloadLink = downloadLink;
        productData.licenseType = licenseType;
        productData.trialLink = trialLink;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Vendor
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Check ownership
        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to delete this product');
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get all unique categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Product.find({}).distinct('category');
    res.json(categories);
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    getCategories,
};
