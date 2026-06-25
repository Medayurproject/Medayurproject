const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Models
const Product = require("./models/Product");

const app = express();


// ===============================
// CONNECT DATABASE
// ===============================
connectDB();


// ===============================
// GLOBAL MIDDLEWARES
// (Always before routes)
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
// STATIC FILES (Images)
// Example:
// https://medayurproject.onrender.com/images/products/p1.jpg
// ===============================
app.use("/images", express.static(path.join(__dirname, "images")));


// ===============================
// API ROUTES
// ===============================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);


// ===============================
// HOME ROUTE
// ===============================
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



// ===============================
// TEMP TEST ROUTE (Add Product)
// Open:
// https://medayurproject.onrender.com/test-add
// ===============================
app.get("/test-add", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Ashwagandha Capsules",
      price: 299,
      mrp: 399,
      image: "/images/products/p1.jpg",
      category: "Immunity",
      description: "Natural Ayurvedic Product",
      stock: 50
    });

    res.json({
      success: true,
      message: "Product Added Successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});



// ===============================
// 404 ROUTE
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});



// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});