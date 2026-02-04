import { useAuth as useReduxAuth } from "./useRedux";
import api from "../lib/api";

// Import hooks for internal use and re-export them
import { useLogin } from "./auth/useLogin";
import { useRegister } from "./auth/useRegister";
import { useLogout } from "./auth/useLogout";
import { useUpdateProfile } from "./auth/useUpdateProfile";
import { useChangePassword } from "./auth/useChangePassword";
import { useDeleteAccount } from "./auth/useDeleteAccount";
import { useProfile as useUserProfile } from "./auth/useProfile";

export {
  useLogin,
  useRegister,
  useLogout,
  useUpdateProfile,
  useChangePassword,
  useDeleteAccount,
  useUserProfile,
};

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
  const userProfile = useUserProfile();

  /* ============================================================================
   * Wrapper Functions (Backward Compatibility)
   * Easy-to-read wrappers that return { success: boolean, data/error }
   * ============================================================================ */

  // Helper to standardise async responses: { success: true, data } or { success: false, error }
  const handleAsync = (promise) =>
    promise
      .then((data) => ({ success: true, data }))
      .catch((error) => ({ success: false, error: error.message }));

  const getCurrentUser = async () => {
    const { data, isError, error } = await userProfile.refetch();
    if (isError) return { success: false, error: error.message };
    if (data?.user)
      auth.setUser({ user: data.user, role: data.user.role || auth.role });
    return { success: true, data };
  };

  const login = (credentials, rememberMe = true) =>
    handleAsync(loginMutation.mutateAsync({ credentials, rememberMe }));

  const register = (userData) =>
    handleAsync(registerMutation.mutateAsync(userData));

  const logout = () => logoutMutation.mutate();

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
