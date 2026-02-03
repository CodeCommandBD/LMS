import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCourse } from "../../lib/api";

/**
 * Custom hook to update a course
 * @returns {Object} Mutation result
 */
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Course updated successfully!");

      // Invalidate specific course and lists
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update course";
      toast.error(errorMessage);
    },
  });
};
