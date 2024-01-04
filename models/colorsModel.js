const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    colors: { type: String },
});

const color = mongoose.model('color', colorSchema);

module.exports = color;
