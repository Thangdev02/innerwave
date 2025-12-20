import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-blue-600 text-white py-16 px-6 overflow-hidden">
      {/* Decorative Colored Circles - Multiple Layers */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-10 left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
      
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-40 left-1/3 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-60"></div>
      
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-20 right-1/3 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-60"></div>
      
      <div className="absolute top-10 right-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-50"></div>
      
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-teal-400 rounded-full blur-3xl opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Quick Access Section */}
        <div>
          <h3 className="text-xl font-bold mb-6">Quick Access:</h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-blue-200 transition-colors text-base">
                Home
              </a>
            </li>
            <li>
              <a href="/journey-tracker" className="hover:text-blue-200 transition-colors text-base">
                Journey Tracker
              </a>
            </li>
            <li>
              <a href="/inner-space" className="hover:text-blue-200 transition-colors text-base">
                Inner Space
              </a>
            </li>
            <li>
              <a href="/healing-stories" className="hover:text-blue-200 transition-colors text-base">
                Healing Stories
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-blue-200 transition-colors text-base">
                About us
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-blue-200 transition-colors text-base">
                Shop now
              </a>
            </li>
          </ul>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center items-start">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-right">
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Tel:</span>
              <div className="text-base mt-1">
                <a href="tel:+84832346608" className="hover:text-blue-200 transition-colors block">
                  (+84) 832 346 608
                </a>
                <a href="tel:+14132102665" className="hover:text-blue-200 transition-colors block">
                  (+1) 413 2102 665
                </a>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-semibold">Email:</span>
              <div className="text-base mt-1">
                <a 
                  href="mailto:khanhvoha21112008@gmail.com" 
                  className="hover:text-blue-200 transition-colors"
                >
                  khanhvoha21112008@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;