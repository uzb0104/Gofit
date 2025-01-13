import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminProfile from "./components/Profile/ProfileAdmin";
import Members from "./components/MembersTable/Members";

import PaymentManagment from "./components/PaymentSection/Payment";
import Services from "./components/Expenses/Services";
import UserList from "./components/Products/Products";
import GymStats from "./components/Statistics/GymStats";
import { Box } from "@mui/material";
import Home from "./components/Sidebarhome/Home";
import AttendanceComponent from "./components/Attandance/Attendance";
import Attendance from "./components/Attandance/Attendance";
import AttendanceData from "./components/Attandance/Attendance";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div>
          <AdminNavbar />

          <Box
            sx={{
              display: "flex",
              minHeight: "calc(100vh - 50px)",
              overflow: "hidden",
            }}
          >
            <Sidebar />
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: 2,
                height: "calc(100vh - 50px)",
                border: "1px solid ",
              }}
            >
              <Routes>
                <Route
                  path="/adminprofile"
                  element={
                    <AdminProfile
                      name="Admin Name"
                      email="admin@example.com"
                      phone="123-456-7890"
                      status="Active"
                      startDate="2024-12-01"
                      lastLogin="2024-11-25"
                      role="Administrator"
                      avatar="path/to/avatar.jpg"
                    />
                  }
                />
                <Route path="/home" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendancedata" element={<AttendanceData />} />
                <Route path="/payment" element={<PaymentManagment />} />
                <Route path="/services" element={<Services />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/gymstats" element={<GymStats />} />
              </Routes>
            </Box>
          </Box>
        </div>
      </div>
    </Router>
  );
};


export default App;
