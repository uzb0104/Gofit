import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminProfile from "./components/Profile/ProfileAdmin";
import Members from "./components/MembersTable/Members";
import PaymentManagment from "./components/PaymentSection/Payment";
import Services from "./components/Expenses/Services";
import GymStats from "./components/Statistics/GymStats";
import Home from "./components/Sidebarhome/Home";
import Attendance from "./components/Attandance/Attendance";
import ProductList from "./components/Products/Products";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <AdminNavbar />
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              padding: 2,
              maxHeight: "calc(100vh - 82px)",
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payment" element={<PaymentManagment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/gymstats" element={<GymStats />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
};

export default App;
