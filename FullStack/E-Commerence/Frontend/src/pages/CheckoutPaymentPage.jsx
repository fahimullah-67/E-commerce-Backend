import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckoutContext } from '../context/CheckoutContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const CheckoutPaymentPage = () => {
    const { checkoutData, updateCheckoutData, clearCheckoutData } = useContext(CheckoutContext);
    const { cart, itemCount, fetchCart, updateCartQuantity } = useContext(CartContext);
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedPayment, setSelectedPayment] = useState('credit_card');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
    const [loading, setLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    // --- Axios Instance for Order Submission ---
    const authRequest = axios.create({
        baseURL: '/api/',
        headers: { token: `Bearer ${token}` },
    });

    // Redirect logic: Ensure user is logged in and address is set
    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!checkoutData.shippingAddress) {
            navigate('/checkout/address');
        } else if (!cart || cart.length === 0) {
             navigate('/cart');
        }
    }, [user, checkoutData.shippingAddress, cart, navigate]);

    // Calculate total amount
    const cartTotal = useMemo(() => {
        if (!cart) return 0;
        return cart.reduce((total, item) => total + (item.productId?.price * item.quantity), 0);
    }, [cart]);
    
    const shippingCost = 10.00;
    const orderTotal = cartTotal + shippingCost;

    // Handle payment detail changes (simulated)
    const handleCardChange = (e) => {
        setCardDetails(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // --- Order Submission Handler ---
    const handlePlaceOrder = async () => {
        setLoading(true);
        setOrderError(null);

        // 1. Prepare payment details payload (simulated)
        let paymentPayload;
        if (selectedPayment === 'credit_card') {
            if (!cardDetails.number || !cardDetails.cvv) {
                setOrderError("Please fill in required card details.");
                setLoading(false);
                return;
            }
            paymentPayload = { method: 'Credit Card', last4: cardDetails.number.slice(-4), transactionId: `TXN-${Date.now()}` };
        } else {
            paymentPayload = { method: 'Cash on Delivery', transactionId: `TXN-COD-${Date.now()}` };
        }

        try {
            // 2. Prepare the final request payload
            const orderPayload = {
                shippingAddress: checkoutData.shippingAddress,
                paymentDetails: paymentPayload,
            };

            // 3. Submit Order to Backend API
            // Endpoint: POST /api/orders
            const res = await authRequest.post('orders', orderPayload);

            // 4. Success: Clear frontend states
            clearCheckoutData(); // Clear address and payment context
            // Note: The backend handles clearing the cart via database logic (DELETE /api/carts)

            // 5. Redirect to Order Detail/Confirmation Page
            navigate(`/orders/${res.data._id}`);

        } catch (err) {
            console.error("Order submission error:", err);
            const errMsg = err.response?.data || "Failed to place order. Please try again.";
            setOrderError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    if (!user || !checkoutData.shippingAddress) {
        return null; // Prevents render before redirect
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center space-x-2 text-sm mb-6 text-gray-500">
                    <span>Cart</span> &gt; <span>Address</span> &gt; <span className="text-indigo-600 font-semibold">Payment & Review</span> &gt; <span>Confirmation</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">2. Payment & Review</h1>

                <div className="md:grid md:grid-cols-3 md:gap-10">
                    
                    {/* === 1. Payment Methods (Left Column) === */}
                    <div className="md:col-span-2 space-y-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Payment Options</h2>
                        
                        {/* Option 1: Credit Card */}
                        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${selectedPayment === 'credit_card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit_card"
                                checked={selectedPayment === 'credit_card'}
                                onChange={() => setSelectedPayment('credit_card')}
                                className="mr-2 text-indigo-600 focus:ring-indigo-500"
                            />
                            Credit/Debit Card (Simulated)
                            
                            {selectedPayment === 'credit_card' && (
                                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                                    <input type="text" id="number" placeholder="Card Number" onChange={handleCardChange} className="w-full p-2 border rounded-lg" required />
                                    <div className="flex space-x-3">
                                        <input type="text" id="expiry" placeholder="MM/YY" onChange={handleCardChange} className="w-1/2 p-2 border rounded-lg" required />
                                        <input type="text" id="cvv" placeholder="CVV" onChange={handleCardChange} className="w-1/2 p-2 border rounded-lg" required />
                                    </div>
                                </div>
                            )}
                        </label>
                        
                        {/* Option 2: Cash on Delivery */}
                        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${selectedPayment === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={selectedPayment === 'cod'}
                                onChange={() => setSelectedPayment('cod')}
                                className="mr-2 text-indigo-600 focus:ring-indigo-500"
                            />
                            Cash on Delivery (COD)
                        </label>

                        {/* Order Confirmation Section */}
                        <div className="mt-8 border-t pt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Review Order Details</h3>
                            
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-semibold text-gray-800 mb-2">Ship To:</p>
                                <address className="text-gray-600 not-italic text-sm">
                                    {checkoutData.shippingAddress.street}, {checkoutData.shippingAddress.city}<br />
                                    {checkoutData.shippingAddress.state}, {checkoutData.shippingAddress.zip}, {checkoutData.shippingAddress.country}
                                </address>
                            </div>
                        </div>

                    </div>

                    {/* === 2. Final Submit Summary (Right Column) === */}
                    <div className="md:col-span-1 mt-10 md:mt-0 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Final Order Total</h2>
                        
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
                                <span>TOTAL CHARGED</span>
                                <span>${orderTotal.toFixed(2)}</span> 
                            </div>
                        </div>

                        {orderError && (
                            <div className="p-3 mt-4 bg-red-100 text-red-700 text-sm rounded-lg text-center border border-red-300">
                                {orderError}
                            </div>
                        )}

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={loading || cartTotal === 0}
                            className={`mt-6 w-full py-4 text-white font-extrabold rounded-lg transition duration-150 shadow-lg flex items-center justify-center text-lg
                                ${loading || cartTotal === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`
                            }
                        >
                            <LockClosedIcon className="w-5 h-5 mr-2" />
                            {loading ? 'Processing Order...' : `Place Order – $${orderTotal.toFixed(2)}`}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPaymentPage;