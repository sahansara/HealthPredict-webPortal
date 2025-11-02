const TOKEN_KEY = 'HealthPredict_auth_token';
const USER_KEY = "user";

/**
 * Store authentication token securely
 * @param {string} token - JWT token from backend
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

/**
 * Retrieve authentication token
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

/**
 * Store user data
 */
export const setUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
};

/**
 * Retrieve user data
 */
export const getUser = () => {
  try {
    const userData = localStorage?.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get user role from stored data
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

/**
 * Get user role ID from stored data
 */
export const getUserRoleId = () => {
  const user = getUser();
  return user?.id ? parseInt(user.id) : null;
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  removeToken();
  localStorage.clear();
};