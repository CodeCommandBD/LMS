import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../hooks/courses/useCourses"; // Assuming we have a hook for 'instructor-courses' or filter
import Skeleton from "../../components/common/Skeleton";
import EmptyState from "../../components/common/EmptyState";
import { formatCurrency } from "../../lib/utils";

const MyCourses = () => {
  // Ideally this hook should accept a filter like { instructor: 'me' } or use a specialized hook
  const { data, isLoading, error } = useCourses({ instructor: "me" });

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Courses
        </h1>
        <Link
          to="/educator/add-course"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Create New
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <EmptyState title="Error loading courses" icon="⚠️" />
      ) : data?.courses?.length === 0 ? (
        <EmptyState
          title="You haven't created any courses yet"
          description="Get started by creating your first course."
          action={
            <Link to="/educator/add-course" className="text-blue-600 font-bold">
              Create Course
            </Link>
          }
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Course
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Students
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data.courses.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={course.thumbnail || "/placeholder-course.jpg"}
                        alt=""
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <span className="font-medium text-gray-800 dark:text-white truncate max-w-xs">
                        {course.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {course.students?.length || 0}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                    {formatCurrency(course.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/educator/edit-course/${course._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
