const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    units: { type: String },
});

const unit = mongoose.model('unit', unitSchema);

module.exports = unit;
