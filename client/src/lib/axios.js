/**
 * Main Axios Instance Export
 * This file exports the configured axios instance with interceptors
 *
 * The interceptors are set up in a modular way:
 * - axiosConfig.js: Base axios instance configuration
 * - interceptors/requestInterceptor.js: Request interceptor logic
 * - interceptors/responseInterceptor.js: Response interceptor logic
 * - interceptors/index.js: Interceptor setup
 * - utils/tokenManager.js: Token management utilities
 */

import axiosInstance from "./axiosConfig";
import setupInterceptors from "./interceptors";

// Setup interceptors globally
setupInterceptors();

// Re-export token management utilities for convenience
export {
  setAuthToken,
  clearAuthToken,
  isAuthenticated,
} from "./utils/tokenManager";

export default axiosInstance;
