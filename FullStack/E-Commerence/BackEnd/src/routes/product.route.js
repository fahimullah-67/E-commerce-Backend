import express, { Router } from 'express';
import Product from '../models/product.model.js';

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const newProduct = Product(req.body);
    const savedProduct = await newProduct.save();
    console.log("New product Saved!.");

    res.status(200).json(savedProduct);
  } catch (error) {
    res.json(500).json(error);
  }
});

router.get("/getProduct", async (req, res) => {
  try {
    // Simple fetch all. Later, you can add query logic for filtering/sorting:
    // const products = await Product.find(req.query).sort({ createdAt: -1 });
    const products = await Product.find();
    console.log("Get All Product!");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found!");
    }
    console.log(`Get this Product, ID IS " ${product._id} "`);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Return the updated document
    );
    console.log("Product Update SuccessFully");
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;