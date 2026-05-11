// src/components/ProductCard.jsx (UPDATED)

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart, loading: cartLoading } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState(null);

  const handleAddToCart = async () => {
    if (!user) {
      setFeedback({ type: "error", text: "Please sign in." });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    const success = await addToCart(product._id, 1); // Add one item

    if (success) {
      setFeedback({ type: "success", text: "Added!" });
    } else {
      setFeedback({ type: "error", text: "Failed." });
    }
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-lg overflow-hidden transition duration-300 transform hover:shadow-xl hover:-translate-y-1 border border-gray-100 relative">
      {/* Image Link */}
      <Link to={`/products/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.imageURL}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          <Link
            to={`/products/${product._id}`}
            className="hover:text-indigo-600 transition duration-150"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-xl font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={cartLoading || product.stockQuantity <= 0}
          className={`mt-3 w-full py-2 rounded-lg text-white font-semibold text-sm transition duration-150 flex items-center justify-center
                        ${
                          product.stockQuantity <= 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }
                    `}
        >
          {cartLoading ? (
            "Processing..."
          ) : feedback ? (
            <span
              className={`text-sm ${
                feedback.type === "error" ? "text-red-300" : "text-white"
              }`}
            >
              {feedback.text}
            </span>
          ) : (
            <>
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
