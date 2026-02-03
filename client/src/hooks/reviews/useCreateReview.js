import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "../../lib/api";

/**
 * Custom hook to create a review
 * @returns {Object} Mutation result
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Review submitted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId],
      }); // Refresh average rating
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
    },
  });
};
