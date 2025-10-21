// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/akinsluxury.png";
import React from "react";

const Header = ({ token, userData, onLogout }) => {
  const navigate = useNavigate();
  const userName = userData?.name || "";
  const userRole = userData?.role?.toLowerCase() || "";

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo + Site Name */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        {/* Logo always links to home */}
        <Link
          to="/home"
          className="text-xl font-bold hover:text-gray-200 transition"
        >
          Akins Luxury Homes
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex gap-4 items-center">
        {token ? (
          <>
            {/* Only show "Home" for non-admin users */}
            {userRole !== "admin" && (
              <>
                <Link to="/home" className="hover:text-gray-200 transition">
                  Home
                </Link>
                <Link to="/dashboard" className="hover:text-gray-200 transition">
                  My Dashboard
                </Link>
                <Link to="/about" className="hover:text-gray-200 transition">
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-gray-200 transition">
                  Contact
                </Link>
                <Link to="/faq" className="hover:text-gray-200 transition">
                  FAQs
                </Link>
              </>
            )}

            {/* Admin Links */}
            {userRole === "admin" && (
              <Link to="/admin-dashboard" className="hover:text-gray-200 transition">
                Admin Dashboard
              </Link>
            )}

            {/* Logout */}
            <div className="ml-4 flex items-center gap-2">
              <span className="font-medium">{userName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Guest Links */}
            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200 transition">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
