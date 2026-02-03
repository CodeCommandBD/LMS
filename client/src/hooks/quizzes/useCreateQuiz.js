import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createQuiz } from "../../lib/api";

/**
 * Custom hook to create a quiz
 * @returns {Object} Mutation result
 */
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Quiz created successfully!");

      // Invalidate lessons list for the course (assuming quiz is attached to lesson or unit)
      // We might not know the course ID here directly unless passed back or part of invalidation logic
      // But typically we invalidate the lesson to show the new quiz
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create quiz";
      toast.error(errorMessage);
    },
  });
};
