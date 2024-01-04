const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categories: { type: String },
});

const category = mongoose.model('category',categorySchema );

module.exports = category;
