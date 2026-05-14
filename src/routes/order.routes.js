import { Router } from 'express';
import Order from '../models/order.model.js';      
import Cart from  '../models/cart.model.js';       
import Product from '../models/product.model.js';  
import {   verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../middleware/verifyToken.middleware.js';

const router = Router();




router.get("/admin", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {

    console.error("ADMIN GET ALL ORDERS CRASH:", err);

    res
      .status(500)
      .json({
        message: "An internal server error occurred while retrieving orders.",
      });
  }
});



router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      { $set: { status: req.body.status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json("Order not found.");
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});




router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json("Cannot place order: Cart is empty.");
    }

    let totalAmount = 0;
    const orderItems = [];


    for (const cartItem of cart.products) {
      const product = cartItem.productId;


      if (product.stockQuantity < cartItem.quantity) {
        return res
          .status(400)
          .json(
            `Not enough stock for ${product.name}. Available: ${product.stockQuantity}`
          );
      }


      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: cartItem.quantity,
        priceAtPurchase: product.price, // SNAPSHOT of price
      });

      totalAmount += product.price * cartItem.quantity;


      await Product.findByIdAndUpdate(product._id, {
        $inc: { stockQuantity: -cartItem.quantity },
      });
    }


    const newOrder = new Order({
      userId,
      items: orderItems,
      totalPrice: totalAmount, 
      shippingAddress: req.body.shippingAddress,
      paymentDetails: req.body.paymentDetails || { method: "Simulated" },
      status: "Processing",
    });

    const savedOrder = await newOrder.save();


    await Cart.findOneAndDelete({ userId });

    res.status(201).json(savedOrder).statusMessage("Order Success!");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/:id", verifyToken, async (req, res) => {

  try {
    const order = await Order.findById(req.params.id).populate({
      path: "items.productId",
      select: "imageURL name",
    });

    if (!order) {
      return res.status(404).json("Order not found.");
    }


    if (order.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json("You are not authorized to view this order.");
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;