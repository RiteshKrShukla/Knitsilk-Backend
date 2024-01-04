const unit = require('../models/unitsModel');

const unitController = {
    getAllunits: async (req, res) => {
        try {
            const units = await unit.find();
            res.json(units);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createunit: async (req, res) => {
        try {
            const { units } = req.body;
            const newunit = new unit({ units });
            const savedunit = await newunit.save();
            res.json(savedunit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateunit: async (req, res) => {
        const { id } = req.params;
        const { units } = req.body;

        try {
            const updatedunit = await unit.findByIdAndUpdate(
                id,
                { units },
                { new: true }
            );

            if (!updatedunit) {
                return res.status(404).json({ error: 'unit not found' });
            }

            res.json(updatedunit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteunit: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedunit = await unit.findByIdAndDelete(id);

            if (!deletedunit) {
                return res.status(404).json({ error: 'unit not found' });
            }

            res.json({ message: 'unit deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = unitController;
