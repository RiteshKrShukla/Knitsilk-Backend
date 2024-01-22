const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const Customer = require('../models/address.model');


const router = express.Router();

// Add a new address to the user's profile
router.post('/user/address', authenticate, async (req, res) => {
    try {
        const { userID } = req;
        const {
            shipping,
            billing,
            is_billing_same_as_shipping,
        } = req.body;

        // Create a new customer
        const newCustomer = new Customer({
            shipping,
            billing,
            isBillingSameAsShipping: is_billing_same_as_shipping,
            userID
        });

        // Save the new customer
        const savedCustomer = await newCustomer.save();

        if (!savedCustomer) {
            // If saving fails for some reason
            return res.status(500).send({ error: 'Failed to save customer data.' });
        }

        return res.status(201).send({ msg: 'Address added successfully.', customer: savedCustomer });
    } catch (error) {
        console.error('Error adding Address:', error);
        return res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});

// Get addresses for a user
router.get('/user/address', authenticate, async (req, res) => {
    try {
        const { userID } = req;
        // Assuming you have a Customer model
        const user = await Customer.find({ userID });

        if (!user) {
            return res.status(404).send({ msg: 'User not found.' });
        }

        // Return the user's addresses
        return res.status(200).send({ addresses: user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: 'Error getting addresses.' });
    }
});

// Edit an address
router.put('/user/address/:id', authenticate, async (req, res) => {
    try {
        const { userID } = req;
        const { id } = req.params;
        const {
            shipping,
            billing,
            is_billing_same_as_shipping,
        } = req.body;

        const updatedCustomer = await Customer.findOneAndUpdate(
            { _id: id, userID },
            {
                shipping,
                billing,
                isBillingSameAsShipping: is_billing_same_as_shipping,
            },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).send({ msg: 'Address not found or user not authorized.' });
        }

        return res.status(200).send({ msg: 'Address updated successfully.', customer: updatedCustomer });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: 'Error updating address.' });
    }
});

// Delete an address
router.delete('/user/address/:id', authenticate, async (req, res) => {
    try {
        const { userID } = req;
        const { id } = req.params;

        const deletedCustomer = await Customer.findOneAndDelete({ _id: id, userID });

        if (!deletedCustomer) {
            return res.status(404).send({ msg: 'Address not found or user not authorized.' });
        }
        return res.status(200).send({ msg: 'Address deleted successfully.', customer: deletedCustomer });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: 'Error deleting address.' });
    }
});


module.exports = router;
