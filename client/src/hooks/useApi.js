import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

/**
 * Custom hook for fetching data with automatic error handling
 * @param {string} queryKey - Unique key for the query
 * @param {Function} queryFn - Function to fetch data
 * @param {object} options - Additional options
 */
export const useFetch = (queryKey, queryFn, options = {}) => {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    onError: (error) => {
      console.error(`Error fetching ${queryKey}:`, error.message);
    },
    ...options,
  });
};

/**
 * Custom hook for mutations with automatic success/error handling
 * @param {Function} mutationFn - Function to perform mutation
 * @param {object} options - Additional options
 */
export const useMutate = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        queryClient.invalidateQueries(options.invalidateQueries);
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...options,
  });
};

/**
 * Hook for fetching all courses
 */
export const useCourses = (params = {}) => {
  return useFetch(["courses", params], () => api.course.getAllCourses(params), {
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for fetching single course
 */
export const useCourse = (id) => {
  return useFetch(["course", id], () => api.course.getCourseById(id), {
    enabled: !!id,
  });
};

/**
 * Hook for enrolling in a course
 */
export const useEnrollCourse = () => {
  return useMutate((courseId) => api.course.enrollCourse(courseId), {
    invalidateQueries: ["courses", "enrolled-courses"],
    onSuccess: () => {
      console.log("✅ Enrolled successfully!");
    },
  });
};

/**
 * Hook for fetching enrolled courses
 */
export const useEnrolledCourses = () => {
  return useFetch("enrolled-courses", () => api.course.getEnrolledCourses());
};

/**
 * Hook for creating a course
 */
export const useCreateCourse = () => {
  return useMutate((courseData) => api.course.createCourse(courseData), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course created successfully!");
    },
  });
};

/**
 * Hook for updating a course
 */
export const useUpdateCourse = () => {
  return useMutate(({ id, data }) => api.course.updateCourse(id, data), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course updated successfully!");
    },
  });
};

/**
 * Hook for deleting a course
 */
export const useDeleteCourse = () => {
  return useMutate((id) => api.course.deleteCourse(id), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course deleted successfully!");
    },
  });
};
