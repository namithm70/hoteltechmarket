const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug } = require('../controllers/blogController');

router.route('/').get(getBlogs);
router.route('/:slug').get(getBlogBySlug);

module.exports = router;
