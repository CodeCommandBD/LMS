import { useQuery } from "@tanstack/react-query";
import { getMyEnrollments } from "../../lib/api";

/**
 * Custom hook to fetch user's enrolled courses
 * @returns {Object} Query result
 */
export const useEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getMyEnrollments,
    staleTime: 5 * 60 * 1000,
  });
};
