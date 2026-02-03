import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCategory } from "../../lib/api";

/**
 * Custom hook to delete category (admin)
 * @returns {Object} Mutation result
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      toast.success(data.message || "Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category";
      toast.error(errorMessage);
    },
  });
};
