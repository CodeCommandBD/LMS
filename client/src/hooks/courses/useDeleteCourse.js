import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCourse } from "../../lib/api";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to delete a course
 * @returns {Object} Mutation result
 */
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully!");

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });

      navigate("/educator/courses");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete course";
      toast.error(errorMessage);
    },
  });
};
