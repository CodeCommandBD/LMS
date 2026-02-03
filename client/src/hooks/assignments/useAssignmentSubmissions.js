import { useQuery } from "@tanstack/react-query";
import { getAssignmentSubmissions } from "../../lib/api";

/**
 * Custom hook to fetch assignment submissions (instructor only)
 * @param {string} id - Assignment ID
 * @returns {Object} Query result
 */
export const useAssignmentSubmissions = (id) => {
  return useQuery({
    queryKey: ["assignment-submissions", id],
    queryFn: () => getAssignmentSubmissions(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
