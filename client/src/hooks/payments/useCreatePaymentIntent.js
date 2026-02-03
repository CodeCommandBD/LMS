import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPaymentIntent } from "../../lib/api";

/**
 * Custom hook to create payment intent
 * @returns {Object} Mutation result
 */
export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: createPaymentIntent,
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to initiate payment";
      toast.error(errorMessage);
    },
  });
};
