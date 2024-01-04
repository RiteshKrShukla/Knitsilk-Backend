const mongoose = require('mongoose');

const shippingProfileSchema = new mongoose.Schema({
  shippingProfileName: String,
  countryOfOrigin: String,
  PINcode: String,
  processingTime: String,
  data: {
    type: Object,
    required: true,
  },
});

const ShippingProfile = mongoose.model('ShippingProfile', shippingProfileSchema);

module.exports = ShippingProfile;
