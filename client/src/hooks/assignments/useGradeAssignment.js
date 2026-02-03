import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { gradeAssignment } from "../../lib/api";

/**
 * Custom hook to grade an assignment submission (instructor only)
 * @returns {Object} Mutation result
 */
export const useGradeAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gradeAssignment,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Grade submitted successfully!");

      // we need to know the assignment ID to invalidate submissions list properly,
      // usually handled by invalidating all submissions for the assignment or managing key structure
      // For now, assuming we invalidate a broad key or pass ID
      queryClient.invalidateQueries({ queryKey: ["assignment-submissions"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to grade assignment";
      toast.error(errorMessage);
    },
  });
};
