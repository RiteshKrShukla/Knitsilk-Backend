const category = require('../models/catagoryModel');

const categoryController = {
    getAllcategories: async (req, res) => {
        try {
            const categories = await category.find();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createcategory: async (req, res) => {
        try {
            const { categories } = req.body;
            const newcategory = new category({ categories });
            const savedcategory = await newcategory.save();
            res.json(savedcategory);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    updatecategory: async (req, res) => {
        const { id } = req.params;
        const { categories } = req.body;

        try {
            const updatedcategory = await category.findByIdAndUpdate(
                id,
                { categories },
                { new: true }
            );

            if (!updatedcategory) {
                return res.status(404).json({ error: 'category not found' });
            }

            res.json(updatedcategory);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletecategory: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedcategory = await category.findByIdAndDelete(id);

            if (!deletedcategory) {
                return res.status(404).json({ error: 'category not found' });
            }

            res.json({ message: 'category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = categoryController;
