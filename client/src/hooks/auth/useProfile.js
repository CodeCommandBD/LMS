import { useQuery } from "@tanstack/react-query";
import * as api from "../../lib/api";

/**
 * Hook to fetch user profile data
 */
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: api.getProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
