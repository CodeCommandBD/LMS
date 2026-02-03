import { useQuery } from "@tanstack/react-query";
import { getQuizResults } from "../../lib/api";

/**
 * Custom hook to fetch quiz results
 * @param {string} id - Quiz ID
 * @returns {Object} Query result
 */
export const useQuizResults = (id) => {
  return useQuery({
    queryKey: ["quiz-results", id],
    queryFn: () => getQuizResults(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
