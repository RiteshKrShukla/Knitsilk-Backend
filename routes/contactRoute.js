// routes/contactRoute.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Routes for retrieving contacts
router.get('/contact', contactController.getAllContacts);
router.get('/contact/:contactId', contactController.getContactById);

// Route for handling contact form submission
router.post('/contact', contactController.submitForm);

// Route for updating a contact
router.put('/contact/:contactId', contactController.updateContact);

// Route for deleting a contact
router.delete('/contact/:contactId', contactController.deleteContact);

// Route for deleting multiple contacts
router.post('/contacts/delete', contactController.deleteMultipleContacts);

// New route for updating status
router.patch('/contact/:contactId/status', contactController.updateStatus);

module.exports = router;
