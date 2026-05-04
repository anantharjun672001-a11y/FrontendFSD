import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import AboutStudio from "./components/AboutStudio";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import Outputs from "./pages/Outputs";

// User Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import BookShoot from "./pages/user/BookShoot";
import MyBookings from "./pages/user/MyBookings";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageServices from "./pages/admin/ManageServices";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<AboutStudio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/outputs" element={<Outputs />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED */}
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookShoot />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <ManageBookings />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <ManageServices />
              </RoleRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;