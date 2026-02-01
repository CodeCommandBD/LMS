import axiosInstance, { setAuthToken, clearAuthToken } from "../lib/axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../store/slices/authSlice";

/**
 * Authentication API Service
 */
export const authService = {
  // Login
  login: async (credentials) => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    return data;
  },

  // Register
  register: async (userData) => {
    const { data } = await axiosInstance.post("/auth/register", userData);
    return data;
  },

  // Logout
  logout: async () => {
    const { data } = await axiosInstance.post("/auth/logout");
    clearAuthToken();
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const { data } = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const { data } = await axiosInstance.put("/auth/profile", profileData);
    return data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const { data } = await axiosInstance.put("/auth/password", passwordData);
    return data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const { data } = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const { data } = await axiosInstance.post("/auth/reset-password", {
      token,
      password: newPassword,
    });
    return data;
  },
};

/**
 * Course API Service
 */
export const courseService = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const { data } = await axiosInstance.get("/courses", { params });
    return data;
  },

  // Get course by ID
  getCourseById: async (id) => {
    const { data } = await axiosInstance.get(`/courses/${id}`);
    return data;
  },

  // Create course (educator only)
  createCourse: async (courseData) => {
    const { data } = await axiosInstance.post("/courses", courseData);
    return data;
  },

  // Update course
  updateCourse: async (id, courseData) => {
    const { data } = await axiosInstance.put(`/courses/${id}`, courseData);
    return data;
  },

  // Delete course
  deleteCourse: async (id) => {
    const { data } = await axiosInstance.delete(`/courses/${id}`);
    return data;
  },

  // Enroll in course
  enrollCourse: async (courseId) => {
    const { data } = await axiosInstance.post(`/courses/${courseId}/enroll`);
    return data;
  },

  // Get enrolled courses
  getEnrolledCourses: async () => {
    const { data } = await axiosInstance.get("/courses/enrolled");
    return data;
  },

  // Upload course thumbnail
  uploadThumbnail: async (courseId, file) => {
    const formData = new FormData();
    formData.append("thumbnail", file);
    const { data } = await axiosInstance.post(
      `/courses/${courseId}/thumbnail`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },
};

/**
 * Lesson API Service
 */
export const lessonService = {
  // Get lessons by course
  getLessonsByCourse: async (courseId) => {
    const { data } = await axiosInstance.get(`/courses/${courseId}/lessons`);
    return data;
  },

  // Get lesson by ID
  getLessonById: async (courseId, lessonId) => {
    const { data } = await axiosInstance.get(
      `/courses/${courseId}/lessons/${lessonId}`,
    );
    return data;
  },

  // Create lesson
  createLesson: async (courseId, lessonData) => {
    const { data } = await axiosInstance.post(
      `/courses/${courseId}/lessons`,
      lessonData,
    );
    return data;
  },

  // Update lesson
  updateLesson: async (courseId, lessonId, lessonData) => {
    const { data } = await axiosInstance.put(
      `/courses/${courseId}/lessons/${lessonId}`,
      lessonData,
    );
    return data;
  },

  // Delete lesson
  deleteLesson: async (courseId, lessonId) => {
    const { data } = await axiosInstance.delete(
      `/courses/${courseId}/lessons/${lessonId}`,
    );
    return data;
  },

  // Mark lesson as completed
  markComplete: async (courseId, lessonId) => {
    const { data } = await axiosInstance.post(
      `/courses/${courseId}/lessons/${lessonId}/complete`,
    );
    return data;
  },
};

/**
 * Progress API Service
 */
export const progressService = {
  // Get course progress
  getCourseProgress: async (courseId) => {
    const { data } = await axiosInstance.get(`/progress/course/${courseId}`);
    return data;
  },

  // Update progress
  updateProgress: async (courseId, lessonId, progressData) => {
    const { data } = await axiosInstance.put(
      `/progress/course/${courseId}/lesson/${lessonId}`,
      progressData,
    );
    return data;
  },

  // Get overall progress
  getOverallProgress: async () => {
    const { data } = await axiosInstance.get("/progress");
    return data;
  },
};

/**
 * Review/Rating API Service
 */
export const reviewService = {
  // Get course reviews
  getCourseReviews: async (courseId, params = {}) => {
    const { data } = await axiosInstance.get(`/courses/${courseId}/reviews`, {
      params,
    });
    return data;
  },

  // Create review
  createReview: async (courseId, reviewData) => {
    const { data } = await axiosInstance.post(
      `/courses/${courseId}/reviews`,
      reviewData,
    );
    return data;
  },

  // Update review
  updateReview: async (courseId, reviewId, reviewData) => {
    const { data } = await axiosInstance.put(
      `/courses/${courseId}/reviews/${reviewId}`,
      reviewData,
    );
    return data;
  },

  // Delete review
  deleteReview: async (courseId, reviewId) => {
    const { data } = await axiosInstance.delete(
      `/courses/${courseId}/reviews/${reviewId}`,
    );
    return data;
  },
};

export default {
  auth: authService,
  course: courseService,
  lesson: lessonService,
  progress: progressService,
  review: reviewService,
};
