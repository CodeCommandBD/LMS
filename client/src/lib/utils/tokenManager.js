/**
 * Token Management Utility
 * Centralized token storage and retrieval
 */

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Get access token from storage
 * @returns {string|null} Access token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Get refresh token from storage
 * @returns {string|null} Refresh token
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set authentication tokens
 * @param {string} token - Access token
 * @param {string} refreshToken - Refresh token (optional)
 * @param {boolean} rememberMe - Store in localStorage (true) or sessionStorage (false)
 */
export const setAuthToken = (token, refreshToken = null, rememberMe = true) => {
  if (!token) {
    console.warn("Attempting to set empty token");
    return;
  }

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(TOKEN_KEY, token);

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  console.log("✅ Tokens saved successfully");
};

/**
 * Clear all authentication tokens
 */
export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);

  console.log("🗑️ Tokens cleared");
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Update access token (after refresh)
 * @param {string} newToken - New access token
 */
export const updateToken = (newToken) => {
  const hasLocalToken = !!localStorage.getItem(TOKEN_KEY);
  const hasSessionToken = !!sessionStorage.getItem(TOKEN_KEY);

  if (hasLocalToken) {
    localStorage.setItem(TOKEN_KEY, newToken);
  } else if (hasSessionToken) {
    sessionStorage.setItem(TOKEN_KEY, newToken);
  }
};

export default {
  getToken,
  getRefreshToken,
  setAuthToken,
  clearAuthToken,
  isAuthenticated,
  updateToken,
};
