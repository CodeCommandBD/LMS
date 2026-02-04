import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useRedux";
import { clearAuthToken } from "../../lib/axios";
import * as api from "../../lib/api";

/**
 * Hook for Logout
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async () => {
      // api.auth.logout -> api.logoutUser?
      // api.js doesn't seem to have a default logoutUser.
      // It implies a token clear is main.
      // But Step 166 doesn't show a logout function?
      // Wait, let's re-read Step 166 contents.
      // Lines 1-41 are Auth API Calls.
      // loginUser, registerUser, getProfile, updateProfile, changePassword, deleteAccount.
      // NO logout function exported directly from what I see in lines 7-41.
      // But `useAuth.js` had `await api.auth.logout()`.
      // If `api.js` doesn't have it, then `useAuth.js` must have been failing on logout?
      // Or maybe line 68 in Step 85 showed `await api.auth.logout()`.
      // If `lib/api.js` is the source, it needs a logout function if the backend requires it.
      // Usually JWT logout is client-side only (clear token), unless there's a blacklist.
      // I will assume client-side only for now as api.js didn't show it, or I'll check if I missed it.
      // Wait, I might have missed it if it was further down or I scrolled past?
      // Step 166 shows lines 1-380. I can check carefully.
      // Lines 7-40 cover auth. No logout.
      // So I will just clear token.
      return Promise.resolve();
    },
    onSettled: () => {
      clearAuthToken();
      auth.logout();
      queryClient.clear();
      navigate("/login");
    },
  });
};
