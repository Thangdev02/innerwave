import React from "react";

const HomePage = () => {
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
      {/* Banner Section - thay thế HeroIntro */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="/BannerHome.png" 
          alt="Inner Wave Banner" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback nếu ảnh không load được
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #dc2626 100%)';
          }}
        />
        
        
      
      </section>

      
      {/* Cards */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            <a href="/journey-tracker"> <FlipImageCard frontImg="/img1.png" backImg="/img4.png" /></a>
            <a href="/inner-space"> <FlipImageCard frontImg="/img2.png" backImg="/img5.png" /></a>
            <a href="/blog"><FlipImageCard frontImg="/img3.png" backImg="/img6.png" /></a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;