import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/landing";

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`fixed w-full top-0 z-50 transition duration-300
      ${
        isLanding
          ? scrolled
            ? "bg-black shadow-lg"
            : "bg-transparent"
          : "bg-black shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex justify-between items-center">
        {/* Logo */}
        <img src="/images/logo_white.png" className="w-24 md:w-28" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white font-medium items-center">
          {/* COMMON */}
          <Link to="/landing" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/outputs" className="hover:text-gray-300">
            Outputs
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>

          {/* USER MENU */}
          {user?.role === "user" && (
            <>
              
              <Link to="/book" className="hover:text-gray-300">
                BookShoot
              </Link>
              <Link to="/my-bookings" className="hover:text-gray-300">
                MyBookings
              </Link>
            </>
          )}

          {/* ADMIN MENU */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/admin/bookings" className="hover:text-gray-300">
                ManageBookings
              </Link>
              <Link to="/admin/services" className="hover:text-gray-300">
                ManageServices
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link to="/login">
              <button
                className="px-5 py-2 rounded-xl text-white text-sm font-medium
                bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                hover:from-red-500 hover:to-purple-500
                shadow-md hover:shadow-xl
                transition-all duration-300
                transform hover:scale-105 active:scale-95"
              >
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl text-white text-sm font-medium
                bg-gradient-to-r from-red-500 to-pink-500
                hover:from-pink-500 hover:to-red-500
                shadow-md hover:shadow-xl
                transition-all duration-300
                transform hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white text-2xl cursor-pointer">
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden shadow-lg">
          <Link to="/landing" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/outputs" onClick={() => setMenuOpen(false)}>
            Outputs
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {user?.role === "user" && (
            <>
              <Link to="/book" onClick={() => setMenuOpen(false)}>
                BookShoot
              </Link>
              <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
                MyBookings
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/bookings" onClick={() => setMenuOpen(false)}>
                ManageBookings
              </Link>
              <Link to="/admin/services" onClick={() => setMenuOpen(false)}>
                ManageServices
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
