import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../lib/api";

/**
 * Custom hook to fetch all users (admin)
 * @param {Object} params - Query params (page, limit, search)
 * @returns {Object} Query result
 */
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
    staleTime: 5 * 60 * 1000,
  });
};
