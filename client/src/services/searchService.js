import axiosInstance from "../lib/axios";

/**
 * Search API Service
 * All search-related API calls
 */

/**
 * Fetch search results from the backend
 * @param {string} query - Search query string
 * @param {object} filters - Optional filters (category, level, price)
 * @returns {Promise} - Search results
 */
export const fetchSearchResults = async (query, filters = {}) => {
  const params = new URLSearchParams({
    q: query,
    ...filters,
  });

  const { data } = await axiosInstance.get(`/courses/search?${params}`);
  return data;
};

/**
 * Fetch popular/trending courses
 * @returns {Promise} - Popular courses
 */
export const fetchPopularCourses = async () => {
  const { data } = await axiosInstance.get(`/courses/popular`);
  return data;
};

/**
 * Fetch search suggestions/autocomplete
 * @param {string} query - Search query
 * @returns {Promise} - Search suggestions
 */
export const fetchSearchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];

  const { data } = await axiosInstance.get(`/courses/suggestions`, {
    params: { q: query },
  });
  return data;
};

/**
 * Fetch course categories
 * @returns {Promise} - Course categories
 */
export const fetchCategories = async () => {
  const { data } = await axiosInstance.get(`/courses/categories`);
  return data;
};

/**
 * Fetch trending searches
 * @returns {Promise} - Trending search terms
 */
export const fetchTrendingSearches = async () => {
  const { data } = await axiosInstance.get(`/search/trending`);
  return data;
};

export default {
  fetchSearchResults,
  fetchPopularCourses,
  fetchSearchSuggestions,
  fetchCategories,
  fetchTrendingSearches,
};
