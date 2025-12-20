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
      

          {/* Hero – GRADIENT VỚI CÁC ĐỐM MÀU TRÒN GIỐNG FIGMA */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Base background - xanh dương chủ đạo */}
            <div 
              className="absolute inset-0"
              style={{
                background: "#1e40af",
              }}
            />
            
            {/* Đốm xanh dương đậm bên trái */}
            <div 
              className="absolute top-0 left-0 w-[800px] h-[800px]"
              style={{
                background: "radial-gradient(circle, #1e3a8a 0%, transparent 70%)",
                transform: "translate(-30%, -20%)",
              }}
            />

            {/* Đốm tím ở giữa trái */}
            <div 
              className="absolute top-1/4 left-1/4 w-[700px] h-[700px]"
              style={{
                background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)",
                transform: "translate(-50%, -20%)",
              }}
            />

            {/* Đốm tím hồng ở giữa */}
            <div 
              className="absolute top-1/3 left-1/2 w-[600px] h-[600px]"
              style={{
                background: "radial-gradient(circle, #a855f7 0%, transparent 60%)",
                transform: "translate(-50%, -30%)",
              }}
            />

            {/* Đốm hồng đỏ bên phải */}
            <div 
              className="absolute top-0 right-0 w-[900px] h-[900px]"
              style={{
                background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
                transform: "translate(35%, -25%)",
              }}
            />

            {/* Đốm xanh lá góc dưới phải */}
            <div 
              className="absolute bottom-0 right-0 w-[750px] h-[750px]"
              style={{
                background: "radial-gradient(circle, #10b981 0%, transparent 65%)",
                transform: "translate(30%, 40%)",
              }}
            />

            {/* Đốm xanh cyan ở giữa phải */}
            <div 
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px]"
              style={{
                background: "radial-gradient(circle, #06b6d4 0%, transparent 55%)",
                transform: "translate(20%, 20%)",
              }}
            />

            {/* Overlay mờ để blend các màu lại */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(124, 58, 237, 0.2) 30%, rgba(168, 85, 247, 0.2) 50%, rgba(220, 38, 38, 0.3) 70%, rgba(16, 185, 129, 0.2) 100%)",
                mixBlendMode: "overlay",
              }}
            />

            <div className="relative z-10 text-center text-white px-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                INNER WAVE
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