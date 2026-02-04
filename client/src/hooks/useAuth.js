import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useRedux";
import { setAuthToken, clearAuthToken } from "../lib/axios";
import api from "../services/api";

/**
 * Complete authentication hook with TanStack Query
 */
export const useAuthentication = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  /**
   * Login Mutation
   */
  const loginMutation = useMutation({
    mutationFn: async ({ credentials, rememberMe }) => {
      const data = await api.auth.login(credentials);
      setAuthToken(data.token, data.refreshToken, rememberMe);
      return data;
    },
    onMutate: () => {
      auth.loginStart();
    },
    onSuccess: (data) => {
      auth.loginSuccess({
        user: data.user,
        role: data.role,
      });
    },
    onError: (error) => {
      auth.loginFailure(error.message || "Login failed");
    },
  });

  /**
   * Register Mutation
   */
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const data = await api.auth.register(userData);
      setAuthToken(data.token, data.refreshToken);
      return data;
    },
    onMutate: () => {
      auth.loginStart();
    },
    onSuccess: (data) => {
      auth.loginSuccess({
        user: data.user,
        role: data.role,
      });
    },
    onError: (error) => {
      auth.loginFailure(error.message || "Registration failed");
    },
  });

  /**
   * Logout Mutation
   */
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.auth.logout();
    },
    onSettled: () => {
      clearAuthToken();
      auth.logout();
      queryClient.clear(); // Clear all cache
      navigate("/login");
    },
  });

  /**
   * Get Current User (Manual fetch helper)
   * can be converted to useQuery if auto-fetch is needed
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

  // Wrapper functions to maintain existing API signature
  const login = async (credentials, rememberMe = true) => {
    try {
      const data = await loginMutation.mutateAsync({ credentials, rememberMe });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerMutation.mutateAsync(userData);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    logoutMutation.mutate();
  };

  return {
    // State (Redux)
    ...auth,

    // Methods
    login,
    register,
    logout,
    getCurrentUser,

    // Expose Mutation States (Optional/Extra)
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};
