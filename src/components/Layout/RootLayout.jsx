import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Navbar/Navbar";

const RootLayout = () => {
  const location = useLocation();
  const isAssignmentPage = location.pathname === "/calculator";
  return (
    <div>
      {
        // Conditionally render the ScrollToTop component
        !isAssignmentPage && <Navbar />
      }
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default RootLayout;
