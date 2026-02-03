import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../lib/api";

/**
 * Custom hook to fetch course details
 * @param {string} id - Course ID
 * @returns {Object} Query result
 */
export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
