import axios from 'axios';
import { getToken, removeToken } from '../utils/authUtils';

// Create axios instance with security configurations
const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, 
});

// CSRF Token Management
let csrfToken = null;

/**
 * Get CSRF token from Laravel Sanctum
 */
const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;
  
  try {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    const sanctumUrl = baseUrl.replace('/api', '/sanctum/csrf-cookie');
    
    await axios.get(sanctumUrl, { withCredentials: true });
    
    // Extract XSRF token from cookie
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      csrfToken = decodeURIComponent(match[1]);
    }
    
    return csrfToken;
  } catch (error) {
    console.error('CSRF token fetch failed:', error);
    return null;
  }
};

// Request interceptor - Add auth token and CSRF token
authApi.interceptors.request.use(
  async (config) => {
    // Check if we're in production and using HTTP
    if (process.env.NODE_ENV === 'production' && config.baseURL?.startsWith('http://')) {
      console.error('Security Warning: Using HTTP in production. Switch to HTTPS!');
      config.baseURL = config.baseURL.replace('http://', 'https://');
    }

    // Add Bearer token if available
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      const csrf = await getCsrfToken();
      if (csrf) {
        config.headers['X-XSRF-TOKEN'] = csrf;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // Handle 419 CSRF token mismatch - retry once
      if (error.response.status === 419 && !originalRequest._retry) {
        originalRequest._retry = true;
        csrfToken = null; // Reset CSRF token
        await getCsrfToken(); // Get new CSRF token
        return authApi(originalRequest); // Retry the request
      }

      // Handle 401 Unauthorized - Token expired or invalid
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden - Insufficient permissions
      if (error.response.status === 403) {
        console.error('Access Denied:', error.response.data.message);
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Login API call
 */
export const loginUser = async (email, password) => {
  try {
    // Ensure we have CSRF token before login
    await getCsrfToken();
    
    const response = await authApi.post('/login', {
      email,
      password,
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed. Please try again.',
      errors: error.response?.data?.errors || {},
    };
  }
};

/**
 * Logout API call
 */
export const logoutUser = async () => {
  try {
    const response = await authApi.post('/logout');
    csrfToken = null; // Clear CSRF token
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed.',
    };
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async () => {
  try {
    const response = await authApi.get('/profile');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch profile.',
    };
  }
};

/**
 * Refresh token
 */
export const refreshToken = async () => {
  try {
    const response = await authApi.post('/refresh');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Token refresh failed.',
    };
  }
};

export default authApi;