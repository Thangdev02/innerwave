import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Đọc token từ cookie và set header Authorization
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Calling API:', config.baseURL + config.url);

    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set with token:', token.substring(0, 20) + '...');
    } else {
      console.warn('No token found in cookies for this request');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (giữ nguyên)
// api.js - Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Calling API:', config.baseURL + config.url);

    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Sent Authorization: Bearer ' + token.substring(0, 20) + '...');
    } else {
      console.warn('No token in cookie for this request');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;