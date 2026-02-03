import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../lib/api";

/**
 * Custom hook to delete a quiz
 * @returns {Object} Mutation result
 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (data) => {
      toast.success(data.message || "Quiz deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete quiz";
      toast.error(errorMessage);
    },
  });
};
