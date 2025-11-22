// src/context/AuthContext.jsx

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Define the initial state (look for user data in localStorage on load)
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

// Create the Context object
export const AuthContext = createContext(INITIAL_STATE);

// Reducer function to handle state changes
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                token: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                token: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                token: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

// Provider component
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    
    // Function to handle login logic
    const login = async (credentials) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`/api/auth/login`, credentials);
            // Extract user and token from the response
            const { token, password, ...userWithoutPass } = res.data; 

            dispatch({ 
                type: "LOGIN_SUCCESS", 
                payload: { user: userWithoutPass, token } 
            });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data || "Login failed" });
        }
    };
    
    // Function to handle logout logic
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    // Effect to update localStorage whenever the state changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        } else {
             // Clear localStorage on logout
             localStorage.removeItem("user");
             localStorage.removeItem("token");
        }
    }, [state.user, state.token]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                loading: state.loading,
                error: state.error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};