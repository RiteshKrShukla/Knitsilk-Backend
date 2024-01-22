const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authenticate } = require('../middleware/authenticate');
const { GoogleUsermodel } = require('../models/google.user.model ');

// Get all messages for all users
router.get('/getallusers',async (req, res) => {
    try {
        const messages = await Message.find();
        res.send({messages});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all messages
router.get('/', authenticate,async (req, res) => {
    let userID=req.userID;
    console.log(userID);
    reciever="Admin"
    sender=userID;
    try {
        const messages = await Message.find(
            {
                $or: [
                    { sender: sender, reciever: reciever },
                    { sender: reciever, reciever: sender }
                ]
            }
        );
        res.send({messages});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all messages (admin)
router.get('/admin',async (req, res) => {
let sender="Admin";
// will get the user id from frontend by passing in body
let {reciever}=req.query;
    try {
        const messages = await Message.find({
            $or: [
                { sender: sender, reciever: reciever },
                { sender: reciever, reciever: sender }
            ]
        });
        res.send({messages});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new message
router.post('/admin', async (req, res) => {
    let id=req.query;
    console.log(id);
    // here id is{reciever:"user id as in db"}
    // here sender is userToken
    let{sender ,message} = req.body;
// console.log(sender,reciever,message);
    const messagebody = new Message({
        message,
        sender,
        reciever:id.reciever
    });

    try {
        const newMessage = await messagebody.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create a new message
router.post('/',authenticate, async (req, res) => {
    // here sender is userToken
    let{sender ,reciever,message} = req.body;
    let userID=req.userID;
    console.log(req.userID,sender ,reciever,message)
    const messagebody = new Message({
        message: req.body.message,
        sender: userID,
        reciever: req.body.reciever
    });

    try {
        const newMessage = await messagebody.save();
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
