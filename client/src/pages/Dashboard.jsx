import React, { useEffect, useState } from "react";
import LinkTable from "../components/LinkTable";
import CreateLinkPage from "./CreateLink";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const name = useSelector((state) => state.selectedDashboard?.dashboardName);

  return (
    <div className="px-2 sm:px-4 lg:px-8 py-6 overflow-x-hidden grid gap-6">
      {name === "All Links" && <LinkTable />}
      {name === "Create Link" && <CreateLinkPage />}
    </div>
  );
};

export default Dashboard;
