import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CubeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Management Card 1: Products */}
                    <Link to="/admin/products" className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:bg-indigo-50 hover:shadow-2xl">
                        <ShoppingBagIcon className="w-10 h-10 text-indigo-600 mb-3" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">Product Management</h2>
                        <p className="text-gray-600 text-sm">Create, edit, and manage store inventory.</p>
                    </Link>

                    {/* Management Card 2: Orders */}
                    <Link to="/admin/orders" className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:bg-indigo-50 hover:shadow-2xl">
                        <CubeIcon className="w-10 h-10 text-green-600 mb-3" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">Order Fulfillment</h2>
                        <p className="text-gray-600 text-sm">Track, update status, and process customer orders.</p>
                    </Link>

                    {/* Management Card 3: Users (Optional) */}
                    <Link to="/admin/users" className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:bg-indigo-50 hover:shadow-2xl">
                        {/* ... (Users Icon/Content) ... */}
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;