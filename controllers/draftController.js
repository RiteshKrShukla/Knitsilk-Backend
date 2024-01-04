// controllers/draftController.js
const Draft = require('../models/Draft');

module.exports = {
    getAllDrafts: async (req, res) => {
        try {
            const drafts = await Draft.find();
            res.json(drafts);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createDraft: async (req, res) => {
        try {
            const draft = new Draft(req.body);
            await draft.save();
            res.json(draft);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getDraftById: async (req, res) => {
        try {
            const draft = await Draft.findById(req.params.id);
            if (!draft) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(draft);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateDraft: async (req, res) => {
        try {
            const draft = await Draft.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!draft) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(draft);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteDraft: async (req, res) => {
        try {
            const draft = await Draft.findByIdAndDelete(req.params.id);
            if (!draft) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteMultipleDrafts: async (req, res) => {
        try {
            console.log(req.body);
            const { draftIds } = req.body;

            if (!draftIds || !Array.isArray(draftIds) || draftIds.length === 0) {
                return res.status(400).json({ error: 'Invalid or empty productIds array' });
            }

            const deletedDrafts = await Draft.deleteMany({ _id: { $in: draftIds } });

            if (deletedDrafts.deletedCount === 0) {
                return res.status(404).json({ error: 'No products found for the provided productIds' });
            }
            res.json({ message: 'Products deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
