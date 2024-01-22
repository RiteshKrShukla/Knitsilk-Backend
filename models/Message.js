const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);

