import express, { Router} from 'express';
import Cart from '../models/cart.model.js';
import { verifyToken, verifyTokenAndAuthorization } from '../middleware/verifyToken.middleware.js';

const router = Router();


router.post("/", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  console.log("User ID from Token:", userId);
  console.log("Product ID from Body:", productId);

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      cart = await cart.save();
      res.status(200).json(cart);
    } else {

      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      const savedCart = await newCart.save();
      res.status(201).json(savedCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json("Cart not found!");

    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.products[itemIndex].quantity = quantity;
      } else {
        cart.products.splice(itemIndex, 1);
      }
    } else {
      return res.status(404).json("Product not found in cart!");
    }

    cart = await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Use .populate('products.productId') to retrieve product details from the Product model
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId"
    );
    if (!cart) {

      return res.status(200).json({
        userId: req.params.userId,
        products: [],
      });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err).statusMessage("");
  }
});


router.delete('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.status(200).json("Cart has been deleted/cleared successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;