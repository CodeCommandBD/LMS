import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../lib/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { useEffect } from "react";

/**
 * Custom hook to fetch user profile
 * @returns {Object} Query result
 */
export const useProfile = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync with Redux when data changes
  useEffect(() => {
    if (query.data && query.data.user) {
      // dispatch(setUser({ user: query.data.user, role: query.data.user.role }));
    }
  }, [query.data, dispatch]);

  return query;
};
