import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../services/authService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const handleMobileLinkClick = () => {
    setShowMobileMenu(false);
  };

  // Animation cho menu mobile
  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-8xl">
      <div className="relative rounded-full overflow-visible">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-full" />

        <div className="relative px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform flex-shrink-0">
            <img src="/logo.png" alt="TS Logo" className="w-full h-full object-cover" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === "/" ? "text-[#5cd9aa]" : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/journey-tracker" 
              className={`transition-colors ${
                location.pathname === "/journey-tracker" ? "text-[#5cd9aa]" : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              JOURNEY TRACKER
            </Link>
            <Link 
              to="/inner-space" 
              className={`transition-colors ${
                location.pathname === "/inner-space" ? "text-[#5cd9aa]" : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              INNER SPACE
            </Link>
            <Link 
              to="/blog" 
              className={`transition-colors ${
                location.pathname.startsWith("/blog") ? "text-[#5cd9aa]" : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              HEALING STORIES
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                location.pathname === "/about" ? "text-[#5cd9aa]" : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              ABOUT ME
            </Link>
            <Link
              to="/shop"
              className="text-gray-900 font-bold hover:text-[#5cd9aa] transition-colors"
            >
              SHOP NOW
            </Link>
          </nav>

          {/* User Section - Desktop */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-900 font-bold hover:text-[#5cd9aa] transition-colors"
                >
                  <span>{user.firstName} {user.lastName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-[#5cd9aa] text-white font-bold rounded-full hover:bg-[#4bc799] transition-colors shadow-md"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-900 hover:text-[#5cd9aa] transition focus:outline-none relative z-[60]"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-[55]"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col p-6 space-y-6 text-center font-bold text-gray-900">
                <Link 
                  to="/" 
                  onClick={handleMobileLinkClick}
                  className={`transition-colors ${
                    location.pathname === "/" ? "text-[#5cd9aa]" : "hover:text-[#5cd9aa]"
                  }`}
                >
                  HOME
                </Link>
                <Link 
                  to="/journey-tracker" 
                  onClick={handleMobileLinkClick}
                  className={`transition-colors ${
                    location.pathname === "/journey-tracker" ? "text-[#5cd9aa]" : "hover:text-[#5cd9aa]"
                  }`}
                >
                  JOURNEY TRACKER
                </Link>
                <Link 
                  to="/inner-space" 
                  onClick={handleMobileLinkClick}
                  className={`transition-colors ${
                    location.pathname === "/inner-space" ? "text-[#5cd9aa]" : "hover:text-[#5cd9aa]"
                  }`}
                >
                  INNER SPACE
                </Link>
                <Link 
                  to="/blog" 
                  onClick={handleMobileLinkClick}
                  className={`transition-colors ${
                    location.pathname.startsWith("/blog") ? "text-[#5cd9aa]" : "hover:text-[#5cd9aa]"
                  }`}
                >
                  HEALING STORIES
                </Link>
                <Link 
                  to="/about" 
                  onClick={handleMobileLinkClick}
                  className={`transition-colors ${
                    location.pathname === "/about" ? "text-[#5cd9aa]" : "hover:text-[#5cd9aa]"
                  }`}
                >
                  ABOUT ME
                </Link>
                <Link 
                  to="/shop"
                  onClick={handleMobileLinkClick}
                  className="hover:text-[#5cd9aa] transition-colors"
                >
                  SHOP NOW
                </Link>

                {/* Phần user trong mobile */}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      Đăng xuất ({user.firstName} {user.lastName})
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={handleMobileLinkClick}
                      className="block w-full py-3 bg-[#5cd9aa] text-white rounded-lg hover:bg-[#4bc799] transition"
                    >
                      LOGIN
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;