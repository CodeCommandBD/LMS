import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseDetails } from "../../hooks/courses/useCourses";
import { useLessons, useCompleteLesson } from "../../hooks/lessons/useLessons"; // Assuming lessons hook is updated or using context
import VideoPlayer from "../../components/common/VideoPlayer";
import PDFViewer from "../../components/common/PDFViewer";
import Skeleton from "../../components/common/Skeleton";
import { toast } from "react-toastify";

// Helper component for sidebar lesson item
const PlaylistItem = ({ lesson, index, isActive, isCompleted, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-4 cursor-pointer border-l-4 transition-colors ${
      isActive
        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-600"
        : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
    }`}
  >
    <div
      className={`mr-3 w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
        isCompleted
          ? "bg-green-500 border-green-500 text-white"
          : "border-gray-400 text-gray-500"
      }`}
    >
      {isCompleted ? "✓" : index + 1}
    </div>
    <div className="flex-1">
      <h4
        className={`text-sm font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-200"}`}
      >
        {lesson.title}
      </h4>
      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
        <span>
          {lesson.type === "video" ? "🎥" : "📄"} {lesson.type}
        </span>
        <span>• {lesson.duration}m</span>
      </div>
    </div>
  </div>
);

const Player = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading: courseLoading } = useCourseDetails(courseId);
  const { mutate: markComplete } = useCompleteLesson(); // Need to ensure hook is implemented to take IDs

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lessons = course?.lessons || [];
  const currentLesson = lessons[currentLessonIndex];

  // Auto-load first uncompleted lesson logic could go here

  if (courseLoading)
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading Classroom...
      </div>
    );
  if (!course) return <div className="p-8 text-center">Course not found.</div>;

  const handleLessonComplete = () => {
    if (currentLesson && !currentLesson.completed) {
      markComplete(currentLesson._id, {
        onSuccess: () => {
          toast.success("Lesson completed!");
          // Optimistically update local state or rely on invalidation
        },
      });
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 z-20 flex-shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/my-enrollments")}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-md">
            {course.title}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-sm text-gray-600 dark:text-gray-400 hidden md:block">
            Progress: {course.progress || 0}%
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sidebarOpen ? "Hide Menu" : "Show Menu"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content (Player) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col relative">
          <div className="max-w-4xl mx-auto w-full">
            {/* Media Player Area */}
            <div className="bg-black rounded-lg shadow-2xl overflow-hidden aspect-video mb-6">
              {currentLesson ? (
                currentLesson.type === "video" ? (
                  <VideoPlayer
                    url={currentLesson.url}
                    onEnded={() => {
                      handleLessonComplete();
                    }}
                  />
                ) : currentLesson.type === "pdf" ? (
                  <PDFViewer
                    url={currentLesson.url}
                    title={currentLesson.title}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <h2 className="text-2xl mb-4">{currentLesson.title}</h2>
                      <p>
                        {currentLesson.content ||
                          "Text lesson content goes here."}
                      </p>
                      <button
                        onClick={handleLessonComplete}
                        className="mt-8 bg-blue-600 px-6 py-2 rounded"
                      >
                        Mark as Read
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  Select a lesson to start
                </div>
              )}
            </div>

            {/* Lesson Controls & Info */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrev}
                disabled={currentLessonIndex === 0}
                className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  handleLessonComplete();
                  handleNext();
                }}
                disabled={currentLessonIndex === lessons.length - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-400"
              >
                Next Lesson
              </button>
            </div>

            {/* Tabs for Description/Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{currentLesson?.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {currentLesson?.description ||
                  "No description available for this lesson."}
              </p>
            </div>
          </div>
        </main>

        {/* Sidebar (Curriculum) */}
        <aside
          className={`bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 w-80 flex-shrink-0 transition-all duration-300 absolute md:static right-0 h-full z-10 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full md:mr-[-20rem]"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-200">
              Course Content
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {lessons.map((lesson, idx) => (
                <PlaylistItem
                  key={lesson._id}
                  lesson={lesson}
                  index={idx}
                  isActive={currentLessonIndex === idx}
                  isCompleted={lesson.completed} // Assuming 'completed' flag is in lesson object
                  onClick={() => setCurrentLessonIndex(idx)}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Player;
