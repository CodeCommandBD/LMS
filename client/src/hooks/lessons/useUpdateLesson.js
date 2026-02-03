import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateLesson } from "../../lib/api";

/**
 * Custom hook to update a lesson
 * @returns {Object} Mutation result
 */
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLesson,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully!");

      // Invalidate lessons and specific lesson
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", data.data?._id] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update lesson";
      toast.error(errorMessage);
    },
  });
};
