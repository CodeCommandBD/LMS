import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as api from "../../lib/api";

/**
 * Hook for Changing Password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: api.changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};
