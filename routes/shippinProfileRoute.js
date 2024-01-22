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


router.get('/shipping-profiles/country/:countryName', async (req, res) => {
    try {
        const countryName = req.params.countryName;

        const shippingProfiles = await ShippingProfile.find();

        if (!shippingProfiles || shippingProfiles.length === 0) {
            return res.status(404).send({ error: 'No shipping profiles found' });
        }

        let countryData = null;

        // Iterate over each shipping profile
        for (const shippingProfile of shippingProfiles) {
            for (const continent in shippingProfile.data) {
                if (shippingProfile.data.hasOwnProperty(continent)) {
                    for (const region in shippingProfile.data[continent]) {
                        if (shippingProfile.data[continent].hasOwnProperty(region)) {
                            const countries = shippingProfile.data[continent][region].countries || [];

                            // Check if the specified country is present in the countries array
                            if (countries.some(country => country.toLowerCase() === countryName.toLowerCase())) {
                                countryData = shippingProfile.data[continent][region];
                                break; // Stop iteration once the country is found
                            }
                        }
                    }

                    if (countryData) {
                        break; // Stop further iteration if the country is found
                    }
                }
            }
        }

        if (!countryData) {
            return res.status(404).send({ error: 'Country not found in shipping profiles' });
        }

        const response = {
            countryName,
            shippingFees: countryData.shippingFees || {},
            transitTimesStandard: countryData.transitTimesStandard || '',
            transitTimesExpedited: countryData.transitTimesExpedited || '',
        };

        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
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
