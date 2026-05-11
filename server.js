import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import productRoute from "./src/routes/product.route.js"
import authRoute from "./src/routes/auth.route.js";
import cartRoute from "./src/routes/cart.route.js";
import orderRoute from "./src/routes/order.routes.js";
import contactRoute from "./src/routes/contact.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 50000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ecommerce is Running... ");
});
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders/", orderRoute);
app.use("/api/contact", contactRoute);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');        
    }catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1); // Exit process with failure
    }
}
connectDB()


//RouterAPI


// start server 
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})

