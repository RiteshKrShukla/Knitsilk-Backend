const Contact = require('../models/contactModel');
const axios = require('axios');

exports.submitForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Save form data to MongoDB
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();

        // Send confirmation email using Brevo API
        const brevoApiKey = process.env.BREVO;

        const brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';

        const brevoPayload = {
            sender: {
                name: 'Knitsilk',
                email: 'noreply@knitsilk.com',
            },
            to: [
                {
                    email: email,
                    name: name,
                }
            ],
            subject: '🌟 Welcome to Knitsilk! Your Inquiry Received 🌟',
            htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Knitsilk</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .logo-container {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            max-width: 200px;
            height: auto;
        }

        .header {
            color: #6FA82F;
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            text-align: justify;
        }

        .footer {
            background-color: #6FA82F;
            color: "white";
            padding: 10px;
            text-align: center;
            border-radius: 0 0 5px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <img class="logo" src="https://knitsilk.netlify.app/static/media/knitsilk%20black%20logo.42e4be1aa040e6f98e51.png" alt="Knitsilk Logo">
        </div>
        <h2 class="header">🌟 Thank You for Contacting Knitsilk! 🌟</h2>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us at Knitsilk. We're thrilled to hear from you!</p>
            <p>Your message has been received, and our team is working diligently to provide you with the best possible assistance. We understand that your time is valuable, and we appreciate your interest in Knitsilk.</p>
            <p>While we process your inquiry, feel free to explore more about Knitsilk on our website. From our latest collections to exclusive offers, there's always something exciting happening at Knitsilk.</p>
            <p>If you have any urgent concerns, please don't hesitate to contact us directly at <a href="mailto:enquiry@knitsilk.com">enquiry@knitsilk.com</a>.</p>
            <p>Thank you again for choosing Knitsilk. We look forward to serving you!</p>
        </div>
        <div class="footer">
            <p>Best Regards,<br>The Knitsilk Team</p>
            <a href="https://www.knitsilk.com/">https://www.knitsilk.com/</a>
        </div>
    </div>
</body>
</html>`,

        };

        const brevoHeaders = {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
        };

        await axios.post(brevoApiUrl, brevoPayload, { headers: brevoHeaders });

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get contact by ID
exports.getContactById = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update existing contact
exports.updateContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        const { name, email, phone, subject, message } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { name, email, phone, subject, message },
            { new: true }
        );

        res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;

        await Contact.findByIdAndDelete(contactId);

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete multiple contacts
exports.deleteMultipleContacts = async (req, res) => {
    try {
        const { contactIds } = req.body;

        await Contact.deleteMany({ _id: { $in: contactIds } });

        res.status(200).json({ message: 'Contacts deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update status to true
exports.updateStatus = async (req, res) => {
    try {
        const { contactId } = req.params;

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { status: true },
            { new: true }
        );

        res.status(200).json({ message: 'Status updated successfully', contact: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


