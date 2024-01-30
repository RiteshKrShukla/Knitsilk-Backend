const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const multer = require('multer');
const path = require('path');


// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });



router.post('/products', upload.single('photo'), async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            userCurrency,
            globalPrice,
            color,
            primaryColor,
            secondaryColor,
            craftType,
            yarnWeight,
            listingStatus,
            qtyInStock,
            category,
            shopSection,
            tags,
            materials,
            deliveryOption,
            itemWeight,
            itemSize,
            manufacturer,
            productDimensions,
            primaryMaterial,
            secondaryMaterial,
            quantityInStock,
            makeContent,
            care,
            yardage,
            needleSize,
            hookSize,
            photos,
            subCategory,
            video,
            priceINR,
            priceUSD,
            priceGBP,
            priceEUR,
            priceCAD,
            priceAUD,
            priceJPY,
            HSNCode,
            personalization,
            handPaintedOrDyed,
            pleatedOrRuffled,
            wired,
            cutToSize,
            length,
            width,
            skeins,
            variations,
            wrapsPerInch,
            yarnCounts,
            meterPer100g,
            otherNames,
            lengthUnit,
            widthUnit,
            packageWeight,
            packageDimensions,
        } = req.body;

        const draft = new Draft({
            title,
            description,
            price,
            globalPrice,
            userCurrency,
            color,
            primaryColor,
            secondaryColor,
            craftType,
            yarnWeight,
            listingStatus,
            qtyInStock,
            category,
            shopSection,
            tags,
            HSNCode,
            materials,
            deliveryOption,
            itemWeight,
            itemSize,
            manufacturer,
            productDimensions,
            primaryMaterial,
            secondaryMaterial,
            quantityInStock,
            makeContent,
            care,
            yardage,
            needleSize,
            hookSize,
            dateAdded: new Date(),
            photos,
            subCategory,
            video,
            priceINR,
            priceUSD,
            priceGBP,
            priceEUR,
            priceCAD,
            priceAUD,
            priceJPY,
            handPaintedOrDyed,
            pleatedOrRuffled,
            wired,
            cutToSize,
            personalization,
            length,
            width,
            skeins,
            variations,
            wrapsPerInch,
            yarnCounts,
            meterPer100g,
            otherNames,
            lengthUnit,
            widthUnit,
            packageWeight,
            packageDimensions,
        });
        await draft.save();
        res.status(201).json(draft);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding product.' });
    }
});


//GET All Drafts
router.get('/products', async (req, res) => {
    try {
        const drafts = await Draft.find();
        console.log('Fetched drafts:', drafts);
        res.json(drafts);
    } catch (error) {
        console.error('Error fetching drafts:', error); // Add this line for debugging
        res.status(500).json({ error: 'Internal Server Error xyz' });
    }
});

// GET endpoint for fetching a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        if (!draft) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(draft);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT endpoint for updating a product by ID
router.put('/products/:id', async (req, res) => {
    try {
        const draft = await Draft.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!draft) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(draft);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE endpoint for deleting a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const draft = await Draft.findByIdAndDelete(req.params.id);
        if (!draft) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST endpoint for deleting multiple products by IDs
router.post('/products/delete-multiple', async (req, res) => {
    try {
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
});




module.exports = router;
