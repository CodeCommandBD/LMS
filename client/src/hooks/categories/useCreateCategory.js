import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategory } from "../../lib/api";

/**
 * Custom hook to create category (admin)
 * @returns {Object} Mutation result
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success(data.message || "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      toast.error(errorMessage);
    },
  });
};
