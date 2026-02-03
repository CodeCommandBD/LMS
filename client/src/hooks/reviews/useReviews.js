import { useQuery } from "@tanstack/react-query";
import { getCourseReviews } from "../../lib/api";

/**
 * Custom hook to fetch course reviews
 * @param {string} courseId - Course ID
 * @returns {Object} Query result
 */
export const useReviews = (courseId) => {
  return useQuery({
    queryKey: ["reviews", courseId],
    queryFn: () => getCourseReviews(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });
};
