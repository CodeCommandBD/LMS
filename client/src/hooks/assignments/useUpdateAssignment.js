import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAssignment } from "../../lib/api";

/**
 * Custom hook to update an assignment
 * @returns {Object} Mutation result
 */
export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssignment,
    onSuccess: (data) => {
      toast.success(data.message || "Assignment updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["assignment", data.data?._id],
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update assignment";
      toast.error(errorMessage);
    },
  });
};
