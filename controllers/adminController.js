const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const getDashboard = async (req,res)=>{

 const products = await Product.countDocuments();
 const users = await User.countDocuments();
 const orders = await Order.countDocuments();

 res.json({
   totalProducts: products,
   totalUsers: users,
   totalOrders: orders
 });

};

module.exports = { getDashboard };