const Product = require("../models/Product");


// ===============================
// GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
  try {

    const products = await Product.find({ isActive: true }).sort({
      featured: -1,
      createdAt: -1
    });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {

  try {

    const {
      name,
      slug,
      category,
      brand,
      image,
      gallery,
      price,
      oldPrice,
      mrp,
      description,
      ingredients,
      benefits,
      usage,
      information,
      dosage,
      sideEffects,
      weight,
      quantity,
      stock,
      rating,
      reviews,
      featured,
      bestSeller,
      newArrival
    } = req.body;


    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, Price and Image are required."
      });
    }

    const product = await Product.create({

      name: name.trim(),

      slug,

      category: category || "Ayurvedic",

      brand: brand || "MEDAYUR",

      image,

      gallery: gallery || [],

      price: Number(price),

      oldPrice: Number(oldPrice || 0),

      mrp: Number(mrp || oldPrice || price),

      description: description || "",

      ingredients: ingredients || [],

      benefits: benefits || [],

      usage: usage || "",

      information: information || "",

      dosage: dosage || "",

      sideEffects: sideEffects || "",

      weight: weight || "",

      quantity: quantity || "",

      stock: Number(stock || 0),

      soldOut: Number(stock || 0) <= 0,

      rating: Number(rating || 5),

      reviews: Number(reviews || 0),

      featured: featured || false,

      bestSeller: bestSeller || false,

      newArrival: newArrival || false,

      isActive: true

    });


    res.status(201).json({

      success: true,

      message: "Product Created Successfully",

      product

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ===============================
// UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {

  try {

    if (req.body.stock !== undefined) {
      req.body.soldOut = Number(req.body.stock) <= 0;
    }

    const product = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true
      }

    );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product Not Found"

      });

    }

    res.status(200).json({

      success: true,

      message: "Product Updated Successfully",

      product

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ===============================
// DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product Not Found"

      });

    }

    res.status(200).json({

      success: true,

      message: "Product Deleted Successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ===============================
module.exports = {

  getProducts,

  createProduct,

  updateProduct,

  deleteProduct

};