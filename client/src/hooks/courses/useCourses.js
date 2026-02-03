import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCourses } from "../../lib/api";

/**
 * Custom hook to fetch courses with infinite scroll or pagination
 * @param {Object} params - Query parameters (page, limit, search, etc.)
 * @param {boolean} infinite - Whether to use infinite query
 * @returns {Object} Query result
 */
export const useCourses = (params = {}, infinite = false) => {
  if (infinite) {
    return useInfiniteQuery({
      queryKey: ["courses", "infinite", params],
      queryFn: ({ pageParam = 1 }) =>
        getCourses({ ...params, page: pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage.data.page < lastPage.data.totalPages) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000,
    });
  }

  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
    staleTime: 5 * 60 * 1000,
  });
};
