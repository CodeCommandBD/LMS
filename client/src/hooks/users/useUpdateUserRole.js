import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserRole } from "../../lib/api";

/**
 * Custom hook to update user role (admin)
 * @returns {Object} Mutation result
 */
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      toast.success(data.message || "User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update role";
      toast.error(errorMessage);
    },
  });
};
