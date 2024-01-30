const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderdetails: {
    data: {
      orderDetails: { type: Object },
      discount: { type: Number },
      finalAmount: { type: Number },
      deliveryPlatform: { type: String },
      trackingId: { type: String },
      paymentMethod: { type: String },
      timeOfPayment: { type: Date },
      trackingUrl: { type: String },
      userCurrency: { type: String },
    },
  },
  userID: { type: String },
  status: { type: String, default: 'new', enum: ['new', 'inprogress', 'completed'] },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
