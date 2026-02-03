import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { submitQuiz } from "../../lib/api";

/**
 * Custom hook to submit a quiz
 * @returns {Object} Mutation result
 */
export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: (data, variables) => {
      toast.success(
        `Quiz submitted! Score: ${data.data.score}/${data.data.totalPoints}`,
      );
      queryClient.invalidateQueries({
        queryKey: ["quiz-results", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to submit quiz";
      toast.error(errorMessage);
    },
  });
};
