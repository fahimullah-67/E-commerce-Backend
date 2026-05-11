// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutAddressPage from "./pages/CheckoutAddressPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminRoute from "./utils/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductForm from "./pages/admin/ProductForm";
import OrderManagementPage from "./pages/admin/OrderManagementPage";
import AdminProductListPage from "./pages/admin/AdminProductListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/all-products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* E-commerce Flow Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/address" element={<CheckoutAddressPage />} />
        <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />

        {/* Order History Routes */}
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />

        {/* About Page Route */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />

        {/*admin Page Handle*/}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />

          {/* Product Management Routes */}
          <Route path="products" element={<AdminProductListPage />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />

          {/*  Order Management Route ⬅️ */}
          <Route path="orders" element={<OrderManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
