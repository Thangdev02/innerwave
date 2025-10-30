import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-pink-100 text-green-700 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-7xl md:text-8xl font-extrabold mb-4"
      >
        TÂM SÓNG
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl text-green-800"
      >
        Hòa mình vào làn sóng sáng tạo 🌊
      </motion.p>
    </section>
  );
};

export default HeroSection;
