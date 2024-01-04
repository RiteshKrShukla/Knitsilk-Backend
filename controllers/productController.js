// controllers/productController.js
const Product = require('../models/Product');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteMultipleProducts: async (req, res) => {
        try {
            console.log(req.body);
            const { productIds } = req.body;

            if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
                return res.status(400).json({ error: 'Invalid or empty productIds array' });
            }

            const deletedProducts = await Product.deleteMany({ _id: { $in: productIds } });

            if (deletedProducts.deletedCount === 0) {
                return res.status(404).json({ error: 'No products found for the provided productIds' });
            }
            res.json({ message: 'Products deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
