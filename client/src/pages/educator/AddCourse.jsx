import React, { useState } from "react";
import { useCreateCourse } from "../../hooks/courses/useCourses";
import RichTextEditor from "../../components/common/RichTextEditor";
import FileUploader from "../../components/common/FileUploader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const { mutate: createCourse, isPending } = useCreateCourse();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    level: "beginner",
    thumbnail: null, // File object
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!courseData.title || !courseData.description || !courseData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });

    createCourse(formData, {
      onSuccess: () => {
        // Navigate handled by hook or here
        // toast.success("Course created!"); // Hook handles toast usually
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Create New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white dark:border-gray-600"
              placeholder="e.g. Advanced React Patterns"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Thumbnail
            </label>
            <FileUploader
              onFileSelect={(file) =>
                setCourseData((prev) => ({ ...prev, thumbnail: file }))
              }
              accept="image/*"
              label="Upload Thumbnail"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <RichTextEditor
              value={courseData.description}
              onChange={(html) =>
                setCourseData((prev) => ({ ...prev, description: html }))
              }
              placeholder="Detailed description of your course..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (BDT)
              </label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white dark:border-gray-600"
                placeholder="0.00"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Level
              </label>
              <select
                name="level"
                value={courseData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate("/educator/dashboard")}
              className="mr-4 px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
