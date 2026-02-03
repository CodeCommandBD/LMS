import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRoute = () => {
  const { user, role } = useSelector((state) => state.auth);

  // Allow if user exists and role is student (or null which might default to student)
  if (!user || (role && role !== "student")) {
    return <Navigate to="/" replace />; // Redirect to home or unauthorized page
  }

  return <Outlet />;
};

export default StudentRoute;
