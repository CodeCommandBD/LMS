import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="relative md:text-5xl text-4xl font-bold max-w-3xlk mx-auto text-center text-gray-700">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600 font-semibold">fit your choice.</span>
        <img
          className="md:block hidden absolute right-0 -bottom-7"
          src={assets.sketch}
          alt="sketch"
        />
      </h1>
      <p className="md:block hidden text-gray-600 max-w-2xl mx-auto text-md">
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>
      <p className="md:hidden block text-gray-600 max-w-2xl mx-auto text-md">
       We bring together world-class instructors to help you achieve your professional goals.
      </p>
    </div>
  );
};

export default Hero;
