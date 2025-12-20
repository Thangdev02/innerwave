import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

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