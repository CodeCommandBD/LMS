import axios from "axios";
import { toast } from "react-toastify";
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
  const message = data?.message || "আপনার এই resource এ access নেই";
  console.error("Access forbidden:", message);
  toast.error(message);
  error.message = message;
};

/**
 * Handle 404 Not Found errors
 */
const handleNotFoundError = (error, data) => {
  const message = data?.message || "Resource খুঁজে পাওয়া যায়নি";
  toast.error(message);
  error.message = message;
};

/**
 * Handle 422 Validation errors
 */
const handleValidationError = (error, data) => {
  const message = data?.message || "Validation failed";
  toast.error(message);
  error.message = message;
  error.validationErrors = data?.errors || {};
};

/**
 * Handle 429 Rate Limit errors
 */
const handleRateLimitError = (error) => {
  const message = "অনেক বেশি requests হয়েছে। একটু পরে try করুন।";
  toast.error(message);
  error.message = message;
};

/**
 * Handle 500 Server errors
 */
const handleServerError = (error, data) => {
  const message = data?.message || "Server error হয়েছে। একটু পরে try করুন।";
  toast.error(message);
  error.message = message;
};

/**
 * Handle 503 Service Unavailable errors
 */
const handleServiceUnavailableError = (error) => {
  const message = "Service এখন available নেই। একটু পরে try করুন।";
  toast.error(message);
  error.message = message;
};

/**
 * Handle generic errors
 */
const handleGenericError = (error, data) => {
  const message = data?.message || "একটা error হয়েছে";
  toast.error(message);
  error.message = message;
};

/**
 * Handle network errors (no response)
 */
const handleNetworkError = (error) => {
  const message = "Server থেকে response আসেনি। Internet connection check করুন।";
  toast.error(message);
  error.message = message;
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
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  sessionStorage.removeItem("token");

  // Dispatch logout action
  store.dispatch(logout());

  // Show notification
  toast.error("Session expired। আবার login করুন।");

  // Redirect to login page
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};
