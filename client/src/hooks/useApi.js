import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";


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


export const useCourses = (params = {}) => {
  return useFetch(["courses", params], () => api.course.getAllCourses(params), {
    staleTime: 5 * 60 * 1000,
  });
};


export const useCourse = (id) => {
  return useFetch(["course", id], () => api.course.getCourseById(id), {
    enabled: !!id,
  });
};


export const useEnrollCourse = () => {
  return useMutate((courseId) => api.course.enrollCourse(courseId), {
    invalidateQueries: ["courses", "enrolled-courses"],
    onSuccess: () => {
      console.log("✅ Enrolled successfully!");
    },
  });
};


export const useEnrolledCourses = () => {
  return useFetch("enrolled-courses", () => api.course.getEnrolledCourses());
};


export const useCreateCourse = () => {
  return useMutate((courseData) => api.course.createCourse(courseData), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course created successfully!");
    },
  });
};


export const useUpdateCourse = () => {
  return useMutate(({ id, data }) => api.course.updateCourse(id, data), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course updated successfully!");
    },
  });
};


export const useDeleteCourse = () => {
  return useMutate((id) => api.course.deleteCourse(id), {
    invalidateQueries: ["courses"],
    onSuccess: () => {
      console.log("✅ Course deleted successfully!");
    },
  });
};
