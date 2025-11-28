import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

// --- Static Category Data (Matches data used in HomePage) ---
const CATEGORIES_DATA = [
    { name: "Men's Apparel", description: "Shirts, trousers, and accessories for men.", imageUrl: "https://i.pinimg.com/736x/d3/8b/81/d38b818d887c962def574123d3b65ea8.jpg" },
    { name: "Women's Wear", description: "Dresses, skirts, and casual wear for women.", imageUrl: "https://i.pinimg.com/1200x/f6/55/89/f655890d8b1a4ac03aaa82a6a7ffd685.jpg" },
    { name: "Accessories", description: "Watches, jewelry, bags, and essential extras.", imageUrl: "https://i.pinimg.com/736x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg" },
    { name: "Footwear", description: "Sneakers, boots, and formal shoes.", imageUrl: "https://i.pinimg.com/736x/aa/5d/8e/aa5d8eb1426433564483818e548ed82f.jpg" },
];

const CategoriesPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <CubeTransparentIcon className="w-8 h-8 mr-3 text-indigo-600" />
                    Shop By Collection
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CATEGORIES_DATA.map((category, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition duration-300 hover:shadow-2xl">
                            <div className="md:flex">
                                {/* Image */}
                                <div className="md:w-1/3">
                                    <img 
                                        src={category.imageUrl} 
                                        alt={category.name} 
                                        className="w-full h-48 md:h-full object-cover"
                                    />
                                </div>
                                {/* Details */}
                                <div className="p-6 md:w-2/3 space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                                    <p className="text-gray-600">{category.description}</p>
                                    <Link 
                                        to={`/products?category=${category.name}`} 
                                        className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition"
                                    >
                                        View Products ({category.name}) &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoriesPage;