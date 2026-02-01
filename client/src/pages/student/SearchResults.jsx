import React from "react";
import { useParams } from "react-router-dom";
import { useSearchCourses } from "../../hooks/useSearch";
import { useSearch } from "../../hooks/useRedux";

const SearchResults = () => {
  const { query } = useParams();
  const { filters, setFilters } = useSearch();

  // Use TanStack Query to fetch search results
  const { data, isLoading, isError, error } = useSearchCourses(
    decodeURIComponent(query),
    filters,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Searching for "{decodeURIComponent(query)}"...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error.message}</p>
          <p className="text-gray-600 mt-2">Failed to load search results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{decodeURIComponent(query)}"
        </h1>
        <p className="text-gray-600">
          {data?.results?.length || 0} courses found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
          <option value="marketing">Marketing</option>
        </select>

        <select
          value={filters.level}
          onChange={(e) => setFilters({ level: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          value={filters.price}
          onChange={(e) => setFilters({ price: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.results?.length > 0 ? (
          data.results.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={course.thumbnail || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">No courses found</p>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
