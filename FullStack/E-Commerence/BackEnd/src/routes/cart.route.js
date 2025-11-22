// routes/cart.js

import express, { Router} from 'express';
import Cart from '../models/cart.model'; // path to your Cart schema
import { verifyToken, verifyTokenAndAuthorization } from '../middleware/verifyToken.middleware.js';

const router = Router();

// ROUTE 1: Create or add
// Method: POST /api/carts/
router.post('/', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {

            const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            cart = await cart.save();
            res
            .status(200)
            .json(cart)
            .statusMessage("New Product Add in Cart!");

        } else {
            // No cart exists: Create a new cart
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
            const savedCart = await newCart.save();
            res
            .status(201)
            .json(savedCart)
            .statusMessage("New Cart created SuccessFully!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// ROUTE 2: Update Cart Item Quantity or remove quantity is 0
// Method: PUT /api/carts/:userId
router.put('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json("Cart not found!");

        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

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
        res
        .status(200)
        .json(cart)
        .statusMessage("Update Cart Product!");

    } catch (err) {
        res.status(500).json(err);
    }
});

// --- ROUTE 3: Get User Cart ---
// Method: GET /api/carts/find/:userId
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Use .populate('products.productId') to retrieve product details from the Product model
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart) {
            // Return an empty cart object if none is found
            return res.status(200)
                    .json({ 
                        userId: req.params.userId, products: [] 
                    })
                    .statusMessage("User cart is Empty!");
        }
        res.status(200)
            .json(cart)
            .statusMessage("this is User cart!");
    } catch (err) {
        res.status(500).json(err).statusMessage("");
    }
});

// --- ROUTE 4: Delete Cart Item/Clear Cart ---
router.delete('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.status(200).json("Cart has been deleted/cleared successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;