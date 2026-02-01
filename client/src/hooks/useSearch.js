import { useQuery } from "@tanstack/react-query";
import * as searchService from "../services/searchService";

/**
 * TanStack Query Hooks for Search
 * These hooks use the search service for API calls
 */

/**
 * Custom hook for searching courses using TanStack Query
 * @param {string} searchQuery - The search query
 * @param {object} filters - Optional filters
 * @param {object} options - TanStack Query options
 */
export const useSearchCourses = (searchQuery, filters = {}, options = {}) => {
  return useQuery({
    queryKey: ["courses", "search", searchQuery, filters],
    queryFn: () => searchService.fetchSearchResults(searchQuery, filters),
    enabled: !!searchQuery && searchQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    ...options,
  });
};

/**
 * Hook for fetching popular/trending courses
 * @param {object} options - TanStack Query options
 */
export const usePopularCourses = (options = {}) => {
  return useQuery({
    queryKey: ["courses", "popular"],
    queryFn: searchService.fetchPopularCourses,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

/**
 * Hook for fetching search suggestions/autocomplete
 * @param {string} query - Search query
 * @param {object} options - TanStack Query options
 */
export const useSearchSuggestions = (query, options = {}) => {
  return useQuery({
    queryKey: ["courses", "suggestions", query],
    queryFn: () => searchService.fetchSearchSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

/**
 * Hook for fetching course categories
 * @param {object} options - TanStack Query options
 */
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: ["courses", "categories"],
    queryFn: searchService.fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
};

/**
 * Hook for fetching trending searches
 * @param {object} options - TanStack Query options
 */
export const useTrendingSearches = (options = {}) => {
  return useQuery({
    queryKey: ["search", "trending"],
    queryFn: searchService.fetchTrendingSearches,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export default {
  useSearchCourses,
  usePopularCourses,
  useSearchSuggestions,
  useCategories,
  useTrendingSearches,
};
