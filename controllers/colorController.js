const color = require('../models/colorsModel');

const colorController = {
    getAllcolors: async (req, res) => {
        try {
            const colors = await color.find();
            res.json(colors);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createcolor: async (req, res) => {
        try {
            const { colors } = req.body;
            const newcolor = new color({ colors });
            const savedcolor = await newcolor.save();
            res.json(savedcolor);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updatecolor: async (req, res) => {
        const { id } = req.params;
        const { colors } = req.body;

        try {
            const updatedcolor = await color.findByIdAndUpdate(
                id,
                { colors },
                { new: true }
            );

            if (!updatedcolor) {
                return res.status(404).json({ error: 'color not found' });
            }

            res.json(updatedcolor);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletecolor: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedcolor = await color.findByIdAndDelete(id);

            if (!deletedcolor) {
                return res.status(404).json({ error: 'color not found' });
            }

            res.json({ message: 'color deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = colorController;
