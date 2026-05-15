import express, { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      })
      .statusMessage("User Register SuccessFully!");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(401)
        .json("Invalid credentials!.. USER already Access!"); // 401: Unauthorized
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json("Invalid credentials!: User Password is Wrong!");
    }

    const token = generateToken(user);

    const { password, ...others } = user._doc;

    res
      .status(200)
      .json({ ...others, token })
      .statusMessage("USER Login SuccessFully!");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


export default router;