import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../useRedux";
import { clearAuthToken } from "../../lib/axios";
import * as api from "../../lib/api";

/**
 * Hook for Deleting Account
 */
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: api.deleteAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Account deleted successfully!");
      clearAuthToken();
      auth.logout();
      queryClient.clear();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account");
    },
  });
};
