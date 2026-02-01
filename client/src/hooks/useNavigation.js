import {
  useNavigate as useRouterNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useCallback } from "react";

/**
 * Enhanced navigation hook with common patterns
 */
export const useNavigate = () => {
  const navigate = useRouterNavigate();
  const location = useLocation();

  return {
    // Basic navigation
    go: useCallback((path, options) => navigate(path, options), [navigate]),

    // Go back
    back: useCallback(() => navigate(-1), [navigate]),

    // Go forward
    forward: useCallback(() => navigate(1), [navigate]),

    // Replace current route
    replace: useCallback(
      (path) => navigate(path, { replace: true }),
      [navigate],
    ),

    // Navigate with state
    goWithState: useCallback(
      (path, state) => navigate(path, { state }),
      [navigate],
    ),

    // Reload current page
    reload: useCallback(() => navigate(0), [navigate]),

    // Current location
    location,

    // Check if on specific path
    isCurrentPath: useCallback(
      (path) => location.pathname === path,
      [location.pathname],
    ),

    // Get query params
    getQueryParam: useCallback(
      (key) => {
        const params = new URLSearchParams(location.search);
        return params.get(key);
      },
      [location.search],
    ),
  };
};

/**
 * Hook for route parameters with type conversion
 */
export const useRouteParams = () => {
  const params = useParams();

  return {
    params,

    // Get param as number
    getNumber: (key) => {
      const value = params[key];
      return value ? Number(value) : null;
    },

    // Get param as boolean
    getBoolean: (key) => {
      const value = params[key];
      return value === "true";
    },

    // Get param as array (comma-separated)
    getArray: (key) => {
      const value = params[key];
      return value ? value.split(",") : [];
    },
  };
};

/**
 * Hook for query string management
 */
export const useQueryString = () => {
  const location = useLocation();
  const navigate = useRouterNavigate();

  const searchParams = new URLSearchParams(location.search);

  return {
    // Get query param
    get: (key) => searchParams.get(key),

    // Get all params as object
    getAll: () => Object.fromEntries(searchParams.entries()),

    // Set query param
    set: (key, value) => {
      searchParams.set(key, value);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    },

    // Set multiple params
    setMultiple: (params) => {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    },

    // Remove param
    remove: (key) => {
      searchParams.delete(key);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    },

    // Clear all params
    clear: () => {
      navigate(location.pathname, { replace: true });
    },
  };
};
