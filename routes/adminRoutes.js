const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

const { getDashboard } = require("../controllers/adminController");
const { adminLogin } = require("../controllers/adminAuthController");

const protectAdmin = require("../middleware/adminAuth");
const upload = require("../middleware/uploadMiddleware");


// ADMIN LOGIN
router.post("/login", adminLogin);


// DASHBOARD (Protected)
router.get("/dashboard", protectAdmin, getDashboard);


// ADD PRODUCT (Protected)
router.post(
  "/add-product",
  protectAdmin,
  upload.single("image"),
  async (req, res) => {

    try {

const product = await Product.create({

  name: req.body.name,

  slug: req.body.slug,

  category: req.body.category || "General",

  brand: req.body.brand || "MEDAYUR",

  image: "/images/products/" + req.file.filename,

  gallery: [],

  price: Number(req.body.price),

  oldPrice: Number(req.body.oldPrice || 0),

  mrp: Number(req.body.mrp || req.body.oldPrice || req.body.price),

  description: req.body.description || "",

  ingredients: req.body.ingredients
    ? req.body.ingredients.split(",")
    : [],

  benefits: req.body.benefits
    ? req.body.benefits.split(",")
    : [],

  usage: req.body.usage || "",

  information: req.body.information || "",

  dosage: req.body.dosage || "",

  sideEffects: req.body.sideEffects || "",

  weight: req.body.weight || "",

  quantity: req.body.quantity || "",

  stock: Number(req.body.stock || 0),

  soldOut: Number(req.body.stock || 0) <= 0,

  rating: Number(req.body.rating || 5),

  reviews: Number(req.body.reviews || 0),

  featured: req.body.featured === "true",

  bestSeller: req.body.bestSeller === "true",

  newArrival: req.body.newArrival === "true",

  isActive: true

});

      res.json({
        success:true,
        message:"Product Added Successfully",
        product
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// DELETE PRODUCT (Protected)
router.delete(
  "/delete-product/:id",
  protectAdmin,
  async (req, res) => {

    try {

      await Product.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Product Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


module.exports = router;