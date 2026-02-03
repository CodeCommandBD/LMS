import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { unenrollCourse } from "../../lib/api";

/**
 * Custom hook to unenroll from a course
 * @returns {Object} Mutation result
 */
export const useUnenroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unenrollCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Unenrolled successfully!");
      // Invalidate enrollments list and courses
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to unenroll";
      toast.error(errorMessage);
    },
  });
};
