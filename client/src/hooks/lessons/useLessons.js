import { useQuery } from "@tanstack/react-query";
import { getLessonsByCourse } from "../../lib/api";

/**
 * Custom hook to fetch lessons by course ID
 * @param {string} courseId - Course ID
 * @returns {Object} Query result
 */
export const useLessons = (courseId) => {
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getLessonsByCourse(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });
};
