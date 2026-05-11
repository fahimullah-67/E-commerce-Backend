import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthContext } from '../../context/AuthContext';
import { publicRequest, authRequest } from '../../utils/api';
import { CubeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const initialProductState = {
    name: '',
    description: '',
    price: 0.01,
    stockQuantity: 1,
    imageUrl: '',
    category: '',
    isAvailable: true,
};

const ProductForm = () => {
    const { id } = useParams(); // Product ID for editing
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [productData, setProductData] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(id ? true : false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const isEditing = !!id;
    const adminApi = authRequest(token); // Use authorized instance for POST/PUT

    // --- 1. Fetch Existing Product Data (if editing) ---
    useEffect(() => {
        if (!isEditing) {
            
            setPageLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                // Public GET route used to fetch data for editing form
                const res = await publicRequest.get(`products/${id}`);
                setProductData(res.data);
            } catch (err) {
                setError(`Failed to load product for editing: ${err.response?.data || err.message}`);
            } finally {
                setPageLoading(false);
            }
        };

        fetchProduct();
    }, [id, isEditing]);

    // --- 2. Form Handlers ---
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setProductData(prev => ({ 
            ...prev, 
            [id]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            let res;
            if (isEditing) {
                // Endpoint: PUT /api/products/:id (Protected by verifyTokenAndAdmin)
                res = await adminApi.put(`products/${id}`, productData);
                setSuccess("Product updated successfully!");
            } else {
                // Endpoint: POST /api/products (Protected by verifyTokenAndAdmin)
                res = await adminApi.post('products', productData);
                setSuccess("Product created successfully!");
                setProductData(initialProductState); // Clear form after creation
            }
            // Navigate back to the admin product list after successful action
            setTimeout(() => navigate('/admin/products'), 1500); 

        } catch (err) {
            console.error("Admin submit error:", err);
            setError(err.response?.data || "Operation failed. Check if you are logged in as Admin.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="text-center py-20">Loading Product Data...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEditing ? `Edit Product: ${productData.name}` : 'Create New Product'}
                    </h1>
                    <Link to="/admin/products" className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
                        <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                    
                    {success && <div className="p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}
                    {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                    {/* Basic Info Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" id="name" value={productData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" id="category" value={productData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"/>
                        </div>
                    </div>

                    {/* Pricing and Inventory Group */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input type="number" id="price" value={productData.price} onChange={handleChange} min="0.01" step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"/>
                        </div>
                        <div>
                            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input type="number" id="stockQuantity" value={productData.stockQuantity} onChange={handleChange} min="1" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"/>
                        </div>
                        <div className="flex items-center pt-7">
                            <input type="checkbox" id="isAvailable" checked={productData.isAvailable} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            <label htmlFor="isAvailable" className="ml-2 block text-sm font-medium text-gray-700">Available Online</label>
                        </div>
                    </div>

                    {/* Description and Image URL */}
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="url" id="imageUrl" value={productData.imageUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" rows="3" value={productData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className={`w-full py-3 rounded-md text-white font-semibold shadow-md transition ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                        {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ProductForm;