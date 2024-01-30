const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Otp = require('../models/Otp');

// Nodemailer Configuration (Update with your email provider)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ritesh.digiblocks@gmail.com',
        pass: 'bejhhyhsojeecvra',
    },
});


// Generate and send OTP with an attractive email template
router.post('/generate-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000); 
        const mailOptions = {
            from: 'ritesh.digiblocks@gmail.com',
            to: email,
            subject: 'KnitSilk OTP Verification', // Modify the email subject
            html: `
            <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                h1 {
                  color: #6FA82F;
                }
                h2 {
                  color: #333333;
                }
                img {
                  max-width: 200px;
                  height: auto;
                  margin-bottom: 20px;
                }
                p {
                  color: #555555;
                }
              </style>
            </head>
            <body>
              <div>
                <img src="https://knitsilk.netlify.app/static/media/Knitsilk%20logo.3188ad111cd972e3b365.png" alt="Knitsilk Logo"> 
                <h1>Welcome to Knitsilk</h1>
                <p>Your One-Time Password (OTP) for admin login is:</p>
                <h2>${otp}</h2>
                <p>Please use this OTP to verify your identity.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
              </div>
            </body>
          </html>
        `,
        };

        await transporter.sendMail(mailOptions);

        // Save OTP to the database
        await Otp.create({ email, otp });

        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the OTP document in the database
        const otpDoc = await Otp.findOne({ email, otp });

        if (otpDoc) {
            // OTP is valid, delete the OTP record
            await Otp.deleteOne({ _id: otpDoc._id });
            res.json({ success: true, message: 'OTP is valid' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
});

module.exports = router;