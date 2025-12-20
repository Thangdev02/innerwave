import React, { useEffect } from "react";
import { motion } from "framer-motion";

const HeroIntro = ({ onFinish }) => {
  useEffect(() => {
    // Tự động chuyển sang main sau 3 giây
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Background với các đốm màu tròn giống Figma */}
      <div className="absolute inset-0">
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
      </div>

      {/* Text INNER WAVE với animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
          INNER WAVE
        </h1>
      </motion.div>

      {/* Optional: Loading indicator */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-white/30"
      />
    </motion.div>
  );
};

export default HeroIntro;