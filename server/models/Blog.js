const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        default: 'HotelTechMarket Team'
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/800x400'
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Blog', blogSchema);
