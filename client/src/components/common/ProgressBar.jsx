import React from "react";

const ProgressBar = ({ progress, size = "md", showLabel = true }) => {
  const heightClass = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  }[size];

  const textSizeClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

  // Color based on completion
  const getColor = () => {
    if (safeProgress < 30) return "bg-red-500";
    if (safeProgress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className={`flex justify-between mb-1 ${textSizeClass}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Course Progress
          </span>
          <span className="font-bold text-gray-800 dark:text-white">
            {safeProgress}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heightClass}`}
      >
        <div
          className={`${getColor()} ${heightClass} transition-all duration-500 ease-out`}
          style={{ width: `${safeProgress}%` }}
        >
          {size === "lg" && safeProgress > 10 && (
            <div className="text-center text-white text-xs font-bold leading-6">
              {safeProgress}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
