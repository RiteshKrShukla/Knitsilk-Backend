// routes/subscribe.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const Subscriber = require('../models/Subscriber');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

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

        // Send confirmation email with attractive HTML template
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Subscription Confirmation - Knitsilk Newsletter',
            html: `
                <div style="text-align: center; background-color: #6FA82F; color: white; padding: 20px;">
                    <img src="https://knitsilk.netlify.app/static/media/Knitsilk%20logo.3188ad111cd972e3b365.png" alt="Knitsilk Logo" style="max-width: 200px; height: auto;">
                    <h1>Welcome to Knitsilk Newsletter!</h1>
                    <p>Thank you for subscribing to our newsletter. You are now part of the Knitsilk community, where we share the latest updates, promotions, and more!</p>
                    <p style="font-size: 16px;">Stay tuned for exciting content from Knitsilk.</p>
                </div>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending confirmation email');
            } else {
                console.log('Email sent:', info.response);
                res.status(201).send('Subscription successful!');
            }
        });
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
