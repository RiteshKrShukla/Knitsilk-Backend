const subcategory = require('../models/subcategoryModel');

const subcategoryController = {
    getAllsubcategories: async (req, res) => {
        try {
            const subcategories = await subcategory.find();
            res.json(subcategories);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createsubcategory: async (req, res) => {
        try {
            const { subcategories,category } = req.body;
            console.log(category)
            const newsubcategory = new subcategory({ subcategories,category });
            const savedsubcategory = await newsubcategory.save();
            res.json(savedsubcategory);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    updatesubcategory: async (req, res) => {
        const { id } = req.params;
        const { subcategories } = req.body;

        try {
            const updatedsubcategory = await subcategory.findByIdAndUpdate(
                id,
                { subcategories },
                { new: true }
            );

            if (!updatedsubcategory) {
                return res.status(404).json({ error: 'subcategory not found' });
            }

            res.json(updatedsubcategory);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletesubcategory: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedsubcategory = await subcategory.findByIdAndDelete(id);

            if (!deletedsubcategory) {
                return res.status(404).json({ error: 'subcategory not found' });
            }

            res.json({ message: 'subcategory deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = subcategoryController;
