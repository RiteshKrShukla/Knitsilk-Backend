// models/Product.js
const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  linkedphoto: [{ type: String }],
});


const lengthVariationSchema = new mongoose.Schema({
  length: { type: String, },
  value: { type: String, },
  price: { type: Number, },
  quantity: { type: Number, },
});

const qtyVariationSchema = new mongoose.Schema({
  quantityType: { type: String, },
  price: { type: Number, },
  quantity: { type: Number, },
});

const colorVariationSchema = new mongoose.Schema({
  color: { type: String, },
  price: { type: Number, },
  quantity: { type: Number, },
  linkedphoto: { type: String },
});

const discountSchema = new mongoose.Schema({
  percent: { type: Number },
})

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number },
  priceINR: { type: Number, },
  priceUSD: { type: Number, },
  priceGBP: { type: Number, },
  priceEUR: { type: Number, },
  priceCAD: { type: Number, },
  priceAUD: { type: Number, },
  priceJPY: { type: Number, },
  color: { type: String },
  primaryColor: { type: String },
  secondaryColor: { type: String },
  craftType: [{ type: String }],
  bulletPoints: [{ type: String }],
  yarnWeight: { type: String },
  listingStatus: { type: String, enum: ['Active', 'Sold out', 'Inactive', 'Expired'], default: 'Active' },
  qtyInStock: { type: Number },
  photos: [{ type: String }],
  category: { type: String, },
  shopSection: { type: String },
  video: { type: String, },
  subCategory: { type: String, },
  tags: [{ type: String }],
  materials: [{ type: String }],
  material: { type: String },
  secondaryMaterial: { type: String },
  deliveryOption: { type: String },
  itemWeight: { type: String },
  itemSize: { type: String },
  manufacturer: { type: String },
  productDimensions: { type: String },
  technicalDetails: { type: String },
  primaryMaterial: { type: String },
  makeContent: { type: String },
  care: { type: String },
  yardage: { type: Number },
  needleSize: { type: String },
  hookSize: { type: String },
  dateAdded: { type: Date, default: Date.now },
  length: { type: Number },
  width: { type: Number },
  units: { type: Number },
  variations: [variationSchema],
  HSNCode: { type: String },
  wrapsPerInch: { type: String },
  yarnCounts: { type: String },
  meterPer100g: { type: String },
  otherNames: { type: String },
  widthUnit: { type: String },
  lengthUnit: { type: String },
  packageWeight: { type: String },
  packageDimensions: { type: String },
  personalization: { type: Boolean, default: false },
  handPaintedOrDyed: { type: Boolean, default: false },
  pleatedOrRuffled: { type: Boolean, default: false },
  wired: { type: Boolean, default: false },
  cutToSize: { type: Boolean, default: false },
  productLength: { type: String },
  productWidth: { type: String },
  productHeight: { type: String },
  packageLength: { type: String },
  packageWidth: { type: String },
  packageHeight: { type: String },
  lengthVariations: [lengthVariationSchema],
  qtyVariations: [qtyVariationSchema],
  colorVariations: [colorVariationSchema],
  sku: { type: String },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
