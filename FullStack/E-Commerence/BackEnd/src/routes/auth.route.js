import express, { Router } from "express";
import User from '../models/user.model.js' // Assuming path to your User schema
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router()

const generateToken = (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" } // Token expires in 3 days
    );
};

// --- ROUTE 1: REGISTER USER ---
// Method: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // 1. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 2. Create the new user object
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Store the HASHED password
        });

        // 3. Save to database
        const savedUser = await newUser.save();
        
        // 4. Return success response (excluding password)
        res
        .status(201)
        .json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin,
        })
        .statusMessage(
            "User Register SuccessFully!"
        );
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
        
    }
});


// --- ROUTE 2: LOGIN USER ---
// Method: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        // 1. Find the user by username or email
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("Invalid credentials!.. USER already Access!"); // 401: Unauthorized
        }

        // 2. Compare the password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json("Invalid credentials!: User Password is Wrong!");
        }

        // 3. Generate and send the JWT Token
        const token = generateToken(user);

        const { password, ...others } = user._doc;
        // console.log(`User Login SuccessFully: ${data}`);
        
        res.
        status(200)
        .json({ ...others, token })
        .statusMessage("USER Login SuccessFully!");
        
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
        
    }
});


export default router;