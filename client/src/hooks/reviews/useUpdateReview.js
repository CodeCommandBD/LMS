import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateReview } from "../../lib/api";

/**
 * Custom hook to update a review
 * @returns {Object} Mutation result
 */
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSuccess: (data) => {
      toast.success(data.message || "Review updated successfully!");
      // We need courseId to invalidate properly. Assume it's returned or we just invalidate all reviews if key strategy is simple
      // Ideally backend returns courseId in data or we pass it in variables context if needed
      // For now, invalidate broad reviews if necessary or specific
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update review";
      toast.error(errorMessage);
    },
  });
};
