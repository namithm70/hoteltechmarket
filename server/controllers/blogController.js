const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
});

// @desc    Fetch single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

module.exports = {
    getBlogs,
    getBlogBySlug
};
