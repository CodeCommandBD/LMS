import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { enrollCourse } from "../../lib/api";

/**
 * Custom hook to enroll in a course
 * @returns {Object} Mutation result
 */
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollCourse,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Enrolled successfully!");

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Enrollment failed";
      toast.error(errorMessage);
    },
  });
};
