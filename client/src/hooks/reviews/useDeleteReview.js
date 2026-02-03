import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteReview } from "../../lib/api";

/**
 * Custom hook to delete a review
 * @returns {Object} Mutation result
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      toast.success(data.message || "Review deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
    },
  });
};
