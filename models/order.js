const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderdetails: {
    type: Object,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);