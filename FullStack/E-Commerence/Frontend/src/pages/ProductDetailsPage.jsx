// src/pages/ProductDetailsPage.jsx

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { publicRequest } from "../utils/api"; // Use publicRequest

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get product ID from URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const { addToCart, loading: cartLoading } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Endpoint: GET /api/products/:id
        const res = await publicRequest.get(`products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product detail:", err);
        setError("Product not found or failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setStatusMessage({
        type: "error",
        text: "Please log in to add items to your cart.",
      });
      return;
    }
    setStatusMessage({ type: "info", text: "Adding to cart..." });

    const success = await addToCart(product._id, quantity);

    if (success) {
      setStatusMessage({
        type: "success",
        text: `${quantity} ${product.name}(s) added successfully!`,
      });
      setTimeout(() => setStatusMessage(""), 3000);
    } else {
      setStatusMessage({
        type: "error",
        text: "Failed to add item. Check console for details.",
      });
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-indigo-600">
        Loading product details...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading product: {error}
      </div>
    );
  if (!product)
    return (
      <div className="text-center py-20 text-gray-600">Product not found.</div>
    );

  const isInStock = product.stockQuantity > 0;
  // Set selected image initially, or from the product data's gallery array
  const selectedImage = product.imageURL;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Message Display */}
        {/* ... (Status message rendering remains the same) ... */}

        <div className="md:flex md:space-x-12">
          {/* === 1. Image Gallery (Left Column) === */}
          <div className="md:w-1/2 space-y-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-200"
            />
            {/* Thumbnail gallery mapping over a product.gallery array (if available) */}
            {/* <div className="flex space-x-3 overflow-x-auto"> ... </div> */}
          </div>

          {/* === 2. Details and Controls (Right Column) === */}
          <div className="md:w-1/2 mt-10 md:mt-0 space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {product.name}
              </h1>
              {/* ... (Rating display) ... */}
            </div>

            {/* Price and Stock */}
            <div className="flex items-baseline space-x-4 border-b border-gray-200 pb-4">
              <p className="text-5xl font-extrabold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <p
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {isInStock
                  ? `In Stock (${product.stockQuantity})`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector and Button */}
            <div className="flex space-x-4 pt-4">
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(
                        product.stockQuantity,
                        parseInt(e.target.value) || 1
                      )
                    )
                  )
                }
                className="w-20 p-2 border border-gray-300 rounded-lg text-center focus:border-indigo-500 focus:ring-indigo-500"
                disabled={!isInStock}
              />

              <button
                onClick={handleAddToCart}
                disabled={!isInStock || cartLoading || !user}
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300
                                    ${
                                      !isInStock || !user
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                    }
                                    ${cartLoading && "opacity-70 cursor-wait"}`}
              >
                {cartLoading ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
