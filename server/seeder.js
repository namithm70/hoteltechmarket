const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const blogs = require('./data/blogs');
const User = require('./models/User');
const Product = require('./models/Product');
const Blog = require('./models/Blog');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await Blog.deleteMany();
        await User.deleteMany();

        // Import Users
        const createdUsers = await User.create(users);

        // Get the vendor user to assign products to
        const adminUser = createdUsers[0]._id;
        const vendorUser = createdUsers.find(u => u.role === 'vendor');

        if (!vendorUser) {
            throw new Error("No vendor user found in seeded users");
        }

        // Map products to the vendor and create one by one to ensure hooks run
        for (const product of products) {
            const slug = product.title.split(' ').join('-').toLowerCase() + '-' + Date.now() + Math.floor(Math.random() * 1000);
            const productData = { ...product, vendor: vendorUser._id, slug };
            await Product.create(productData);
        }

        // Import Blogs
        for (const blog of blogs) {
            // Create slug manually to avoid uniqueness issues in bulk/async
            const slug = blog.title.split(' ').join('-').toLowerCase() + '-' + Date.now() + Math.floor(Math.random() * 1000);
            await Blog.create({ ...blog, slug });
        }

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Blog.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
