import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:h-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 gray-500">
          <div>
            <button className="">Become Educator</button>
            <Link to="/my-enrollments" className="">My Enrollments</Link>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full">Create Account</button>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Navbar;
