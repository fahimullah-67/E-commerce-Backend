import React from 'react';
import { Link } from 'react-router-dom';
// Assumes you install heroicons: npm install @heroicons/react
import { StarIcon } from '@heroicons/react/20/solid'; 

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white group cursor-pointer rounded-lg overflow-hidden transition duration-300 transform hover:shadow-xl hover:-translate-y-1 border border-gray-100">
            <Link to={`/product/${product.id}`}>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                    <Link to={`/product/${product.id}`} className="hover:text-indigo-600 transition duration-150">
                        {product.name}
                    </Link>
                </h3>
                <div className="mt-1 flex items-center justify-between">
                    <p className="text-xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-500">
                            {product.rating} 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;