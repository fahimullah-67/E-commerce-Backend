import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

// --- MOCK DATA ---
const MOCK_PRODUCT = {
    _id: "655d9d73d611f7c0a876a39b", 
    name: "Premium Cotton T-Shirt",
    description: "Experience the ultimate comfort and quality with our signature cotton t-shirt. Features a soft, pre-shrunk fabric and a classic fit for everyday wear. Available in multiple colors.",
    price: 35.99,
    stockQuantity: 15,
    imageUrl: "https://via.placeholder.com/600x800/22c55e/ffffff?text=T-Shirt",
    category: "Apparel",
    rating: 4.7,
    imageGallery: [
        "https://via.placeholder.com/150/22c55e/ffffff?text=View+1",
        "https://via.placeholder.com/150/34d399/ffffff?text=View+2",
        "https://via.placeholder.com/150/10b981/ffffff?text=View+3"
    ]
};
// -----------------

const ProductDetailsPage = () => {
    // In a real app, use the ID from the URL to fetch data:
    // const { id } = useParams(); 
    // const [product, setProduct] = useState(null); 
    
    const product = MOCK_PRODUCT; // Use mock data for now
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.imageUrl);

    const { addToCart, loading: cartLoading } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [statusMessage, setStatusMessage] = useState('');

    const handleAddToCart = async () => {
        if (!user) {
            setStatusMessage({ type: 'error', text: 'Please log in to add items to your cart.' });
            return;
        }

        setStatusMessage({ type: 'info', text: 'Adding to cart...' });
        
        const success = await addToCart(product._id, quantity);

        if (success) {
            setStatusMessage({ type: 'success', text: `${quantity} ${product.name}(s) added successfully!` });
            setTimeout(() => setStatusMessage(''), 3000);
        } else {
            setStatusMessage({ type: 'error', text: 'Failed to add item. Check console for details.' });
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Placeholder for actual loading state
    }

    const isInStock = product.stockQuantity > 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Status Message Display */}
                {statusMessage && (
                    <div className={`p-4 mb-6 rounded-lg text-white font-medium ${statusMessage.type === 'success' ? 'bg-green-500' : statusMessage.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
                        {statusMessage.text}
                    </div>
                )}

                <div className="md:flex md:space-x-12">
                    
                    {/* === 1. Image Gallery (Left Column) === */}
                    <div className="md:w-1/2 space-y-4">
                        <img 
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-200"
                        />
                        <div className="flex space-x-3 overflow-x-auto">
                            {product.imageGallery.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 ${selectedImage === img ? 'border-indigo-600' : 'border-transparent'}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* === 2. Details and Controls (Right Column) === */}
                    <div className="md:w-1/2 mt-10 md:mt-0 space-y-8">
                        
                        {/* Title and Rating */}
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                <span>{product.rating} / 5.0</span>
                                <span className="text-sm">({product.reviews || '0'} Reviews)</span>
                            </div>
                        </div>

                        {/* Price and Stock */}
                        <div className="flex items-baseline space-x-4 border-b border-gray-200 pb-4">
                            <p className="text-5xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</p>
                            <p className={`text-sm font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                                {isInStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Description</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                        
                        {/* Quantity Selector and Button */}
                        <div className="flex space-x-4 pt-4">
                            
                            {/* Quantity Selector */}
                            <input
                                type="number"
                                min="1"
                                max={product.stockQuantity}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                                className="w-20 p-2 border border-gray-300 rounded-lg text-center focus:border-indigo-500 focus:ring-indigo-500"
                                disabled={!isInStock}
                            />

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!isInStock || cartLoading || !user}
                                className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300
                                    ${!isInStock || !user ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                                    ${cartLoading && 'opacity-70 cursor-wait'}`
                                }
                            >
                                {cartLoading ? (
                                    'Adding...'
                                ) : (
                                    <>
                                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;