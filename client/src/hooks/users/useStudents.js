import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../lib/api";

/**
 * Custom hook to fetch students (instructor)
 * @returns {Object} Query result
 */
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 5 * 60 * 1000,
  });
};
