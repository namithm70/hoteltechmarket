const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get AI recommendations
// @route   POST /api/ai/recommend
// @access  Public
const recommendProducts = asyncHandler(async (req, res) => {
    const { query } = req.body;

    if (!query) {
        res.status(400);
        throw new Error('Query is required');
    }

    const products = await Product.find({}).populate('vendor', 'companyName');

    // Simple Heuristic Scoring Engine
    const tokens = query.toLowerCase().split(' ').filter(w => w.length > 2); // simplistic tokenization

    const scoredProducts = products.map(product => {
        let score = 0;
        const titleLower = product.title.toLowerCase();
        const descLower = product.description.toLowerCase();
        const catLower = product.category.toLowerCase();

        // 1. Category Matching (Highest Weight)
        tokens.forEach(token => {
            if (catLower.includes(token)) score += 10;
        });

        // 2. Title Matching (Medium Weight)
        tokens.forEach(token => {
            if (titleLower.includes(token)) score += 5;
        });

        // 3. Description Matching (Low Weight)
        tokens.forEach(token => {
            if (descLower.includes(token)) score += 1;
        });

        // 4. Price Context
        if (query.toLowerCase().includes('free') || query.toLowerCase().includes('cheap')) {
            if (product.price === 0 || product.price < 50) score += 5;
        }

        return { ...product.toObject(), score };
    });

    // Filter and Sort
    const recommendations = scoredProducts
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Top 3

    // Generate Conversational Response
    let message = '';
    if (recommendations.length === 0) {
        message = "I couldn't find any specific matches for that, but you can browse our categories for more options.";
    } else {
        const topMatch = recommendations[0];
        message = `Based on your needs, I recommend checking out **${topMatch.title}**. It fits your requirements well. Here are the top matches I found:`;
    }

    res.json({
        message,
        recommendations
    });
});

module.exports = { recommendProducts };
