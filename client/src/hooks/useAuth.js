import { useNavigate } from "react-router-dom";
import { useAuth } from "./useRedux";
import { setAuthToken, clearAuthToken } from "../lib/axios";
import api from "../services/api";

/**
 * Complete authentication hook with all auth operations
 */
export const useAuthentication = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  /**
   * Login user
   */
  const login = async (credentials, rememberMe = true) => {
    try {
      auth.loginStart();

      const data = await api.auth.login(credentials);

      // Save tokens
      setAuthToken(data.token, data.refreshToken, rememberMe);

      // Update Redux state
      auth.loginSuccess({
        user: data.user,
        role: data.role,
      });

      return { success: true, data };
    } catch (error) {
      auth.loginFailure(error.message);
      return { success: false, error: error.message };
    }
  };

  /**
   * Register user
   */
  const register = async (userData) => {
    try {
      auth.loginStart();

      const data = await api.auth.register(userData);

      // Save tokens
      setAuthToken(data.token, data.refreshToken);

      // Update Redux state
      auth.loginSuccess({
        user: data.user,
        role: data.role,
      });

      return { success: true, data };
    } catch (error) {
      auth.loginFailure(error.message);
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      clearAuthToken();
      auth.logout();
      navigate("/login");
    }
  };

  /**
   * Get current user
   */
  const getCurrentUser = async () => {
    try {
      const data = await api.auth.getCurrentUser();
      auth.setUser({
        user: data.user,
        role: data.role,
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    // State
    ...auth,

    // Methods
    login,
    register,
    logout,
    getCurrentUser,
  };
};
