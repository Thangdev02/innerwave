import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center shadow-md">
          <img src="./logo.png" alt="" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-purple-600 transition">Home</a>
          <a href="/journey-tracker" className="hover:text-purple-600 transition">Journey Tracker</a>
          <a href="#" className="hover:text-purple-600 transition">Inner Space</a>
          <a href="/blog" className="hover:text-purple-600 transition">Healing Stories</a>
          <a href="#" className="hover:text-purple-600 transition">Contact</a>
          <a
            href="#"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            SHOP NOW
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;