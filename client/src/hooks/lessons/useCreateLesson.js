import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createLesson } from "../../lib/api";

/**
 * Custom hook to create a lesson
 * @returns {Object} Mutation result
 */
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Lesson created successfully!");

      // Invalidate lessons list for the course
      queryClient.invalidateQueries({
        queryKey: ["lessons", variables.courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId],
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create lesson";
      toast.error(errorMessage);
    },
  });
};
