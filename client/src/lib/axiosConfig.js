import axios from "axios";

/**
 * Create axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000, // 15 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if using cookies
});

export default axiosInstance;
