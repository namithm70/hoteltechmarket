const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a product title'],
        trim: true,
        maxlength: [100, 'Product title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true // Will be generated from title
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
            'Property Management Systems',
            'Point of Sale',
            'Guest Experience',
            'Revenue Management',
            'Hardware',
            'IoT',
            'Security',
            'Other'
        ]
    },
    images: {
        type: [String],
        default: []
    },
    demoLink: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    discriminatorKey: 'productType'
});

// Middleware to create slug from title


const Product = mongoose.model('Product', productSchema);

// Hardware Discriminator
const HardwareProduct = Product.discriminator('Hardware', new mongoose.Schema({
    stockCount: {
        type: Number,
        required: [true, 'Please add stock count for hardware']
    },
    shippingWeight: {
        type: Number,
        required: [true, 'Please add shipping weight (kg) for hardware']
    },
    dimensions: {
        type: String, // e.g., "10x10x10 cm"
        required: [true, 'Please add dimensions for hardware']
    }
}));

// Software Discriminator
const SoftwareProduct = Product.discriminator('Software', new mongoose.Schema({
    downloadLink: {
        type: String,
        required: [true, 'Please add a download link for software']
    },
    licenseType: {
        type: String,
        enum: ['subscription', 'lifetime'],
        required: [true, 'Please specify license type for software']
    },
    trialLink: {
        type: String
    }
}));

module.exports = Product;
