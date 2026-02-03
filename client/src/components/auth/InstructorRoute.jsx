import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const InstructorRoute = () => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user || role !== "instructor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default InstructorRoute;
