import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === "/landing";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full top-0 z-50 transition duration-300
    
    ${
      isLanding
        ? scrolled
          ? "bg-black shadow-lg"
          : "bg-transparent"
        : "bg-black shadow-lg"
    }
    `}
    >
      {/* INNER CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex justify-between items-center">
        {/* Logo */}
        <img src="/images/logo_white.png" className="w-24 md:w-28" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          <a href="/landing" className="hover:text-gray-300 transition">
            Home
          </a>
          <a href="/outputs" className="hover:text-gray-300 transition">
            Outputs
          </a>
          <a href="/contact" className="hover:text-gray-300 transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="px-4 py-1.5 bg-black text-white rounded">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white text-2xl cursor-pointer">
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden shadow-lg">
          <a href="/landing" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="/outputs" onClick={() => setMenuOpen(false)}>
            Outputs
          </a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
