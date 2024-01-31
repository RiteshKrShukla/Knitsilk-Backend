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
  }
});

const B2BInquiry = mongoose.model('B2BInquiry', b2bInquirySchema);

module.exports = B2BInquiry;
