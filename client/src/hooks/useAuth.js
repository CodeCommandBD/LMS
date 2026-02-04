import { useAuth as useReduxAuth } from "./useRedux";
import api from "../lib/api";

// Re-export individual hooks
export { useLogin } from "./auth/useLogin";
export { useRegister } from "./auth/useRegister";
export { useLogout } from "./auth/useLogout";
export { useUpdateProfile } from "./auth/useUpdateProfile";
export { useChangePassword } from "./auth/useChangePassword";
export { useDeleteAccount } from "./auth/useDeleteAccount";
export { useProfile as useUserProfile } from "./auth/useProfile";

import { useLogin } from "./auth/useLogin";
import { useRegister } from "./auth/useRegister";
import { useLogout } from "./auth/useLogout";
import { useUpdateProfile } from "./auth/useUpdateProfile";
import { useChangePassword } from "./auth/useChangePassword";
import { useDeleteAccount } from "./auth/useDeleteAccount";
import { useProfile } from "./auth/useProfile";

/**
 * Complete authentication and user management hook
 * Combines all auth logic if you prefer a single hook
 */
export const useAuthentication = () => {
  const auth = useReduxAuth();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const deleteAccountMutation = useDeleteAccount();
  const userProfile = useProfile();

  /**
   * Get Current User (Manual fetch helper)
   */
  const getCurrentUser = async () => {
    try {
      // api.getCurrentUser doesn't exist in lib/api.js, it's getProfile
      // But let's check if the user meant a specific backend call differently.
      // In previous useAuth.js it was api.auth.getCurrentUser.
      // In lib/api.js, getProfile exists.
      // I'll map it to getProfile logic or api.getProfile if they match.
      const data = await api.getProfile();
      auth.setUser({ user: data.user, role: data.user.role || auth.role });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Wrapper functions for backward compatibility
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

    // Mutations (Direct Access)
    loginMutation,
    registerMutation,
    logoutMutation,
    updateProfileMutation,
    changePasswordMutation,
    deleteAccountMutation,
    userProfile, // Include profile query

    // Helper properties for loading states
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
  };
};
