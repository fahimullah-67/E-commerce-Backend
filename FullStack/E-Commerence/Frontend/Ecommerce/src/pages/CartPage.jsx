// src/pages/CartPage.jsx

import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const CartPage = () => {
    const { cart, loading, itemCount, updateCartQuantity, fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Ensure the cart is loaded when the component mounts
    useEffect(() => {
        if (user && !cart && !loading) {
            fetchCart();
        }
    }, [user, cart, loading]);

    // Calculate total amount dynamically whenever the cart changes
    const cartTotal = useMemo(() => {
        if (!cart) return 0;
        return cart.reduce((total, item) => {
            // Use the price from the populated product details
            const price = item.productId?.price || 0; 
            return total + (price * item.quantity);
        }, 0);
    }, [cart]);

    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        // If quantity is 0 or less, we handle removal in the updateCartQuantity logic
        updateCartQuantity(productId, quantity);
    };

    const handleRemoveItem = (productId) => {
        // Set quantity to 0 to trigger removal logic in the context
        updateCartQuantity(productId, 0); 
    };

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-800">Please sign in to view your cart.</h2>
                <Link to="/login" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Go to Login</Link>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center py-20">Loading Cart...</div>;
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" /> Continue Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    // --- Main Cart View ---
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})</h1>
                
                <div className="md:grid md:grid-cols-3 md:gap-10">
                    
                    {/* === 1. Cart Items List (2/3 width) === */}
                    <div className="md:col-span-2 space-y-6">
                        {cart.map(item => (
                            <div key={item.productId._id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100">
                                
                                <div className="flex items-center space-x-4">
                                    {/* Image */}
                                    <img 
                                        src={item.productId.imageUrl || 'https://via.placeholder.com/80'} 
                                        alt={item.productId.name} 
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    
                                    {/* Details */}
                                    <div>
                                        <Link 
                                            to={`/product/${item.productId._id}`} 
                                            className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition"
                                        >
                                            {item.productId.name}
                                        </Link>
                                        <p className="text-gray-500 text-sm">Category: {item.productId.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8">
                                    
                                    {/* Quantity Control */}
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
                                        className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                                        disabled={loading}
                                    />

                                    {/* Item Subtotal */}
                                    <p className="text-lg font-medium text-gray-800 w-24 text-right">
                                        ${(item.productId.price * item.quantity).toFixed(2)}
                                    </p>

                                    {/* Remove Button */}
                                    <button 
                                        onClick={() => handleRemoveItem(item.productId._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                                        disabled={loading}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        <div className="mt-8 flex justify-start">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-1" /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* === 2. Order Summary (1/3 width) === */}
                    <div className="md:col-span-1 mt-10 md:mt-0 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Order Summary</h2>
                        
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping (Standard)</span>
                                <span>$10.00</span> {/* Mock Shipping */}
                            </div>
                            <div className="flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
                                <span>Order Total</span>
                                <span>${(cartTotal + 10).toFixed(2)}</span> 
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/checkout/address')}
                            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                            disabled={loading || cartTotal === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;