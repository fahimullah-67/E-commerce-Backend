import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;



// product post testing 
// http://localhost:7000/api/
// {
//     "name": "Mobile Vivo",
//     "price":"23432",
//     "description": "Vivo Mobile new  models",
//     "category": "Mobile",
//     "isAvailable": "1",
//     "stockQuantity":"4"
// }
