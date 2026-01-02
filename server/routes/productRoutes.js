const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    getCategories,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getProducts)
    .post(protect, authorize('vendor', 'admin'), createProduct);

router.get('/categories', getCategories);

router
    .route('/:id')
    .get(getProductById)
    .delete(protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
