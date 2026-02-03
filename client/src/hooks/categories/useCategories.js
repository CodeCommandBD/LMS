import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../lib/api";

/**
 * Custom hook to fetch categories
 * @returns {Object} Query result
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000, // 1 hour (categories rarely change)
  });
};
