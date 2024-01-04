// routes.js
const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { Usermodel } = require('../models/user.model');
const { GoogleUsermodel } = require('../models/google.user.model ');
const { Addressmodel } = require('../models/address.model');

const router = express.Router();


// Add a new address to the user's profile
router.post('/user/address', authenticate, async (req, res) => {
    try {
        const { customerName, email, phone, street, city, state, zipCode, country } = req.body;

        // Find regular user by ID
        let user = await Usermodel.findOne({ _id: req.userID });

        if (user) {
            await Addressmodel.create({
                customerName,
                email,
                phone,
                street,
                city,
                state,
                zipCode,
                country,
                userID: req.userID,
            });
            return res.send({ message: 'Address added successfully.' });
        } else {
            // Check if the user is a Google login user
            let googleUser = await GoogleUsermodel.findOne({ _id: req.userID });

            if (googleUser) {
                await Addressmodel.create({
                    customerName,
                    email,
                    phone,
                    street,
                    city,
                    state,
                    zipCode,
                    country,
                    userID: req.userID,
                });
                return res.send({ message: 'Address added successfully.' });
            } else {
                return res.status(401).send({ msg: 'Wrong token inserted!' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: 'Error adding Address.' });
    }
});

// Get addresses for a user
router.get('/user/address', authenticate, async (req, res) => {
    try {
        const userID = req.userID;

        // Find addresses for the user
        const addresses = await Addressmodel.find({ userID });

        return res.send({ addresses });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: 'Error getting addresses.' });
    }
});

module.exports = router;
