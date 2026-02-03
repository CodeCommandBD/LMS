import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";

const AssignmentCard = ({ assignment, courseId }) => {
  const { _id, title, dueDate, maxScore, submission } = assignment;

  const isSubmitted = !!submission;
  const isLate = new Date() > new Date(dueDate) && !isSubmitted;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Due:{" "}
            <span className={isLate ? "text-red-500 font-medium" : ""}>
              {formatDate(dueDate)}
            </span>
          </p>
        </div>
        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded dark:bg-orange-900/30 dark:text-orange-300">
          Assignment
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          {isSubmitted ? (
            <div className="flex flex-col">
              <span className="text-green-600 dark:text-green-400 font-medium">
                Submitted
              </span>
              {submission.grade !== undefined && (
                <span className="text-gray-600 dark:text-gray-400">
                  Grade: {submission.grade}/{maxScore}
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-500">
              Not submitted yet • {maxScore} Points
            </span>
          )}
        </div>

        <Link
          to={`/course/${courseId}/assignment/${_id}`}
          className={`text-sm px-4 py-2 rounded transition-colors ${
            isSubmitted
              ? "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSubmitted ? "View Submission" : "Submit Assignment"}
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
