import axios from "./axios";

// ============================================
// AUTH API CALLS
// ============================================

export const loginUser = async (credentials) => {
  const response = await axios.post("/api/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post("/api/auth/register", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get("/api/auth/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const isFormData = profileData instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.put("/api/auth/profile", profileData, config);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axios.patch("/api/auth/change-password", passwordData);
  return response.data;
};

export const deleteAccount = async (passwordData) => {
  const response = await axios.delete("/api/auth/account", {
    data: passwordData,
  });
  return response.data;
};

// ============================================
// COURSE API CALLS
// ============================================

export const getCourses = async (params = {}) => {
  const response = await axios.get("/api/courses", { params });
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axios.get(`/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const isFormData = courseData instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.post("/api/courses", courseData, config);
  return response.data;
};

export const updateCourse = async ({ id, data }) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.put(`/api/courses/${id}`, data, config);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`/api/courses/${id}`);
  return response.data;
};

export const getCourseStudents = async (id) => {
  const response = await axios.get(`/api/courses/${id}/students`);
  return response.data;
};

// ============================================
// LESSON API CALLS
// ============================================

export const getLessonsByCourse = async (courseId) => {
  const response = await axios.get(`/api/courses/${courseId}/lessons`);
  return response.data;
};

export const getLessonById = async (id) => {
  const response = await axios.get(`/api/lessons/${id}`);
  return response.data;
};

export const createLesson = async ({ courseId, data }) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.post(
    `/api/courses/${courseId}/lessons`,
    data,
    config,
  );
  return response.data;
};

export const updateLesson = async ({ id, data }) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.put(`/api/lessons/${id}`, data, config);
  return response.data;
};

export const deleteLesson = async (id) => {
  const response = await axios.delete(`/api/lessons/${id}`);
  return response.data;
};

export const completeLesson = async (id) => {
  const response = await axios.patch(`/api/lessons/${id}/complete`);
  return response.data;
};

// ============================================
// QUIZ API CALLS
// ============================================

export const getQuizById = async (id) => {
  const response = await axios.get(`/api/quizzes/${id}`);
  return response.data;
};

export const createQuiz = async ({ lessonId, data }) => {
  const response = await axios.post(`/api/lessons/${lessonId}/quizzes`, data);
  return response.data;
};

export const updateQuiz = async ({ id, data }) => {
  const response = await axios.put(`/api/quizzes/${id}`, data);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await axios.delete(`/api/quizzes/${id}`);
  return response.data;
};

export const submitQuiz = async ({ id, answers }) => {
  const response = await axios.post(`/api/quizzes/${id}/submit`, { answers });
  return response.data;
};

export const getQuizResults = async (id) => {
  const response = await axios.get(`/api/quizzes/${id}/results`);
  return response.data;
};

// ============================================
// ASSIGNMENT API CALLS
// ============================================

export const getAssignmentById = async (id) => {
  const response = await axios.get(`/api/assignments/${id}`);
  return response.data;
};

export const createAssignment = async ({ lessonId, data }) => {
  const response = await axios.post(
    `/api/lessons/${lessonId}/assignments`,
    data,
  );
  return response.data;
};

export const updateAssignment = async ({ id, data }) => {
  const response = await axios.put(`/api/assignments/${id}`, data);
  return response.data;
};

export const deleteAssignment = async (id) => {
  const response = await axios.delete(`/api/assignments/${id}`);
  return response.data;
};

export const submitAssignment = async ({ id, data }) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await axios.post(
    `/api/assignments/${id}/submit`,
    data,
    config,
  );
  return response.data;
};

export const getAssignmentSubmissions = async (id) => {
  const response = await axios.get(`/api/assignments/${id}/submissions`);
  return response.data;
};

export const gradeAssignment = async ({ submissionId, data }) => {
  const response = await axios.patch(
    `/api/assignments/submissions/${submissionId}/grade`,
    data,
  );
  return response.data;
};

// ============================================
// ENROLLMENT API CALLS
// ============================================

export const enrollCourse = async (courseId) => {
  const response = await axios.post(`/api/courses/${courseId}/enroll`);
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await axios.get("/api/enrollments/my-courses");
  return response.data;
};

export const unenrollCourse = async (enrollmentId) => {
  const response = await axios.delete(`/api/enrollments/${enrollmentId}`);
  return response.data;
};

// ============================================
// PROGRESS API CALLS
// ============================================

export const getCourseProgress = async (courseId) => {
  const response = await axios.get(`/api/courses/${courseId}/progress`);
  return response.data;
};

export const getStudentProgress = async (studentId) => {
  const response = await axios.get(`/api/students/${studentId}/progress`);
  return response.data;
};

// ============================================
// REVIEW API CALLS
// ============================================

export const getCourseReviews = async (courseId) => {
  const response = await axios.get(`/api/courses/${courseId}/reviews`);
  return response.data;
};

export const createReview = async ({ courseId, data }) => {
  const response = await axios.post(`/api/courses/${courseId}/reviews`, data);
  return response.data;
};

export const updateReview = async ({ id, data }) => {
  const response = await axios.put(`/api/reviews/${id}`, data);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(`/api/reviews/${id}`);
  return response.data;
};

// ============================================
// PAYMENT API CALLS
// ============================================

export const createPaymentIntent = async (paymentData) => {
  const response = await axios.post("/api/payments/create-intent", paymentData);
  return response.data;
};

export const confirmPayment = async (paymentData) => {
  const response = await axios.post("/api/payments/confirm", paymentData);
  return response.data;
};

export const getPaymentHistory = async () => {
  const response = await axios.get("/api/payments/history");
  return response.data;
};

// ============================================
// USER API CALLS
// ============================================

export const getAllUsers = async (params = {}) => {
  const response = await axios.get("/api/users", { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export const updateUserRole = async ({ id, role }) => {
  const response = await axios.patch(`/api/users/${id}/role`, { role });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/api/users/${id}`);
  return response.data;
};

export const getInstructors = async () => {
  const response = await axios.get("/api/instructors");
  return response.data;
};

export const getStudents = async () => {
  const response = await axios.get("/api/students");
  return response.data;
};

// ============================================
// CATEGORY API CALLS
// ============================================

export const getCategories = async () => {
  const response = await axios.get("/api/categories");
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post("/api/categories", categoryData);
  return response.data;
};

export const updateCategory = async ({ id, data }) => {
  const response = await axios.put(`/api/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`/api/categories/${id}`);
  return response.data;
};

// ============================================
// SEARCH API CALLS
// ============================================

export const fetchSearchResults = async (query, filters = {}) => {
  const response = await axios.get("/api/courses/search", {
    params: { q: query, ...filters }
  });
  return response.data;
};

export const fetchPopularCourses = async () => {
  const response = await axios.get("/api/courses/popular");
  return response.data;
};

export const fetchSearchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  const response = await axios.get("/api/courses/suggestions", {
    params: { q: query }
  });
  return response.data;
};

export const fetchTrendingSearches = async () => {
  const response = await axios.get("/api/search/trending");
  return response.data;
};
