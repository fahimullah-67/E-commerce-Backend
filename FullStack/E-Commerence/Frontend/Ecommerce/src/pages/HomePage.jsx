// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// --- Mock Data: Replace this with an API call later (useEffect) ---
const MOCK_PRODUCTS = [
    { id: 1, name: "Denim Jacket", price: 59.99, imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Jacket", rating: 4.5, reviews: 30 },
    { id: 2, name: "White Sneakers", price: 79.50, imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Sneakers", rating: 4.8, reviews: 55 },
    { id: 3, name: "Floral Dress", price: 45.00, imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Dress", rating: 4.2, reviews: 12 },
    { id: 4, name: "Classic Watch", price: 120.00, imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Watch", rating: 5.0, reviews: 8 },
];

const MOCK_CATEGORIES = [
    { name: "Men's", imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Men" },
    { name: "Women's", imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Women" },
    { name: "Accessories", imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Accs" },
    { name: "Kids", imageUrl: "https://dummyimage.com/200x200/475569/ffffff&text=Kids" },
];
// ------------------------------------

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    
                    {/* === 1. Hero Section === */}
                    <section className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl mb-16">
                        <div className="md:grid md:grid-cols-2 flex flex-col-reverse items-center">
                            
                            {/* Text Content */}
                            <div className="p-8 md:p-16">
                                <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
                                    <span className="text-indigo-600">New Season.</span> New Styles.
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 max-w-md">
                                    Explore the latest curated collection of high-quality fashion.
                                </p>
                                <Link to="/products">
                                    <button className="flex items-center bg-gray-900 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg">
                                        SHOP NOW <ArrowRightIcon className="w-5 h-5 ml-2" />
                                    </button>
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="w-full">
                                <img
                                    src="https://i.pinimg.com/1200x/e1/e4/f1/e1e4f182ecca57a1b4e30b1a94672e00.jpg"
                                    alt="New Season Styles"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                        </div>
                    </section>

                    {/* === 2. Featured Products === */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Featured Products</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {MOCK_PRODUCTS.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>

                    {/* === 3. Shop By Category === */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop By Category</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {MOCK_CATEGORIES.map(category => (
                                <Link 
                                    key={category.name} 
                                    to={`/products?category=${category.name}`} 
                                    className="block group relative overflow-hidden rounded-xl shadow-md transition duration-300 hover:shadow-xl"
                                >
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <h3 className="text-xl font-bold text-white tracking-wider">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;