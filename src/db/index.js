import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';

dotenv.config(
    {
        path: './src/config/.env'
    }
);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error){
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}