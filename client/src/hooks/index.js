// Export all custom hooks from a single file for easy imports

// API hooks
export * from "./useApi";

// Redux hooks
export { useSearch, useAuth } from "./useRedux";

// Authentication hook
export { useAuthentication } from "./useAuth";

// Form hooks
export { useForm, useSimpleForm } from "./useFormHelper";

// Navigation hooks
export { useNavigate, useRouteParams, useQueryString } from "./useNavigation";

// Utility hooks
export {
  useLocalStorage,
  useDebounce,
  useAsync,
  useToggle,
  useCopyToClipboard,
  useWindowSize,
  useMediaQuery,
  useBreakpoint,
} from "./useUtils";

// Search hooks (TanStack Query)
export {
  useSearchCourses,
  usePopularCourses,
  useSearchSuggestions,
  useCategories,
  useTrendingSearches,
} from "./useSearch";
