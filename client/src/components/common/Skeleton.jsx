import React from "react";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};

export const CourseCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[320px]">
    <Skeleton className="h-48 w-full" />
    <div className="p-4">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-2" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
    <Skeleton className="w-10 h-10 rounded bg-gray-300 mr-4" />
    <div className="flex-1">
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-3 w-1/4" />
    </div>
    <Skeleton className="h-4 w-16" />
  </div>
);

export default Skeleton;
