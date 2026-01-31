import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/student/Home.jsx";
import CoursesList from "./pages/student/CoursesList.jsx";
import CourseDetails from "./pages/student/CourseDetails.jsx";
import MyEnrollments from "./pages/student/MyEnrollments.jsx";
import Player from "./pages/student/Player.jsx";
import Loading from "./components/student/Loading.jsx";
import Educator from "./pages/educator/Educator.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import AddCourse from "./pages/educator/AddCourse.jsx";
import MyCourses from "./pages/educator/MyCourses.jsx";
import StudentEnrolled from "./pages/educator/StudentEnrolled.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

// clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/course-list",
        element: <CoursesList />,
      },
      {
        path: "/course-list/:input",
        element: <CoursesList />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "/my-enrollments",
        element: <MyEnrollments />,
      },
      {
        path: "/player/:courseId",
        element: <Player />,
      },
      {
        path: "/loading/:path",
        element: <Loading />,
      },
      {
        path: "/educator",
        element: <Educator />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "add-course",
            element: <AddCourse />,
          },
          {
            path: "my-course",
            element: <MyCourses />,
          },
          {
            path: "student-enrolled",
            element: <StudentEnrolled />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
);
