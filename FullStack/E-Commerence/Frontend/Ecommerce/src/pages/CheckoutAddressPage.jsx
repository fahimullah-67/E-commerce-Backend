// src/pages/CheckoutAddressPage.jsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckoutContext } from '../context/CheckoutContext';
import { CartContext } from '../context/CartContext';
import { LockClosedIcon } from '@heroicons/react/24/outline';

// Mock addresses for initial selection (in a real app, these come from the User Model)
const MOCK_ADDRESSES = [
    { id: 1, street: "123 Main St", city: "Springfield", state: "IL", zip: "62704", country: "USA" },
    { id: 2, street: "456 Oak Ave", city: "Shelbyville", state: "IL", zip: "62565", country: "USA" }
];

const CheckoutAddressPage = () => {
    const { checkoutData, updateCheckoutData } = useContext(CheckoutContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const [selectedAddressId, setSelectedAddressId] = useState(MOCK_ADDRESSES[0].id);
    const [newAddress, setNewAddress] = useState({
        street: '', city: '', state: '', zip: '', country: 'USA'
    });
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (!cart || cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        
        let finalAddress;

        if (isAddingNew) {
            // Simple validation
            if (!newAddress.street || !newAddress.city || !newAddress.zip) {
                alert("Please fill in all required address fields.");
                return;
            }
            finalAddress = newAddress;
        } else {
            finalAddress = MOCK_ADDRESSES.find(a => a.id === selectedAddressId);
        }

        // 1. Save the selected/new address to the context
        updateCheckoutData({ shippingAddress: finalAddress });

        // 2. Navigate to the next step (Payment/Review)
        navigate('/checkout/payment');
    };

    const handleNewAddressChange = (e) => {
        setNewAddress(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // Calculate total amount from CartContext for the summary
    const cartTotal = cart?.reduce((total, item) => total + (item.productId?.price * item.quantity), 0) || 0;
    const orderTotal = cartTotal + 10; // Subtotal + Mock Shipping

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center space-x-2 text-sm mb-6 text-gray-500">
                    <span>Cart</span> &gt; <span className="text-indigo-600 font-semibold">Address</span> &gt; <span>Payment</span> &gt; <span>Review</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>

                <form onSubmit={handleAddressSubmit} className="md:grid md:grid-cols-3 md:gap-10">
                    
                    {/* === 1. Address Selection/Input (2/3 width) === */}
                    <div className="md:col-span-2 space-y-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900">1. Shipping Address</h2>
                        
                        {/* Existing Addresses */}
                        {!isAddingNew && (
                            <div className="space-y-4">
                                {MOCK_ADDRESSES.map(address => (
                                    <div 
                                        key={address.id}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition duration-150 ${selectedAddressId === address.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-400'}`}
                                        onClick={() => setSelectedAddressId(address.id)}
                                    >
                                        <div className="font-semibold text-gray-900">
                                            {address.street}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {address.city}, {address.state} {address.zip}, {address.country}
                                        </div>
                                    </div>
                                ))}
                                
                                <button type="button" onClick={() => setIsAddingNew(true)} className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    + Add New Address
                                </button>
                            </div>
                        )}
                        
                        {/* New Address Form */}
                        {isAddingNew && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Enter New Address:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" id="street" placeholder="Street Address" value={newAddress.street} onChange={handleNewAddressChange} className="p-3 border rounded-lg" required />
                                    <input type="text" id="city" placeholder="City" value={newAddress.city} onChange={handleNewAddressChange} className="p-3 border rounded-lg" required />
                                    <input type="text" id="state" placeholder="State / Province" value={newAddress.state} onChange={handleNewAddressChange} className="p-3 border rounded-lg" />
                                    <input type="text" id="zip" placeholder="ZIP / Postal Code" value={newAddress.zip} onChange={handleNewAddressChange} className="p-3 border rounded-lg" required />
                                </div>
                                <button type="button" onClick={() => setIsAddingNew(false)} className="text-red-600 hover:text-red-800 font-medium text-sm">
                                    Use Existing Address
                                </button>
                            </div>
                        )}

                    </div>

                    {/* === 2. Order Summary (1/3 width) === */}
                    <div className="md:col-span-1 mt-10 md:mt-0 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Order Summary</h2>
                        
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping (Standard)</span>
                                <span>$10.00</span>
                            </div>
                            <div className="flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
                                <span>Order Total</span>
                                <span>${orderTotal.toFixed(2)}</span> 
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md flex items-center justify-center"
                        >
                            <LockClosedIcon className="w-5 h-5 mr-2" />
                            Continue to Payment
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutAddressPage;