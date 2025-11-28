import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { CheckCircleIcon, CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const OrderDetailPage = () => {
    const { id } = useParams(); // Get order ID from URL
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const authRequest = axios.create({
        baseURL: '/api/', 
        headers: { token: `Bearer ${token}` },
    });
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrder = async () => {
            setLoading(true);
            try {
                // Endpoint: GET /api/orders/:id
                const res = await authRequest.get(`orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error("Error fetching order detail:", err);
                setError(err.response?.data || "Failed to load order details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id, user, token]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-50';
            case 'Processing': return 'text-yellow-600 bg-yellow-50';
            case 'Cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-indigo-600 bg-indigo-50';
        }
    };

    if (loading) return <div className="text-center py-20">Loading Order Details...</div>;
    if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;
    if (!order) return <div className="text-center py-20">Order not found.</div>;

    const subtotal = order.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
    const shipping = order.totalPrice - subtotal;
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Confirmation Header */}
                <div className="text-center bg-white p-8 rounded-xl shadow-md mb-8">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-4 mb-2">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600">Your order has been placed successfully.</p>
                </div>
                
                <div className="md:grid md:grid-cols-3 md:gap-10">
                    
                    {/* === 1. Summary and Items (2/3 width) === */}
                    <div className="md:col-span-2 space-y-8">
                        
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Order # {order._id.slice(-8)}</h2>
                            
                            {/* Status and Date */}
                            <div className="flex justify-between items-center text-sm mb-4">
                                <p>Placed On: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <span className={`px-3 py-1 font-medium rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Item List */}
                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.productId} className="flex justify-between items-center border-t pt-4">
                                        <div className="flex items-center space-x-3">
                                            {/* We don't have imageUrl here, but we can assume one */}
                                            <img src={ item.productId.imageURL } alt={item.name} className="w-10 h-10 rounded" />
                                            <div>
                                                <Link to={`/products/${item.productId}`} className="font-semibold hover:text-indigo-600">{item.name}</Link>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity} x ${item.priceAtPurchase.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold">${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping and Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Shipping Address */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-2">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center"><MapPinIcon className="w-5 h-5 mr-2" /> Shipping Address</h3>
                                <address className="text-gray-600 not-italic">
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                    {order.shippingAddress.country}
                                </address>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-2">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center"><CurrencyDollarIcon className="w-5 h-5 mr-2" /> Payment Method</h3>
                                <p className="text-gray-600">
                                    {order.paymentDetails.method}
                                </p>
                                {order.paymentDetails.last4 && (
                                    <p className="text-sm text-gray-500">Card ending in: **** {order.paymentDetails.last4}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* === 2. Total Summary (1/3 width) === */}
                    <div className="md:col-span-1 mt-10 md:mt-0 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Amount Charged</h2>
                        
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-4 text-2xl font-extrabold text-indigo-600">
                                <span>TOTAL</span>
                                <span>${order.totalPrice.toFixed(2)}</span> 
                            </div>
                        </div>

                        <Link to="/orders" className="mt-6 w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md flex items-center justify-center">
                            View All Orders
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetailPage;