import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory } from "../../lib/api";

/**
 * Custom hook to fetch payment history
 * @returns {Object} Query result
 */
export const usePaymentHistory = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentHistory,
    staleTime: 5 * 60 * 1000,
  });
};
