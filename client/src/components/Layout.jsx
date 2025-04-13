import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, isDashboard }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#121212] transition-colors duration-300">
      {isDashboard && <Sidebar />}

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className={`${isDashboard && "p-6"} overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
