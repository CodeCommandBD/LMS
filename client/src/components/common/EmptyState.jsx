import React from "react";

const EmptyState = ({
  title = "No data found",
  description = "There is nothing to display here yet.",
  icon = "📂",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
