import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-[#121212] dark:via-[#1f1f1f] dark:to-[#2a2a2a] flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <FaLink className="text-4xl text-indigo-600 dark:text-indigo-400 mr-2" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Link
            <span className="text-indigo-600 dark:text-indigo-400">Trackr</span>
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10">
          Effortlessly shorten your URLs, track analytics, and generate QR codes
          — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-indigo-600 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold rounded-md transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
