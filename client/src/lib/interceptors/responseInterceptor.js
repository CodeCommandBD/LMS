import axios from "axios";
import store from "../../store/store";
import { logout } from "../../store/slices/authSlice";

/**
 * Response Interceptor
 * Handles incoming responses and errors from the server
 */

/**
 * Success handler for responses
 * @param {object} response - Axios response
 * @returns {object} Response data
 */
export const responseSuccessHandler = (response) => {
  // Log response in development mode
  if (import.meta.env.DEV) {
    console.log("✅ Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
  }

  return response;
};

/**
 * Error handler for responses
 * @param {object} error - Response error
 * @returns {Promise} Rejected promise with enhanced error
 */
export const responseErrorHandler = async (error) => {
  const originalRequest = error.config;

  // Log error in development mode
  if (import.meta.env.DEV) {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
  }

  // Handle different error status codes
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        return handle401Error(error, originalRequest);

      case 403:
        handleForbiddenError(error, data);
        break;

      case 404:
        handleNotFoundError(error, data);
        break;

      case 422:
        handleValidationError(error, data);
        break;

      case 429:
        handleRateLimitError(error);
        break;

      case 500:
        handleServerError(error, data);
        break;

      case 503:
        handleServiceUnavailableError(error);
        break;

      default:
        handleGenericError(error, data);
    }
  } else if (error.request) {
    // Request was made but no response received
    handleNetworkError(error);
  } else {
    // Something else happened
    handleUnknownError(error);
  }

  return Promise.reject(error);
};

/**
 * Handle 401 Unauthorized errors with token refresh
 */
const handle401Error = async (error, originalRequest) => {
  // Prevent infinite retry loop
  if (originalRequest._retry) {
    logoutUser();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    // Try to refresh token
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const baseURL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${baseURL}/auth/refresh`, {
        refreshToken,
      });

      const { token: newToken } = response.data;

      // Save new token
      localStorage.setItem("token", newToken);

      // Update authorization header
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      // Retry original request with new token
      return axios(originalRequest);
    }
  } catch (refreshError) {
    console.error("Token refresh failed:", refreshError);
  }

  // Refresh failed - logout user
  logoutUser();
  return Promise.reject(error);
};

/**
 * Handle 403 Forbidden errors
 */
const handleForbiddenError = (error, data) => {
  console.error("Access forbidden:", data?.message);
  error.message =
    data?.message || "You do not have permission to access this resource";
};

/**
 * Handle 404 Not Found errors
 */
const handleNotFoundError = (error, data) => {
  error.message = data?.message || "Resource not found";
};

/**
 * Handle 422 Validation errors
 */
const handleValidationError = (error, data) => {
  error.message = data?.message || "Validation failed";
  error.validationErrors = data?.errors || {};
};

/**
 * Handle 429 Rate Limit errors
 */
const handleRateLimitError = (error) => {
  error.message = "Too many requests. Please try again later.";
};

/**
 * Handle 500 Server errors
 */
const handleServerError = (error, data) => {
  error.message =
    data?.message || "Internal server error. Please try again later.";
};

/**
 * Handle 503 Service Unavailable errors
 */
const handleServiceUnavailableError = (error) => {
  error.message = "Service temporarily unavailable. Please try again later.";
};

/**
 * Handle generic errors
 */
const handleGenericError = (error, data) => {
  error.message = data?.message || "An unexpected error occurred";
};

/**
 * Handle network errors (no response)
 */
const handleNetworkError = (error) => {
  error.message =
    "No response from server. Please check your internet connection.";
};

/**
 * Handle unknown errors
 */
const handleUnknownError = (error) => {
  error.message = error.message || "An unexpected error occurred";
};

/**
 * Logout user and redirect to login
 */
const logoutUser = () => {
  // Clear tokens
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");

  // Dispatch logout action
  store.dispatch(logout());

  // Redirect to login page
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};
