import React, { useState } from "react";
import HeroIntro from "../components/HeroIntro";

const HomePage = () => {
  const [showMain, setShowMain] = useState(false);

  // Flip Card Component – trong file luôn
  const FlipImageCard = ({ frontImg, backImg }) => {
    return (
      <div className="group w-72 h-96 [perspective:1000px] cursor-pointer">
        <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-xl">
            <img
              src={frontImg}
              alt="Front"
              className="w-full h-full object-cover rounded-3xl"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x1200/fee6ce/000000?text=MORNING";
              }}
            />
          </div>
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-white rounded-3xl shadow-xl">
            <img
              src={backImg}
              alt="Back"
              className="w-full h-full object-cover rounded-3xl"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x1200/fde68a/000000?text=JOURNEY+TRACKER";
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black">
      {!showMain && <HeroIntro onFinish={() => setShowMain(true)} />}

      {showMain && (
        <>
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-white/30">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">TS</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
                <a href="#" className="hover:text-purple-600 transition">Home</a>
                <a href="#" className="hover:text-purple-600 transition">Journey Tracker</a>
                <a href="#" className="hover:text-purple-600 transition">Inner Space</a>
                <a href="#" className="hover:text-purple-600 transition">Healing Stories</a>
                <a href="#" className="hover:text-purple-600 transition">Contact</a>
                <a href="#" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  SHOP NOW
                </a>
              </nav>
            </div>
          </header>

          {/* Hero – GIỐNG HỆT INNER WAVE SAU INTRO */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #ec4899 100%)",
              }}
            />

            <div className="relative z-10 text-center text-white px-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                INNER
                  WAVE
              </h1>
            </div>
          </section>

          {/* Cards */}
          <section className="py-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
                <FlipImageCard frontImg="/img1.png" backImg="/img4.png" />
                <FlipImageCard frontImg="/img2.png" backImg="/img5.png" />
                <FlipImageCard frontImg="/img3.png" backImg="/img6.png" />
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default HomePage;