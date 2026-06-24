const Order = require("../models/Order");


// SAVE ORDER
const createOrder = async (req,res)=>{

 try{

   const { items, totalAmount } = req.body;

   const order = await Order.create({

     user: req.user,

     items,
     totalAmount

   });

   res.json(order);

 }

 catch(error){

   res.status(500).json({
     message:error.message
   });
 }

};


// GET MY ORDERS
const getMyOrders = async (req,res)=>{

 try{

   const orders =
   await Order.find({
     user:req.user
   }).sort({ createdAt:-1 });

   res.json(orders);

 }

 catch(error){

   res.status(500).json({
     message:error.message
   });
 }

};


module.exports = {
 createOrder,
 getMyOrders
};