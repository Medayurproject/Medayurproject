const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  slug:{
    type:String
  },

  price:{
    type:Number,
    required:true
  },

  mrp:{
    type:Number,
    required:true
  },

  image:{
    type:String,
    required:true
  },

  category:{
    type:String
  },

  brand:{
    type:String,
    default:"MEDAYUR"
  },

  description:{
    type:String
  },

  benefits:[String],

  stock:{
    type:Number,
    default:0
  },

  rating:{
    type:Number,
    default:5
  },

  soldOut:{
    type:Boolean,
    default:false
  },

  featured:{
    type:Boolean,
    default:false
  }

},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);