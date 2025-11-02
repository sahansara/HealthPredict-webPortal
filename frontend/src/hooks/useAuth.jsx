import { useState } from 'react';
import { loginUser, logoutUser } from '../api/authApi';
import { setToken, setUser, clearAuth, getUser } from '../utils/authUtils';
import { getDashboardRoute } from '../utils/roleConfig';

/**
 * Handles login, logout, and form validation
 */
const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Validate email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate password
   */
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  /**
   * Validate login form
   */
  const validateForm = (email, password) => {
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    return {
      isValid: Object.keys(validationErrors).length === 0,
      errors: validationErrors,
    };
  };

  /**
   * Handle user login
   */
  const login = async (email, password, navigate) => {
    setLoading(true);
    setErrors({});

    // Validate form
    const validation = validateForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return { success: false };
    }

    try {
      // Call login API
      const result = await loginUser(email, password);

      if (result.success) {
        const { token, user } = result.data;

        // Store token and user data
        setToken(token);
        setUser(user);

        // Navigate based on role
        const dashboardRoute = getDashboardRoute(user.id);
        navigate(dashboardRoute);

        return { success: true };
      } else {
        // Handle backend validation errors
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message });
        }
        return { success: false };
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user logout
   */
  const logout = async (navigate) => {
    setLoading(true);

    try {
      await logoutUser();
      clearAuth();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear auth data anyway
      clearAuth();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get current authenticated user
   */
  const getCurrentUser = () => {
    return getUser();
  };

  return {
    login,
    logout,
    loading,
    errors,
    getCurrentUser,
  };
};

export default useAuth;