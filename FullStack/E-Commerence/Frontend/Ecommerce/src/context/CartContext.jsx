// src/context/CartContext.jsx

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authRequest } from "../utils/api";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
  cart: null,
  loading: false,
  error: null,
};

export const CartContext = createContext(INITIAL_STATE);

const CartReducer = (state, action) => {
  switch (action.type) {
    case "CART_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, cart: action.payload };
    case "CART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "CART_CLEAR":
      return { ...state, cart: null, loading: false, error: null };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { user, token, logout } = useContext(AuthContext);

  const getAuthRequest = () => authRequest(token);

  // --- 1. FETCH CART LOGIC ---
  const fetchCart = async () => {
    if (!user) return dispatch({ type: "CART_CLEAR" });

    dispatch({ type: "CART_START" });
    try {
      const res = await getAuthRequest().get(`carts/find/${user._id}`);
      // The backend returns an object { userId, products: [...] }
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.products });
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response && err.response.status === 401) {
        logout();
      }
      dispatch({
        type: "CART_FAILURE",
        payload: err.response?.data || "Could not fetch cart",
      });
    }
  };

  // --- 2. ADD TO CART LOGIC ---
  const addToCart = async (productId, quantity = 1) => {
    if (!user) return false;

    dispatch({ type: "CART_START" });
    try {
      await getAuthRequest().post("carts", { productId, quantity });
      await fetchCart();
      return true;
    } catch (err) {
      dispatch({
        type: "CART_FAILURE",
        payload: err.response?.data || "Failed to add to cart",
      });
      return false;
    }
  };

  // --- 3. UPDATE QUANTITY LOGIC ---
  const updateCartQuantity = async (productId, quantity) => {
    if (!user) return false;

    dispatch({ type: "CART_START" });
    try {
      await getAuthRequest().put(`carts/${user._id}`, { productId, quantity });
      await fetchCart();
      return true;
    } catch (err) {
      dispatch({
        type: "CART_FAILURE",
        payload: err.response?.data || "Failed to update cart",
      });
      return false;
    }
  };

  // Effect: Fetch cart whenever user or token changes
  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      dispatch({ type: "CART_CLEAR" });
    }
  }, [user, token]);

  const itemCount =
    state.cart?.reduce((total, product) => total + product.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        fetchCart,
        addToCart,
        updateCartQuantity,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};