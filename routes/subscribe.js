// routes/subscribe.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const Subscriber = require('../models/Subscriber');

// POST route for subscription
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email already exists in the database
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            // Email already subscribed
            return res.status(200).send('Email already subscribed!');
        }


        // Save the subscriber to the database
        const subscriber = new Subscriber({ email });
        await subscriber.save();

        const brevoApiKey = process.env.BREVO;
        const brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';


        // Send confirmation email with attractive HTML template
        const brevoPayload = {
            sender: {
                name: 'KnitSilk',
                email: 'webadmin@knitsilk.com',
            },
            to: [
                {
                    email: email,
                }
            ],
            subject: 'Subscription Confirmation - Knitsilk Newsletter',
            htmlContent: `
                <div style="text-align: center; background-color: #6FA82F; color: white; padding: 20px;">
                    <img src="https://knitsilk.netlify.app/static/media/Knitsilk%20logo.3188ad111cd972e3b365.png" alt="Knitsilk Logo" style="max-width: 200px; height: auto;">
                    <h1>Welcome to Knitsilk Newsletter!</h1>
                    <p>Thank you for subscribing to our newsletter. You are now part of the Knitsilk community, where we share the latest updates, promotions, and more!</p>
                    <p style="font-size: 16px;">Stay tuned for exciting content from Knitsilk.</p>
                </div>
            `,
        };

        const brevoHeaders = {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
        };

        await axios.post(brevoApiUrl, brevoPayload, { headers: brevoHeaders });

        res.status(201).send('Subscription successful!');
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET route to retrieve all subscribers
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
