import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmPayment } from "../../lib/api";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to confirm payment
 * @returns {Object} Mutation result
 */
export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: (data) => {
      toast.success(data.message || "Payment successful! Enrolled in course.");
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });

      // Navigate to course or student dashboard
      navigate("/my-courses");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Payment confirmation failed";
      toast.error(errorMessage);
    },
  });
};
