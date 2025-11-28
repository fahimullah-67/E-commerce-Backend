// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Simplified navigation data
    const navItems = [
        { title: "Company", links: ["About Us", "Careers", "Contact Us"] },
        { title: "Support", links: ["FAQs", "Shipping", "Returns"] },
        { title: "Shop", links: ["All Products", "Men's", "Women's"] },
    ];

    return (
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Info */}
            <div className="col-span-2 md:col-span-2 space-y-4">
              <h3 className="text-3xl font-extrabold text-white tracking-wider">
                SHOP.CO
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                We offer the finest collection of apparel and accessories for
                every season.
              </p>
              {/* Social Icons Placeholder */}
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 transition duration-150">
                  F
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 transition duration-150">
                  A
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 transition duration-150">
                  H
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 transition duration-150">
                  I
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 transition duration-150">
                  M
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            {navItems.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={`/${link.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-col md:flex-row text-sm text-gray-500">
            <p className="mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} SHOP.CO. All rights reserved.
            </p>
            <div className="flex space-x-2">
              {/* Payment Method Icons Placeholder */}
              <img
                src="https://i.pinimg.com/1200x/bb/7a/43/bb7a43b0bef9e268116078b6e0ef8d81.jpg"
                alt="Visa"
                className="h-4 rounded"
              />
              <img
                src="https://i.pinimg.com/1200x/56/fd/48/56fd486a48ff235156b8773c238f8da9.jpg"
                alt="MasterCard"
                className="h-4 rounded"
              />
              <img
                src="https://i.pinimg.com/736x/84/5d/fc/845dfc9d1860464d9b06860745c80c64.jpg"
                alt="PayPal"
                className="h-4 rounded"
              />
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;