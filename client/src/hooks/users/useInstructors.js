import { useQuery } from "@tanstack/react-query";
import { getInstructors } from "../../lib/api";

/**
 * Custom hook to fetch instructors
 * @returns {Object} Query result
 */
export const useInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: getInstructors,
    staleTime: 5 * 60 * 1000,
  });
};
