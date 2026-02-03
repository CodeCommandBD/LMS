import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAssignment } from "../../lib/api";

/**
 * Custom hook to create an assignment
 * @returns {Object} Mutation result
 */
export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssignment,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Assignment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create assignment";
      toast.error(errorMessage);
    },
  });
};
