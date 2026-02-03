import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCourseDetails,
  useEnrollCourse,
} from "../../hooks/courses/useCourses";
import { useReviews } from "../../hooks/reviews/useReviews";
import { useSelector } from "react-redux";
import { formatCurrency, formatDate } from "../../lib/utils";
import LessonCard from "../../components/common/LessonCard";
import Skeleton from "../../components/common/Skeleton";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { data: course, isLoading, error } = useCourseDetails(id);
  const { mutate: enroll, isPending: isEnrolling } = useEnrollCourse();

  // Local state for UI tabs
  const [activeTab, setActiveTab] = useState("curriculum");

  if (isLoading)
    return (
      <div className="p-8">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  if (error || !course)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load course details.
      </div>
    );

  const isEnrolled = course.students?.includes(user?._id) || false;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.info("Please login to enroll");
      navigate("/login", { state: { from: `/course/${id}` } });
      return;
    }
    enroll(id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Course Header / Hero */}
      <div className="bg-gray-900 text-white py-12 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-blue-300 text-sm font-medium">
              <span>{course.category?.name || "Education"}</span>
              <span>•</span>
              <span>Last updated {formatDate(course.updatedAt)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl">
              {course.description
                ? course.description.substring(0, 150) + "..."
                : ""}
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor?.avatar || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-sm text-gray-400">Created by</p>
                  <p className="font-semibold text-white">
                    {course.instructor?.name || "Instructor"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-xl">★</span>
                <span className="font-bold text-white">
                  {course.rating || 0}
                </span>
                <span className="text-gray-400 text-sm">
                  ({course.totalReviews || 0} ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Floating Purchase Card (Desktop) */}
          <div className="hidden md:block w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-gray-800 dark:text-white absolute right-8 top-12 border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <img
                src={course.thumbnail || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="text-3xl font-bold mb-2">
                {formatCurrency(course.price)}
              </div>
            </div>

            {isEnrolled ? (
              <button
                onClick={() => navigate(`/player/${id}`)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors mb-4"
              >
                Go to Course
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors mb-4 disabled:opacity-70"
              >
                {isEnrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            )}

            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-center gap-2">
                ✓ Full lifetime access
              </li>
              <li className="flex items-center gap-2">
                ✓ Access on mobile and TV
              </li>
              <li className="flex items-center gap-2">
                ✓ Certificate of completion
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Purchase Card (Fixed Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t p-4 flex items-center justify-between shadow-lg z-50">
        <div className="font-bold text-xl text-gray-900 dark:text-white">
          {formatCurrency(course.price)}
        </div>
        {isEnrolled ? (
          <button
            onClick={() => navigate(`/player/${id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Go to Course
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={isEnrolling}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Enroll Now
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-12">
        <div className="flex-1 md:pr-96">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "curriculum" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "reviews" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "curriculum" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Course Content
              </h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson._id}
                      lesson={lesson}
                      index={index}
                      courseId={id}
                      isEnrolled={isEnrolled}
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No lessons available yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Student Feedback
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                <p className="text-gray-500">Reviews feature coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
