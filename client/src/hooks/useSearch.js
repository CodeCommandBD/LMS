import { useQuery } from "@tanstack/react-query";
import * as api from "../lib/api";
import { useSearch as useSearchState } from "./useRedux";
import { useEffect } from "react";

/**
 * Unified Search Hook
 * Combines Redux State (UI) + TanStack Query (Data Fetching)
 */
export const useCourseSearch = (options = {}) => {
  // 1. Get Search State from Redux
  const { query, filters, setQuery, setFilters } = useSearchState();

  // 2. Fetch Data using TanStack Query
  const searchResult = useQuery({
    queryKey: ["courses", "search", query, filters],
    queryFn: () => api.fetchSearchResults(query, filters),
    enabled: !!query, // Only fetch if there is a query
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Show previous data while fetching new
    ...options,
  });

  return {
    // Redux State Access
    query,
    filters,
    setQuery,
    setFilters,

    // Query Result Access
    results: searchResult.data || [],
    isLoading: searchResult.isLoading,
    isError: searchResult.isError,
    error: searchResult.error,
    refetch: searchResult.refetch,
    isFetching: searchResult.isFetching,
  };
};

/**
 * Hook for fetching popular/trending courses
 */
export const usePopularCourses = (options = {}) => {
  return useQuery({
    queryKey: ["courses", "popular"],
    queryFn: api.fetchPopularCourses,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook for fetching search suggestions
 */
export const useSearchSuggestions = (query, options = {}) => {
  return useQuery({
    queryKey: ["courses", "suggestions", query],
    queryFn: () => api.fetchSearchSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook for fetching categories
 */
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: ["courses", "categories"],
    queryFn: api.getCategories,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook for fetching trending searches
 */
export const useTrendingSearches = (options = {}) => {
  return useQuery({
    queryKey: ["search", "trending"],
    queryFn: api.fetchTrendingSearches,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export default {
  useCourseSearch,
  usePopularCourses,
  useSearchSuggestions,
  useCategories,
  useTrendingSearches,
};
