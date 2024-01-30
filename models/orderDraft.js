const mongoose = require('mongoose');

const orderDraftSchema = new mongoose.Schema({
  orderdetails: {
    type: Object,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  userCurrency:{
    type: String,
  }
});

module.exports = mongoose.model('OrderDraft', orderDraftSchema);