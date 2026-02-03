import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../lib/api";

/**
 * Custom hook to fetch quiz by ID
 * @param {string} id - Quiz ID
 * @returns {Object} Query result
 */
export const useQuiz = (id) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuizById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
