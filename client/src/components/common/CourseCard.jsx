import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../lib/utils";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    thumbnail,
    instructor,
    price,
    rating,
    totalReviews,
    level,
    category,
  } = course;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/course/${_id}`}>
        <div className="relative h-48 w-full">
          <img
            src={thumbnail || "/placeholder-course.jpg"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {level}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
          {category?.name || "Uncategorized"}
        </div>

        <Link to={`/course/${_id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </h3>
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-400 text-sm">
            <span>★</span>
            <span className="text-gray-600 dark:text-gray-300 ml-1">
              {rating || 0} ({totalReviews || 0})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <img
              src={instructor?.avatar || "/default-avatar.png"}
              alt={instructor?.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[100px]">
              {instructor?.name || "Instructor"}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">
            {formatCurrency(price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
