import React from "react";
import { Link } from "react-router-dom";
import { useUtils } from "../../lib/utils"; // placeholder
import EmptyState from "../../components/common/EmptyState";

const Dashboard = () => {
  // Mock data for dashboard stats - ideally fetch from useEducatorStats hook
  const stats = [
    {
      label: "Total Students",
      value: 1250,
      icon: "👥",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Courses",
      value: 5,
      icon: "📚",
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Total Earnings",
      value: "$12,500",
      icon: "💰",
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Average Rating",
      value: 4.8,
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Instructor Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your performance.
          </p>
        </div>
        <Link
          to="/educator/add-course"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Create New Course
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">
            Earnings Overview
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500">Chart visualization goes here</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
            Recent Enrollments
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Student Name {i}
                  </p>
                  <p className="text-xs text-gray-500">
                    Enrolled in React Course
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
