import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../../lib/utils";

const LessonCard = ({ lesson, index, courseId, isEnrolled }) => {
  const { _id, title, duration, type, isCompleted } = lesson;

  const getIcon = () => {
    switch (type) {
      case "video":
        return "🎥";
      case "text":
        return "📄";
      case "pdf":
        return "📑";
      case "quiz":
        return "❓";
      default:
        return "📄";
    }
  };

  return (
    <div
      className={`flex items-center p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isCompleted ? "bg-green-50 dark:bg-green-900/10" : ""}`}
    >
      <div className="mr-3 text-gray-500 font-medium w-6 text-center">
        {index + 1}
      </div>

      <div className="flex-1">
        {isEnrolled ? (
          <Link
            to={`/course/${courseId}/lesson/${_id}`}
            className="flex items-center group"
          >
            <span className="mr-2 text-xl">{getIcon()}</span>
            <div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {title}
              </h4>
              <span className="text-xs text-gray-500">
                {formatDuration(duration)}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex items-center opacity-70 cursor-not-allowed">
            <span className="mr-2 text-xl">{getIcon()}</span>
            <div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {title}{" "}
                <span className="text-xs ml-2 text-gray-400">🔒 Locked</span>
              </h4>
              <span className="text-xs text-gray-500">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
        )}
      </div>

      {isCompleted && <div className="text-green-500 mx-2">✓</div>}
    </div>
  );
};

export default LessonCard;
