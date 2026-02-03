import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCourse } from "../../lib/api";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to create a new course
 * @returns {Object} Mutation result
 */
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course created successfully!");

      // Invalidate courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });

      // Redirect to course details or edit page
      if (data.data?._id) {
        navigate(`/educator/course/${data.data._id}`);
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create course";
      toast.error(errorMessage);
    },
  });
};
