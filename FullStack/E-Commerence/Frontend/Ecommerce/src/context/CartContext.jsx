// src/context/CartContext.jsx

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Need AuthContext to get user ID and token

// Define the initial state
const INITIAL_STATE = {
    cart: null, // Will hold the array of products in the cart
    loading: false,
    error: null,
};

// Create the Context object
export const CartContext = createContext(INITIAL_STATE);

// Reducer function
const CartReducer = (state, action) => {
    switch (action.type) {
        case "CART_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, cart: action.payload };
        case "UPDATE_SUCCESS":
            return { ...state, loading: false, cart: action.payload };
        case "CART_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "CART_CLEAR":
            return { ...state, cart: null, loading: false, error: null };
        default:
            return state;
    }
};

// Provider component
export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
    const { user, token, logout } = useContext(AuthContext);

    // --- Axios Instance for Authorized Requests ---
    const authRequest = axios.create({
        baseURL: '/api/', // Uses the proxy
        headers: {
            token: `Bearer ${token}`,
        },
    });

    // --- 1. FETCH CART LOGIC ---
    const fetchCart = async () => {
        if (!user) return dispatch({ type: "CART_CLEAR" }); // Clear if user logs out
        
        dispatch({ type: "CART_START" });
        try {
            // Endpoint: GET /api/carts/find/:userId
            const res = await authRequest.get(`carts/find/${user._id}`);
            dispatch({ type: "FETCH_SUCCESS", payload: res.data.products });
        } catch (err) {
            console.error("Error fetching cart:", err);
            // Handle unauthorized access (e.g., token expired)
            if (err.response && err.response.status === 401) {
                logout();
            }
            dispatch({ type: "CART_FAILURE", payload: err.response?.data || "Could not fetch cart" });
        }
    };

    // --- 2. ADD TO CART LOGIC ---
    const addToCart = async (productId, quantity = 1) => {
        if (!user) return false; // Must be logged in to add to cart

        dispatch({ type: "CART_START" });
        try {
            // Endpoint: POST /api/carts
            const res = await authRequest.post('carts', { productId, quantity });
            
            // Re-fetch the cart data to ensure the state is current after update
            await fetchCart(); 
            return true;
        } catch (err) {
            dispatch({ type: "CART_FAILURE", payload: err.response?.data || "Failed to add to cart" });
            return false;
        }
    };
    
    // --- 3. UPDATE QUANTITY LOGIC ---
    const updateCartQuantity = async (productId, quantity) => {
        if (!user) return false;

        dispatch({ type: "CART_START" });
        try {
            // Endpoint: PUT /api/carts/:userId (with product info in body)
            await authRequest.put(`carts/${user._id}`, { productId, quantity });
            
            // Re-fetch the cart data
            await fetchCart(); 
            return true;
        } catch (err) {
            dispatch({ type: "CART_FAILURE", payload: err.response?.data || "Failed to update cart" });
            return false;
        }
    };

    // --- Effect: Fetch cart whenever user or token changes ---
    useEffect(() => {
        if (user && token) {
            fetchCart();
        } else {
            dispatch({ type: "CART_CLEAR" });
        }
    }, [user, token]);


    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                loading: state.loading,
                error: state.error,
                fetchCart,
                addToCart,
                updateCartQuantity,
                cartCount: state.cart?.length || 0,
                // A helper to calculate the total number of *items* (not unique products)
                itemCount: state.cart?.reduce((total, product) => total + product.quantity, 0) || 0,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};