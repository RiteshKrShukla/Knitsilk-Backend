// routes/promoCodeRoutes.js
const express = require('express');
const router = express.Router();
const PromoCode = require('../models/PromoCode');

// Get all promo codes
router.get('/', async (req, res) => {
    try {
        const promoCodes = await PromoCode.find();
        res.json(promoCodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new promo code
router.post('/create', async (req, res) => {
    try {
        const promoCode = await PromoCode.create(req.body);
        res.status(201).json(promoCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a promo code by code
router.put('/update/:code', async (req, res) => {
    try {
        const promoCode = await PromoCode.findOneAndUpdate(
            { code: req.params.code },
            req.body,
            { new: true }
        );
        res.json(promoCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a promo code by code
router.delete('/delete/:code', async (req, res) => {
    try {
        const promoCode = await PromoCode.findOneAndDelete({
            code: req.params.code,
        });
        res.json(promoCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
