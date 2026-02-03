import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, courseId }) => {
  const { _id, title, questions, timeLimit, attempts } = quiz;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {questions?.length} Questions • {timeLimit} Minutes
          </p>
        </div>
        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded dark:bg-purple-900/30 dark:text-purple-300">
          Quiz
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {attempts > 0 ? (
            <span className="text-green-600 dark:text-green-400">
              Completed ({attempts} attempts)
            </span>
          ) : (
            <span>Not attempted</span>
          )}
        </div>

        <Link
          to={`/course/${courseId}/quiz/${_id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
        >
          {attempts > 0 ? "Retake Quiz" : "Start Quiz"}
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
