const Product = require("../models/Product");


// ===============================
// GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
  try {

    const products = await Product.find().sort({
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
      price,
      mrp,
      image,
      category,
      description,
      stock,
      rating,
      benefits
    } = req.body;


    // Validation
    if (!name || !price || !mrp || !image) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }


    // Sold Out Check
    let soldOut = false;

    if (!stock || stock <= 0) {
      soldOut = true;
    }


    const product = await Product.create({

      name: name.trim(),

      price: Number(price),

      mrp: Number(mrp),

      image,

      category: category || "General",

      description: description || "",

      stock: stock || 0,

      rating: rating || 5,

      benefits: benefits || [],

      soldOut

    });


    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product
    });

  } catch (error) {

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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }


    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );


    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct
    });

  } catch (error) {

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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }


    await Product.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// EXPORT
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};