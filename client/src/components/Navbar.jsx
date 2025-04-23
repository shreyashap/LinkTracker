import { use, useEffect, useReducer, useState } from "react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/features/authSlice";
import axios from "axios";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const user = JSON.parse(localStorage.getItem("user"));

  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (user) {
      setUsername(user.username);
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res?.data) {
        dispatch(userLogout());
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-700">
      {user && (
        <h1 className="ml-10 md:ml-0 text-lg font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      )}

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition cursor-pointer"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile icon */}
        {user && (
          <div
            className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex justify-center items-center text-white p-1 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <CgProfile className="w-full h-full" />
          </div>
        )}

        {showDropdown && user && (
          <div className="absolute top-10 right-0 mt-2 w-48 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-10">
            <p className="text-gray-900 dark:text-white text-sm mb-2">
              Hello, {username}
            </p>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 hover:text-red-800 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
