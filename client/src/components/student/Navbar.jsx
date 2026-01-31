import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-500 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-700">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="hover:text-blue-600 transition-colors">
                Become Educator
              </button>
              <Link
                to="/my-enrollments"
                className="hover:text-blue-600 transition-colors"
              >
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>
      {/* Mobile Navbar */}
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500 text-sm">
        {user && (
          <>
            <button className="hover:text-blue-600 transition-colors">
              Become Educator
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition-colors"
            >
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="cursor-pointer">
            <img src={assets.user_icon} alt="user icon" className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
