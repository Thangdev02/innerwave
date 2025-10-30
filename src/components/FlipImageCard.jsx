import React from "react";

const FlipImageCard = ({ frontImg, backImg }) => {
  return (
    <div className="group w-72 h-96 [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-xl">
          <img
            src={frontImg}
            alt="Front"
            className="w-full h-full object-cover rounded-3xl"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x1200/fee6ce/000000?text=FRONT";
            }}
          />
        </div>
        {/* Back */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-white rounded-3xl shadow-xl">
          <img
            src={backImg}
            alt="Back"
            className="w-full h-full object-cover rounded-3xl"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x1200/fde68a/000000?text=BACK";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipImageCard;