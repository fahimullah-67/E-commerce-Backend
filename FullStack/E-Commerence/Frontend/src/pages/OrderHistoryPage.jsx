import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeftIcon, CubeIcon } from '@heroicons/react/24/outline';

const OrderHistoryPage = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Axios Instance for Authorized Requests ---
    const authRequest = axios.create({
        baseURL: '/api/', 
        headers: {
            token: `Bearer ${token}`,
        },
    });
    
    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Fetch order history on load
    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                // Endpoint: GET /api/orders/find/:userId
                const res = await authRequest.get(`orders/find/${user._id}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load order history.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading Orders...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">{error}</div>;
    }

    // --- Empty State View ---
    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <CubeIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">No Past Orders Found</h1>
                    <p className="text-gray-600 mb-8">It looks like you haven't placed any orders with us yet.</p>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" /> Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }
    
    // --- Order List View ---
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Order History</h1>
                
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-150 hover:shadow-xl">
                            <div className="flex justify-between items-center border-b pb-3 mb-3">
                                <h2 className="text-xl font-semibold text-gray-900">Order ID: #{order._id.slice(-8)}</h2>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium text-gray-800">Order Date</p>
                                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Total Amount</p>
                                    <p className="text-lg font-bold text-indigo-600">${order.totalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Items</p>
                                    <p>{order.items.length} unique product(s)</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Ship To</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 border-t pt-4 flex justify-end">
                                <Link 
                                    to={`/orders/${order._id}`} 
                                    className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderHistoryPage;