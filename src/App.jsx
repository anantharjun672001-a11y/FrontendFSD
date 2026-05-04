import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AboutStudio from "./components/AboutStudio";
import Contact from "./pages/Contact";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import BookShoot from "./pages/user/BookShoot";
import MyBookings from "./pages/user/MyBookings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageServices from "./pages/admin/ManageServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Outputs from "./pages/Outputs";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<AboutStudio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/outputs" element={<Outputs />} />

        {/* USER AUTH ROUTES */}

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
};

export default App;
