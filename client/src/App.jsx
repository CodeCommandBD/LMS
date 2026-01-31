import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/student/Navbar";

const App = () => {
  const location = useLocation();
  const isEducatorRoute = location.pathname.startsWith("/educator");
  return (
    <div className="min-h-screen bg-white ">
      {!isEducatorRoute && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
