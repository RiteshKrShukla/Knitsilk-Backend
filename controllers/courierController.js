const courier = require('../models/couriersModel');

const courierController = {
    getAllcouriers: async (req, res) => {
        try {
            const couriers = await courier.find();
            res.json(couriers);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createcourier: async (req, res) => {
        try {
            const { couriers } = req.body;
            const newcourier = new courier({ couriers });
            const savedcourier = await newcourier.save();
            res.json(savedcourier);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updatecourier: async (req, res) => {
        const { id } = req.params;
        const { couriers } = req.body;

        try {
            const updatedcourier = await courier.findByIdAndUpdate(
                id,
                { couriers },
                { new: true }
            );

            if (!updatedcourier) {
                return res.status(404).json({ error: 'courier not found' });
            }

            res.json(updatedcourier);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletecourier: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedcourier = await courier.findByIdAndDelete(id);

            if (!deletedcourier) {
                return res.status(404).json({ error: 'courier not found' });
            }

            res.json({ message: 'courier deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = courierController;
