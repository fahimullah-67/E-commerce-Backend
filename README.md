# E-commerce-Backend


# E-Commerce Platform

A full-stack e-commerce application built with React, Vite, Node.js, and MongoDB. Features user authentication, product browsing, shopping cart, order management, and admin dashboard.

## 🌐 Live URLs

- **Frontend**: `https://ecommerce-frontend.example.com` (Mock URL)
- **Backend API**: `https://api.ecommerce-backend.example.com` (Mock URL)
- **Admin Dashboard**: `https://ecommerce-frontend.example.com/admin` (Mock URL)

## ✨ Features

### User Features
- **User Authentication**: Register, login, and logout functionality
- **Product Browsing**: Browse products by categories with filtering options
- **Product Details**: Detailed product information with images and descriptions
- **Shopping Cart**: Add/remove products, update quantities, view cart totals
- **Checkout**: Multi-step checkout process with address and payment options
- **Order History**: View past orders and order details
- **User Profile**: Manage user account information
- **Contact Form**: Send inquiries and messages to support team

### Admin Features
- **Admin Dashboard**: Comprehensive overview of sales, orders, and products
- **Product Management**: Create, update, delete products
- **Order Management**: View and manage customer orders
- **Admin Access Control**: Protected routes with admin verification

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: CSS modules
- **State Management**: React Context API (Auth, Cart, Checkout)
- **HTTP Client**: Axios
- **Routing**: React Router

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: Custom authentication and admin verification

### Database Models
- **User**: Store user account information and authentication
- **Product**: Product details, pricing, inventory, categories
- **Cart**: Shopping cart items and quantities per user
- **Order**: Order history, status, items, and payment information

## 📁 Project Structure

```
E-Commerce/
├── Frontend/
│   └── Ecommerce/
│       ├── src/
│       │   ├── components/       # Reusable UI components
│       │   ├── pages/           # Page components
│       │   ├── context/         # React Context for state
│       │   ├── api/             # API integration
│       │   └── utils/           # Helper utilities
│       └── package.json
│
└── BackEnd/
    ├── src/
    │   ├── controllers/         # Business logic
    │   ├── models/              # Database schemas
    │   ├── routes/              # API endpoints
    │   ├── middleware/          # Auth & validation
    │   ├── db/                  # Database config
    │   └── utils/               # Helper functions
    ├── server.js                # Express server
    └── package.json
```

## 🔗 API Endpoints (Mock Examples)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all orders (Admin only)

### Contact
- `POST /api/contact` - Submit contact form

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd E-Commerence
   ```

2. **Frontend Setup**
   ```bash
   cd Frontend/Ecommerce
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd BackEnd
   npm install
   npm start
   ```

4. **Environment Variables**
   Create `.env` file in BackEnd folder:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

## 📦 Dependencies

### Frontend
- react
- react-router-dom
- axios
- vite

### Backend
- express
- mongodb/mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

## 🔐 Authentication

- JWT-based authentication for secure API access
- Admin verification middleware for protected routes
- Password hashing with bcryptjs

## 🎯 Future Improvements

- Replace mock URLs with production URLs
- Add payment gateway integration (Stripe/PayPal)
- Implement email notifications
- Add product reviews and ratings
- Enhance search and filtering options
- Implement inventory management
- Add multiple language support
