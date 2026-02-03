import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../../lib/api";

/**
 * Custom hook to delete user (admin)
 * @returns {Object} Mutation result
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message || "User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    },
  });
};
