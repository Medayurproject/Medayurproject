const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    sparse: true
  },

  category: {
    type: String,
    default: "Ayurvedic"
  },

  brand: {
    type: String,
    default: "MEDAYUR"
  },

  image: {
    type: String,
    required: true
  },

  gallery: {
    type: [String],
    default: []
  },

  price: {
    type: Number,
    required: true
  },

  oldPrice: {
    type: Number,
    default: 0
  },

  mrp: {
    type: Number,
    default: 0
  },

  description: {
    type: String,
    default: ""
  },

  ingredients: {
    type: [String],
    default: []
  },

  benefits: {
    type: [String],
    default: []
  },

  usage: {
    type: String,
    default: ""
  },

  information: {
    type: String,
    default: ""
  },

  dosage: {
    type: String,
    default: ""
  },

  sideEffects: {
    type: String,
    default: ""
  },

  weight: {
    type: String,
    default: ""
  },

  quantity: {
    type: String,
    default: ""
  },

  stock: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 5
  },

  reviews: {
    type: Number,
    default: 0
  },

  soldOut: {
    type: Boolean,
    default: false
  },

  featured: {
    type: Boolean,
    default: false
  },

  bestSeller: {
    type: Boolean,
    default: false
  },

  newArrival: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);