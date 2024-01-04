const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    subcategories: { type: String },
    category: { type: String },
});

const subcategory = mongoose.model('subcategory',subcategorySchema );

module.exports = subcategory;
