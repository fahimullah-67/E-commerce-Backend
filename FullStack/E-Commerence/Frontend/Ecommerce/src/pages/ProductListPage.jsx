// src/pages/ProductListPage.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { publicRequest } from '../utils/api'; // Use publicRequest for non-authenticated GET

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Endpoint: GET /api/products
                const res = await publicRequest.get('products');
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to load product list:", err);
                setError("Could not load products. Please check the backend server status.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
                
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <p className="text-gray-600">Showing {products.length} products</p>
                    {/* Sorting/Filtering logic would go here */}
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Sort By:</span>
                        <select className="p-2 border rounded-lg text-sm">
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading && <div className="text-center py-10 text-lg text-indigo-600">Loading products...</div>}
                {error && <div className="text-center py-10 text-lg text-red-600">Error: {error}</div>}
                
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
                
                {!loading && products.length === 0 && !error && (
                    <div className="text-center py-16">
                        <Squares2X2Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">No products found in the store.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProductListPage;