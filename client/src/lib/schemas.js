import { z } from "zod";

// ============================================
// AUTH SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z.string().email("সঠিক email দাও"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষরের password দাও"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "কমপক্ষে ৩ অক্ষরের username দাও"),
  email: z.string().email("সঠিক email দাও"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষরের password দাও"),
  role: z.enum(["student", "instructor"]).optional(),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username কমপক্ষে ৩ অক্ষর হতে হবে").optional(),
  email: z.string().email("সঠিক email দাও").optional(),
  bio: z.string().max(500, "Bio ৫০০ অক্ষরের বেশি হতে পারবে না").optional(),
  phone: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password দাও"),
    newPassword: z.string().min(6, "New password কমপক্ষে ৬ অক্ষর হতে হবে"),
    confirmPassword: z.string().min(1, "Password confirm করো"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords match করছে না",
    path: ["confirmPassword"],
  });

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Account delete করতে password দাও"),
});

// ============================================
// COURSE SCHEMAS
// ============================================

export const courseSchema = z.object({
  title: z.string().min(5, "Course title কমপক্ষে ৫ অক্ষর হতে হবে"),
  description: z.string().min(20, "Description কমপক্ষে ২০ অক্ষর হতে হবে"),
  category: z.string().min(1, "Category select করো"),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Valid level select করো" }),
  }),
  price: z.number().min(0, "Price ০ বা তার বেশি হতে হবে"),
  thumbnail: z.string().url("Valid thumbnail URL দাও").optional(),
  duration: z.number().min(1, "Duration কমপক্ষে ১ ঘণ্টা হতে হবে").optional(),
  language: z.string().optional(),
});

export const updateCourseSchema = courseSchema.partial();

// ============================================
// LESSON SCHEMAS
// ============================================

export const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title কমপক্ষে ৩ অক্ষর হতে হবে"),
  description: z.string().optional(),
  content: z.string().min(10, "Content কমপক্ষে ১০ অক্ষর হতে হবে").optional(),
  videoUrl: z.string().url("Valid video URL দাও").optional(),
  duration: z.number().min(1, "Duration কমপক্ষে ১ মিনিট হতে হবে").optional(),
  order: z.number().min(1, "Order কমপক্ষে ১ হতে হবে").optional(),
  type: z
    .enum(["video", "text", "pdf", "quiz"], {
      errorMap: () => ({ message: "Valid lesson type select করো" }),
    })
    .optional(),
});

export const updateLessonSchema = lessonSchema.partial();

// ============================================
// QUIZ SCHEMAS
// ============================================

export const quizQuestionSchema = z.object({
  question: z.string().min(5, "Question কমপক্ষে ৫ অক্ষর হতে হবে"),
  options: z.array(z.string()).min(2, "কমপক্ষে ২টি options দাও"),
  correctAnswer: z.number().min(0, "Correct answer index দাও"),
  points: z.number().min(1, "Points কমপক্ষে ১ হতে হবে").optional(),
});

export const quizSchema = z.object({
  title: z.string().min(3, "Quiz title কমপক্ষে ৩ অক্ষর হতে হবে"),
  description: z.string().optional(),
  questions: z.array(quizQuestionSchema).min(1, "কমপক্ষে ১টি question দাও"),
  timeLimit: z.number().min(1, "Time limit কমপক্ষে ১ মিনিট হতে হবে").optional(),
  passingScore: z
    .number()
    .min(0)
    .max(100, "Passing score ০-১০০ এর মধ্যে হতে হবে")
    .optional(),
});

export const submitQuizSchema = z.object({
  answers: z.array(z.number()).min(1, "কমপক্ষে ১টি answer দাও"),
});

// ============================================
// ASSIGNMENT SCHEMAS
// ============================================

export const assignmentSchema = z.object({
  title: z.string().min(3, "Assignment title কমপক্ষে ৩ অক্ষর হতে হবে"),
  description: z.string().min(10, "Description কমপক্ষে ১০ অক্ষর হতে হবে"),
  dueDate: z.string().or(z.date()),
  maxScore: z.number().min(1, "Max score কমপক্ষে ১ হতে হবে").optional(),
  instructions: z.string().optional(),
});

export const submitAssignmentSchema = z
  .object({
    content: z
      .string()
      .min(10, "Assignment content কমপক্ষে ১০ অক্ষর হতে হবে")
      .optional(),
    fileUrl: z.string().url("Valid file URL দাও").optional(),
  })
  .refine((data) => data.content || data.fileUrl, {
    message: "Content অথবা file দাও",
  });

export const gradeAssignmentSchema = z.object({
  score: z.number().min(0, "Score ০ বা তার বেশি হতে হবে"),
  feedback: z.string().optional(),
});

// ============================================
// REVIEW SCHEMAS
// ============================================

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating কমপক্ষে ১ হতে হবে")
    .max(5, "Rating সর্বোচ্চ ৫ হতে পারে"),
  comment: z.string().min(10, "Comment কমপক্ষে ১০ অক্ষর হতে হবে").optional(),
});

export const updateReviewSchema = reviewSchema.partial();

// ============================================
// CATEGORY SCHEMAS
// ============================================

export const categorySchema = z.object({
  name: z.string().min(2, "Category name কমপক্ষে ২ অক্ষর হতে হবে"),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const updateCategorySchema = categorySchema.partial();

// ============================================
// USER SCHEMAS
// ============================================

export const updateUserRoleSchema = z.object({
  role: z.enum(["student", "instructor", "admin"], {
    errorMap: () => ({ message: "Valid role select করো" }),
  }),
});

// ============================================
// PAYMENT SCHEMAS
// ============================================

export const createPaymentIntentSchema = z.object({
  courseId: z.string().min(1, "Course ID দাও"),
  amount: z.number().min(1, "Amount কমপক্ষে ১ হতে হবে"),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, "Payment intent ID দাও"),
  courseId: z.string().min(1, "Course ID দাও"),
});
