// src/context/AuthContext.jsx

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

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

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    
    const login = async (credentials) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(`/api/auth/login`, credentials);

        const { token, password, ...userWithoutPass } = res.data;

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: userWithoutPass, token },
        });
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response.data || "Login failed",
        });
      }
    };
    
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

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