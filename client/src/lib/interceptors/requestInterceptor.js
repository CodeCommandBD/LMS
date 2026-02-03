/**
 * Request Interceptor
 * Handles outgoing requests before they are sent to the server
 */

/**
 * Success handler for requests
 * @param {object} config - Axios request config
 * @returns {object} Modified config
 */


export const requestSuccessHandler = (config) => {
  // Get auth token from localStorage or sessionStorage
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add timestamp to prevent caching
  config.headers["X-Request-Time"] = new Date().getTime();

  // Log request in development mode
  if (import.meta.env.DEV) {
    console.log("🚀 Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
  }

  return config;
};

/**
 * Error handler for requests
 * @param {object} error - Request error
 * @returns {Promise} Rejected promise
 */
export const requestErrorHandler = (error) => {
  console.error("❌ Request Error:", error);
  return Promise.reject(error);
};
