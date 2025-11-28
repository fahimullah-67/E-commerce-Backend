// src/utils/api.js

import axios from 'axios';

const API_BASE_URL = '/api/'; 

// 1. Public Request Instance (for products, categories)
export const publicRequest = axios.create({
  baseURL: API_BASE_URL,
});

// 2. Authorized Request Instance (for cart, orders, profile)
export const authRequest = (token) => axios.create({
  baseURL: API_BASE_URL,
  headers: {
    token: `Bearer ${token}`, 
  },
});