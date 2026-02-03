import React from "react";
import { useEnrollments } from "../../hooks/enrollments/useEnrollments";
import CourseCard from "../../components/common/CourseCard";
import Skeleton from "../../components/common/Skeleton";
import EmptyState from "../../components/common/EmptyState";
import { Link } from "react-router-dom";

const MyEnrollments = () => {
  const { data: enrollments, isLoading, error } = useEnrollments();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Learning
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and continue learning
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="Failed to load enrollments"
            description="Please check your connection and try again."
            icon="🔴"
          />
        ) : enrollments?.length === 0 ? (
          <EmptyState
            title="No courses enrolled"
            description="You haven't enrolled in any courses yet."
            action={
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment._id} className="relative group">
                {/* Reusing CourseCard but might want progress overlay */}
                <CourseCard course={enrollment.course} />

                {/* Progress Overlay / Bar */}
                <div className="mt-2 bg-white dark:bg-gray-800 p-3 rounded-b-lg border-x border-b border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="font-bold text-blue-600">
                      {enrollment.progress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${enrollment.progress || 0}%` }}
                    ></div>
                  </div>
                  <Link
                    to={`/player/${enrollment.course._id}`}
                    className="block text-center mt-3 text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;
