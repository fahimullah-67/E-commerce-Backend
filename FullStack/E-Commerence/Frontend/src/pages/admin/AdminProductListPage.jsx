import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthContext } from '../../context/AuthContext';
import { publicRequest, authRequest } from '../../utils/api';
import { PencilSquareIcon, TrashIcon, PlusCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const AdminProductListPage = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const adminApi = authRequest(token);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Use public request (GET /api/products is public)
            const res = await publicRequest.get('products');
            setProducts(res.data);
        } catch (err) {
            setError("Failed to load products. Check API status.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            // Backend requires a DELETE route (assuming you implement DELETE /api/products/:id protected by Admin)
            // Example: await adminApi.delete(`products/${productId}`);
            
            // For now, we'll simulate success until the DELETE route is implemented:
            console.log(`Simulating deletion of Product ID: ${productId}`);

            // Remove product from local state immediately
            setProducts(prev => prev.filter(p => p._id !== productId));
        } catch (err) {
            setError(`Failed to delete product: ${err.response?.data || 'Access Denied'}`);
        }
    };
    
    // Helper function to safely display data
    const safeData = (data) => data !== undefined ? data : 'N/A';

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Product Inventory Management</h1>
                    <div>
                        <Link to="/admin" className="flex items-center text-gray-600 hover:text-gray-800 text-sm mr-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-1" /> Dashboard
                        </Link>
                        <Link to="/admin/products/new" className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition duration-150">
                            <PlusCircleIcon className="w-5 h-5 mr-2" /> Add New Product
                        </Link>
                    </div>
                </div>

                {loading && <div className="text-center py-10">Loading inventory...</div>}
                {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                {!loading && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id} className={product.isAvailable ? '' : 'bg-red-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-lg object-cover mr-3" src={safeData(product.imageURL)} alt={product.name} />
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${safeData(product.price.toFixed(2))}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {safeData(product.stockQuantity)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{safeData(product.category)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/admin/products/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900 p-2">
                                                <PencilSquareIcon className="w-5 h-5 inline" />
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900 ml-3 p-2">
                                                <TrashIcon className="w-5 h-5 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default AdminProductListPage;