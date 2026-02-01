import axiosInstance from "../axiosConfig";
import {
  requestSuccessHandler,
  requestErrorHandler,
} from "./requestInterceptor";
import {
  responseSuccessHandler,
  responseErrorHandler,
} from "./responseInterceptor";

/**
 * Setup all axios interceptors
 * This function should be called once when the app initializes
 */
export const setupInterceptors = () => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    requestSuccessHandler,
    requestErrorHandler,
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    responseSuccessHandler,
    responseErrorHandler,
  );

  console.log("✅ Axios interceptors configured");
};

export default setupInterceptors;
