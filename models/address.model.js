// address.model.js
const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    userID:{
        type:String
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
