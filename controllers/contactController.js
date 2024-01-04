// controllers/contactController.js
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

exports.submitForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Save form data to MongoDB
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();

        // Send confirmation email using Node Mailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmation Email',
            text: 'Thank you for contacting us. We will get back to you soon.',
        };

        await transporter.sendMail(mailOptions);

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


