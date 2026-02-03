import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteLesson } from "../../lib/api";

/**
 * Custom hook to delete a lesson
 * @returns {Object} Mutation result
 */
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully!");

      // Invalidate lessons list
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete lesson";
      toast.error(errorMessage);
    },
  });
};
