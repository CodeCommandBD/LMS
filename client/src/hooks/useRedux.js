import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "redux";

/**
 * Custom hook to easily access and update Redux state
 * @param {string} sliceName - Name of the Redux slice
 * @param {object} actions - Actions from the slice
 */
export const useRedux = (sliceName, actions = {}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[sliceName]);

  const dispatchers = useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch],
  );

  return [state, dispatchers];
};

/**
 * Hook for search state management
 */
import * as searchActions from "../store/slices/searchSlice";

export const useSearch = () => {
  const [state, actions] = useRedux("search", searchActions);

  return {
    ...state, // state er shob props (searchQuery, history, filters etc) directly pawa jabe
    ...actions, // actions (setSearchQuery, clearSearchQuery etc) directly pawa jabe
    query: state.searchQuery, // legacy support ba simplify korar jonno
    setQuery: actions.setSearchQuery,
  };
};

/**
 * Hook for auth state management
 */
import * as authActions from "../store/slices/authSlice";

export const useAuth = () => {
  const [state, actions] = useRedux("auth", authActions);

  return {
    ...state,
    ...actions,
  };
};
