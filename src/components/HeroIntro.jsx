import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const HeroIntro = ({ onFinish }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onFinish && onFinish(),
    });

    // 1. Delay màn hình đen
    tl.to({}, { duration: 1.2 });

    // 2. Nền vàng kem + Logo to → nhỏ về ~30px (scale 0.3)
    tl.set(".intro-bg", { backgroundColor: "#F8E1B5" })
      .fromTo(
        ".logo",
        { opacity: 0, scale: 3 },
        { opacity: 1, scale: 1.4, duration: 1.5, ease: "power3.out" }
      )
      .to(".logo", {
        scale: 0.01, // ~30px (đúng Figma)
        duration: 1.6,
        ease: "power2.inOut",
      });

    // 3. LOGO NHỎ XONG → CHỮ TÂM SÓNG: FILL TỪ NGOÀI VÀO TRONG
    tl.set(textRef.current, {
      opacity: 1,
      clipPath: "circle(100% at 50% 50%)",
    })
      .to(textRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1.6,
        ease: "power3.in",
      }, "+=0.1")

      // 4. LOGO mờ dần (đồng bộ với chữ)
      .to(
        ".logo",
        {
          opacity: 0,
          duration: 1.0,
          ease: "power2.in",
        },
        "-=1.2" // Bắt đầu mờ khi chữ còn 1.2s → mượt như Figma
      )

      // 5. CHỮ TÂM SÓNG: nhỏ lại + mờ dần (sau khi đã hút vào tâm)
      .to(textRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "+=0.1") // Chờ 0.1s sau khi hút xong

      // 6. Nền chuyển sang xanh base + CÁC ĐỐM MÀU HIỆN RA + INNER WAVE
      .to(".intro-bg", {
        backgroundColor: "#1e40af", // Base color xanh dương
        duration: 1.8,
        ease: "power2.inOut",
      })
      // Các đốm màu fade in cùng lúc với nền chuyển màu
      .to(".gradient-blobs", {
        opacity: 1,
        duration: 1.8,
        ease: "power2.inOut",
      }, "-=1.8") // Bắt đầu cùng lúc với background
      .fromTo(
        ".text-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
        "-=1.2"
      );
  }, [onFinish]);

  return (
    <section className="fixed inset-0 flex items-center justify-center intro-bg bg-[#F8E1B5] overflow-hidden">
      {/* Background với các đốm màu tròn giống final - ẩn ban đầu, sẽ fade in */}
      <div className="gradient-blobs absolute inset-0 opacity-0 pointer-events-none">
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

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Logo TS"
        className="logo absolute w-[80vw] md:w-[60vw] max-w-none z-10"
        initial={{ opacity: 0 }}
      />

      {/* Text "TÂM SÓNG" */}
      <h1
        ref={textRef}
        className="text-ts absolute text-5xl md:text-8xl font-extrabold text-[#3A7D4F] opacity-0 tracking-wide text-center leading-tight z-10"
        style={{ clipPath: "circle(100% at 50% 50%)" }}
      >
        TÂM <br /> SÓNG
      </h1>

      {/* Text "INNER WAVE" */}
      <motion.h1
        className="text-inner absolute text-5xl md:text-7xl font-bold text-white opacity-0 z-10"
      >
        INNER WAVE
      </motion.h1>
    </section>
  );
};

export default HeroIntro;