import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Admin/Sidebar";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AdminProfile from "./components/Admin/ProfileAdmin";
import Members from "./components/Admin/Members";

import PaymentManagment from "./components/Admin/Payment";
import Services from "./components/Admin/Services";
import UserList from "./components/Admin/Products";
import GymStats from "./components/Admin/GymStats";
import { Box } from "@mui/material";
import Home from "./components/Admin/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div style={{ flexGrow: 0 }}>
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
                border: "1px solid "
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
