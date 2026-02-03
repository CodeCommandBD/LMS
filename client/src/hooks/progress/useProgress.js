import { useQuery } from "@tanstack/react-query";
import { getCourseProgress } from "../../lib/api";

/**
 * Custom hook to fetch course progress
 * @param {string} courseId - Course ID
 * @returns {Object} Query result
 */
export const useProgress = (courseId) => {
  return useQuery({
    queryKey: ["progress", courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
    staleTime: 10 * 1000, // Short stale time for real-time feel on return
  });
};
