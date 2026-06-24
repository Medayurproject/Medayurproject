const express = require("express");
const router = express.Router();

const protectUser =
require("../middleware/userAuth");

const {
 createOrder,
 getMyOrders
} = require("../controllers/orderController");


// CREATE ORDER
router.post(
 "/create",
 protectUser,
 createOrder
);


// GET MY ORDERS
router.get(
 "/my-orders",
 protectUser,
 getMyOrders
);


module.exports = router;