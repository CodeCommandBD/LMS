import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

/**
 * Custom hook to easily access and update Redux state
 * @param {string} sliceName - Name of the Redux slice
 * @param {object} actions - Actions from the slice
 */
export const useRedux = (sliceName, actions = {}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[sliceName]);

  // Create dispatchers for all actions
  const dispatchers = {};
  Object.keys(actions).forEach((actionName) => {
    dispatchers[actionName] = useCallback(
      (payload) => dispatch(actions[actionName](payload)),
      [dispatch],
    );
  });

  return [state, dispatchers];
};

/**
 * Hook for search state management
 */
import * as searchActions from "../store/slices/searchSlice";

export const useSearch = () => {
  const [state, actions] = useRedux("search", searchActions);

  return {
    // State
    query: state.searchQuery,
    history: state.searchHistory,
    filters: state.filters,

    // Actions
    setQuery: actions.setSearchQuery,
    clearQuery: actions.clearSearchQuery,
    setFilters: actions.setFilters,
    clearFilters: actions.clearFilters,
    clearHistory: actions.clearSearchHistory,
    removeFromHistory: actions.removeFromHistory,
  };
};

/**
 * Hook for auth state management
 */
import * as authActions from "../store/slices/authSlice";

export const useAuth = () => {
  const [state, actions] = useRedux("auth", authActions);

  return {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    role: state.role,
    loading: state.loading,
    error: state.error,

    // Actions
    loginStart: actions.loginStart,
    loginSuccess: actions.loginSuccess,
    loginFailure: actions.loginFailure,
    logout: actions.logout,
    setUser: actions.setUser,
  };
};
