// models/contactModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
paymentInfo:{
    type:String,
},
userID:{
    type:String
}
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
