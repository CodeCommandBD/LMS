import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAssignment } from "../../lib/api";

/**
 * Custom hook to delete an assignment
 * @returns {Object} Mutation result
 */
export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: (data) => {
      toast.success(data.message || "Assignment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete assignment";
      toast.error(errorMessage);
    },
  });
};
