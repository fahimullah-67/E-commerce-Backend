// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { publicRequest } from "../utils/api";

// --- Static Mock Data (for UI elements only) ---
const MOCK_CATEGORIES = [
  {
    name: "Men's Apparel",
    imageUrl:
      "https://via.placeholder.com/400x300/374151/ffffff?text=Mens+Apparel",
  },
  {
    name: "Women's Wear",
    imageUrl:
      "https://via.placeholder.com/400x300/ef4444/ffffff?text=Womens+Wear",
  },
  {
    name: "Accessories",
    imageUrl:
      "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Accessories",
  },
  {
    name: "Footwear",
    imageUrl: "https://via.placeholder.com/400x300/a855f7/ffffff?text=Footwear",
  },
];
const MOCK_BRANDS = [
  { name: "BrandA", logoUrl: "https://placeholder.com/100x40?text=Brand+A" },
  { name: "BrandB", logoUrl: "https://placeholder.com/100x40?text=Brand+B" },
  { name: "BrandC", logoUrl: "https://placeholder.com/100x40?text=Brand+C" },
  { name: "BrandD", logoUrl: "https://placeholder.com/100x40?text=Brand+D" },
  { name: "BrandE", logoUrl: "https://placeholder.com/100x40?text=Brand+E" },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Endpoint: GET /api/products
        const res = await publicRequest.get("products");
        const products = res.data;

        // Use the first 4 products as 'featured'
        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch products for Home Page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* === 1. Hero Section === */}
        <section className="bg-gradient-to- from-purple-100 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-row lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Discover Your{" "}
                <span className="text-indigo-600">Perfect Style</span>
              </h1>
              <Link
                to="/products"
                className="inline-flex items-center bg-gray-900 text-white text-xl font-semibold px-10 py-4 rounded-full hover:bg-gray-700 transition duration-300 shadow-xl"
              >
                SHOP NOW <ArrowRightIcon className="w-6 h-6 ml-3" />
              </Link>
            </div>
            <div className="lg:w-1/2 flex justify-end">
              <img
                src="https://i.pinimg.com/736x/d3/8b/81/d38b818d887c962def574123d3b65ea8.jpg"
                alt="Stylish Fashion Collection"
                className="rounded-3xl shadow-2xl object-cover w-full max-w-lg"
              />
            </div>
          </div>
        </section>

        {/* === 2. Trusted Brands Section === */}
        <section className="bg-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {MOCK_BRANDS.map((brand, index) => (
                <img
                  key={index}
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-10 opacity-70 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* === 3. Featured Products === */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              Featured Products
            </h2>

            {loading && (
              <div className="text-center text-lg text-indigo-600">
                Loading products...
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {!loading &&
                featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </section>

        {/* === 4. Unique Selling Points (USPs) === */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white">
          {/* ... (USPs content remains the same) ... */}
        </section>

        {/* === 5. Shop By Category === */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              Explore Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_CATEGORIES.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${category.name}`}
                  className="block group relative overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-2xl"
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;