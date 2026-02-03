import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateQuiz } from "../../lib/api";

/**
 * Custom hook to update a quiz
 * @returns {Object} Mutation result
 */
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: (data) => {
      toast.success(data.message || "Quiz updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["quiz", data.data?._id] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update quiz";
      toast.error(errorMessage);
    },
  });
};
