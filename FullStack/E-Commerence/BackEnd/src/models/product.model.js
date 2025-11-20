import moongoose from 'mongoose';

const productSchema = new moongoose.Schema(
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
      // Quick toggle for front-end to show availability
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = moongoose.model("Product", productSchema);
export default Product;
