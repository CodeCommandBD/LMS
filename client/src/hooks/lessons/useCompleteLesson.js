import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { completeLesson } from "../../lib/api";

/**
 * Custom hook to mark a lesson as complete
 * @returns {Object} Mutation result
 */
export const useCompleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeLesson,
    onSuccess: (data, variables) => {
      // variables is lessonId directly if passed as argument to mutate
      // Should check how mutate is called. Assuming mutate(lessonId)

      // Optimistic updates could be implemented here but for now just invalidate
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      // Quiet fail or optional toast, often completion is background mostly
      console.error("Failed to mark lesson complete", error);
    },
  });
};
