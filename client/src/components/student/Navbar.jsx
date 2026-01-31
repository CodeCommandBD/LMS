import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:h-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 gray-500">
          <div>
            <button className="">Become Educator</button>
            <Link to="/my-enrollments"></Link>
          </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Navbar;
