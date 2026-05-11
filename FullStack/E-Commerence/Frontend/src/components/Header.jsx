// src/components/Header.jsx

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const { itemCount } = useContext(CartContext);
  const cartCount = itemCount;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900 tracking-wider"
          >
            SHOP.CO
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium"
            >
              About
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="hidden sm:block">
              <input
                type="search"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 w-48"
              />
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User/Account */}
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-indigo-600 flex items-center">
                  <UserIcon className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 transition duration-300 visible group-hover:visible">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-1" />{" "}
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;