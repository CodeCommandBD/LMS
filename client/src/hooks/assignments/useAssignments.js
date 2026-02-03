import { useQuery } from "@tanstack/react-query";
import { getAssignmentById } from "../../lib/api";

/**
 * Custom hook to fetch assignment by ID
 * @param {string} id - Assignment ID
 * @returns {Object} Query result
 */
export const useAssignment = (id) => {
  return useQuery({
    queryKey: ["assignment", id],
    queryFn: () => getAssignmentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
