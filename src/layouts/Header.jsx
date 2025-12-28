import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-8xl">
      {/* Container với bo tròn 2 đầu */}
      <div className="relative rounded-full overflow-hidden">
        {/* Lớp phủ trong suốt với blur */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20" />
        
        <div className="relative px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform flex-shrink-0">
            <img src="/logo.png" alt="TS Logo" className="w-full h-full object-cover" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === "/" 
                  ? "text-[#5cd9aa]" 
                  : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/journey-tracker" 
              className={`transition-colors ${
                location.pathname === "/journey-tracker" 
                  ? "text-[#5cd9aa]" 
                  : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              JOURNEY TRACKER
            </Link>
            <Link 
              to="/inner-space" 
              className={`transition-colors ${
                location.pathname === "/inner-space" 
                  ? "text-[#5cd9aa]" 
                  : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              INNER SPACE
            </Link>
            <Link 
              to="/blog" 
              className={`transition-colors ${
                location.pathname.startsWith("/blog") 
                  ? "text-[#5cd9aa]" 
                  : "text-gray-900 hover:text-[#5cd9aa]"
              }`}
            >
              HEALING STORIES
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                location.pathname === "/about" 
                  ? "text-[#5cd9aa]" 
                  : "text-gray-900 hover:text-[#5cd9aa]"
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

          {/* User Section */}
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
          <button className="md:hidden text-gray-900 hover:text-[#5cd9aa] transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;