import { Router } from 'express';
import Order from '../models/order.model.js';      // Order Schema
import Cart from  '../models/cart.model.js';        // Cart Schema
import Product from '../models/product.model.js';  // Product Schema
import {   verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../middleware/verifyToken.middleware.js';

const router = Router();
// ROUTE 1: Create new Order
// Method: POST /api/orders
router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch the user's cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json("Cannot place order: Cart is empty.");
    }

    let totalAmount = 0;
    const orderItems = [];

    // 2. Process cart items and update inventory
    for (const cartItem of cart.products) {
      const product = cartItem.productId;

      // Check stock availability
      if (product.stockQuantity < cartItem.quantity) {
        return res
          .status(400)
          .json(
            `Not enough stock for ${product.name}. Available: ${product.stockQuantity}`
          );
      }

      // Create OrderItem snapshot data
      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: cartItem.quantity,
        priceAtPurchase: product.price, // SNAPSHOT of price
      });

      totalAmount += product.price * cartItem.quantity;

      // Update product stock (decrement)
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stockQuantity: -cartItem.quantity },
      });
    }

    // 3. Create the new Order document
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalPrice: totalAmount, // Calculated Total
      shippingAddress: req.body.shippingAddress,
      paymentDetails: req.body.paymentDetails || { method: "Simulated" },
      status: "Processing",
    });

    const savedOrder = await newOrder.save();

    // 4. Clear the user's cart after successful order creation
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(savedOrder).statusMessage("Order Success!");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ROUTE 2: Get User Orders
// Method: GET /api/orders/find/:userId
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

// ROUTE 3: Get a Single Order
// Method: GET /api/orders/:id
router.get("/:id", verifyToken, async (req, res) => {
  // Using verifyToken here, check ownership inside
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "items.productId",
      select: "imageURL name",
    });

    if (!order) {
      return res.status(404).json("Order not found.");
    }

    // Authorization check: User must be the owner OR an Admin
    if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("You are not authorized to view this order.");
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE 3: Admin ORDER GET
router.get("/admin", verifyTokenAndAdmin, async (req, res) => {
  console.log("Admin access confirmed for user ID:", req.user.id);
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest orders first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- ROUTE 5 (ADMIN): Update Order Status ---
// Method: PUT /api/orders/:id (Protected)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: req.body.status },
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json("Order not found.");
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;