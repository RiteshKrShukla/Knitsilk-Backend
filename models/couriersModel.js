const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    couriers: { type: String },
});

const courier = mongoose.model('courier', courierSchema);

module.exports = courier;
