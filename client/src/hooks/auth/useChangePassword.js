import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../../lib/api";

/**
 * Custom hook to change password
 * @returns {Object} Mutation result
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Password change failed";
      toast.error(errorMessage);
    },
  });
};
