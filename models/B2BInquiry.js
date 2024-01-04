const mongoose = require('mongoose');

const b2bInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
  },
  productName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
});

const B2BInquiry = mongoose.model('B2BInquiry', b2bInquirySchema);

module.exports = B2BInquiry;
