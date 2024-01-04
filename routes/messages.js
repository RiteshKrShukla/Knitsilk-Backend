const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    const message = new Message({
        text: req.body.text,
        sender: req.body.sender,
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit a message
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMessage = await Message.findByIdAndUpdate(id, { text: req.body.text }, { new: true });
        res.json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
