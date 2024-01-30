const mongoose = require('mongoose');

const adminstatus = new mongoose.Schema({
    isOnline: { type: Boolean},
});

const adminStatus = mongoose.model('adminstatus', adminstatus);

module.exports = adminStatus;