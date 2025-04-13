import { Link, useLocation } from "react-router-dom";
import {
  FaLink,
  FaChartBar,
  FaPlus,
  FaQrcode,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { setSelected } from "../redux/features/selectedDashboard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const navLinks = [
  { name: "All Links", icon: FaLink },
  { name: "Create Link", icon: FaPlus },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const selected = useSelector(
    (state) => state.selectedDashboard?.dashboardName
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-[#1e1e1e] shadow-md border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="p-6 text-xl font-bold text-indigo-600 dark:text-indigo-400 ml-10 md:ml">
          Link<span className="text-gray-800 dark:text-white">Trackr</span>
        </div>
        <nav className="mt-6">
          <ul>
            {navLinks.map(({ name, icon: Icon }) => (
              <li key={name}>
                <p
                  onClick={() => {
                    dispatch(setSelected(name));
                    setIsOpen(false);
                  }}
                  className={`flex items-center px-6 py-3 hover:bg-indigo-100 dark:hover:bg-indigo-700 rounded-lg mx-3 my-1 transition font-semibold ${
                    selected === name
                      ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Icon className="mr-3" />
                  {name}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
