const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  shipping: {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  billing: {
    customerName: { type: String },
    email: { type: String },
    phone: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  isBillingSameAsShipping: { type: Boolean },
  userID: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
