import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { submitAssignment } from "../../lib/api";

/**
 * Custom hook to submit an assignment
 * @returns {Object} Mutation result
 */
export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAssignment,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Assignment submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["assignment", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to submit assignment";
      toast.error(errorMessage);
    },
  });
};
