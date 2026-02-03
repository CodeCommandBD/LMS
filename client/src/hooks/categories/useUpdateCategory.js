import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCategory } from "../../lib/api";

/**
 * Custom hook to update category (admin)
 * @returns {Object} Mutation result
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      toast.success(data.message || "Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update category";
      toast.error(errorMessage);
    },
  });
};
