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
        price: req.body.price,
        mrp: req.body.price,
        image: "/images/products/" + req.file.filename,
        category: "General",
        stock: 10,
        rating: 5

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