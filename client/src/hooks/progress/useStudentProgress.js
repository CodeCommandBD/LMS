import { useQuery } from "@tanstack/react-query";
import { getStudentProgress } from "../../lib/api";

/**
 * Custom hook to fetch student progress (instructor only)
 * @param {string} studentId - Student ID
 * @returns {Object} Query result
 */
export const useStudentProgress = (studentId) => {
  return useQuery({
    queryKey: ["student-progress", studentId],
    queryFn: () => getStudentProgress(studentId),
    enabled: !!studentId,
    staleTime: 1 * 60 * 1000,
  });
};
