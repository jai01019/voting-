import React from "react";
import Navbar from "../components/common/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-100 px-6 py-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
