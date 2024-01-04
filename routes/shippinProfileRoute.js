// routes/shippingProfile.js
const express = require('express');
const router = express.Router();
const ShippingProfile = require('../models/shippingProfile');

// Create a new shipping profile
router.post('/shipping-profiles', async (req, res) => {
    try {
        const shippingProfile = new ShippingProfile(req.body);
        await shippingProfile.save();
        res.status(201).send(shippingProfile);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all shipping profiles
router.get('/shipping-profiles', async (req, res) => {
    try {
        const shippingProfiles = await ShippingProfile.find();
        res.send(shippingProfiles);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get a specific shipping profile by ID
router.get('/shipping-profiles/:id', async (req, res) => {
    try {
        const shippingProfile = await ShippingProfile.findById(req.params.id);
        if (!shippingProfile) {
            return res.status(404).send();
        }
        res.send(shippingProfile);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a shipping profile by ID (using PUT)
router.put('/shipping-profiles/:id', async (req, res) => {
    try {
        const shippingProfile = await ShippingProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!shippingProfile) {
            return res.status(404).send();
        }
        res.send(shippingProfile);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Update a shipping profile by ID
router.patch('/shipping-profiles/:id', async (req, res) => {
    try {
        const shippingProfile = await ShippingProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!shippingProfile) {
            return res.status(404).send();
        }
        res.send(shippingProfile);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Delete a shipping profile by ID
router.delete('/shipping-profiles/:id', async (req, res) => {
    try {
        const shippingProfile = await ShippingProfile.findByIdAndDelete(req.params.id);
        if (!shippingProfile) {
            return res.status(404).send();
        }
        res.send(shippingProfile);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Bulk delete shipping profiles by IDs
router.post('/shipping-profiles/delete-multiple', async (req, res) => {
    try {
        const { ids } = req.body;

        // Validate that 'ids' is an array of valid MongoDB ObjectIDs
        if (!Array.isArray(ids) || !ids.every((id) => /^[0-9a-fA-F]{24}$/.test(id))) {
            return res.status(400).send({ error: 'Invalid IDs provided for deletion.' });
        }

        // Convert IDs to MongoDB ObjectIDs
        const objectIds = ids.map((id) => mongoose.Types.ObjectId(id));

        // Delete shipping profiles
        const deletedProfiles = await ShippingProfile.deleteMany({ _id: { $in: objectIds } });

        if (deletedProfiles.deletedCount === 0) {
            return res.status(404).send({ error: 'No matching shipping profiles found for deletion.' });
        }

        res.send({ message: 'Shipping profiles successfully deleted.', deletedProfiles });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
