// const express = require("express");
// const router = express.Router();
// const Order = require("../models/oderModel"); // Adjust the path as needed
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(
//   "sk_test_51PfxERBoPKUyqPB6Y7qRCJY08P3uU7hG4vBywB6x7T4FRfar7ENN7jiZEmvXClUkA3UMuA46uRMIxRA9Qx3m6r7F00r5pR2BAq"
// ); // Replace with your Stripe secret key

// router.post("/placeOrder", async (req, res) => {
//   const { token, subTotal, cartItems, userDetails } = req.body;
//   console.log("Request Body:", req.body);

//   try {
//     // Create a Stripe charge
//     const charge = await stripe.charges.create({
//       amount: subTotal * 100, // Amount in cents
//       currency: "INR",
//       source: token.id,
//       description: `Order by ${userDetails.email}`,
//     });

//     // Create a new order
//     const newOrder = new Order({
//       name: userDetails.name,
//       email: userDetails.email,
//       userid: userDetails._id,
//       orderItems: cartItems,
//       orderAmount: subTotal,
//       isDeliverd: false,
//       transectionId: charge.id,
//       shippingAddress: userDetails.shippingAddress,
//     });

//     await newOrder.save();

//     res.status(200).json({ message: "Order placed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to place order", error });
//   }
// });

console.log("Order Routes");

// get order
// router.post("/placeOrder", async (req, res) => {
//   const {
//     token,
//     subTotal,
//     cartItems,
//     userDetails,
//     shippingAddress,
//     shippingCity,
//     shippingCountry,
//     shippingZip,
//   } = req.body;

//   try {
//     const newOrder = new Order({
//       name: userDetails.name,
//       email: userDetails.email,
//       userid: userDetails.userid,
//       orderItems: cartItems,
//       shippingAddress: {
//         address: shippingAddress,
//         city: shippingCity,
//         country: shippingCountry,
//         zip: shippingZip,
//       },
//       orderAmount: subTotal,
//       transactionId: token.id,
//     });

//     const savedOrder = await newOrder.save();
//     res
//       .status(200)
//       .json({ message: "Order placed successfully", order: savedOrder });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to place order. Please try again." });
//   }
// });

const express = require("express");
const router = express.Router();
require("dotenv").config();
const Order = require("../models/oderModel"); // Adjust the path as needed
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

router.post("/placeOrder", async (req, res) => {
  const { token, subTotal, cartItems, userDetails, shippingAddress } = req.body;
  console.log("Request Body:", req.body);

  try {
    // Create a Stripe charge
    const charge = await stripe.charges.create({
      amount: subTotal * 100, // Amount in cents
      currency: "INR",
      source: token.id,
      description: `Order by ${userDetails.email}`,
    });

    // Create a new order
    const newOrder = new Order({
      name: userDetails.name,
      email: userDetails.email,
      userid: userDetails._id,
      orderItems: cartItems,
      orderAmount: subTotal,
      isDeliverd: false,
      transectionId: charge.id,
      shippingAddress: shippingAddress,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order", error });
  }
});

router.post("/getuserorder", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await Order.find({ userid }).sort({ _id: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

//getallorders
router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

router.post("/updatedeliverystatus", async (req, res) => {
  const { orderId } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { isDeliverd: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(`Error updating delivery status: ${error}`);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

module.exports = router;
