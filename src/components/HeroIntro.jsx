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

    // 2. Nền vàng kem + Logo to → nhỏ với easing mượt hơn
    tl.set(".intro-bg", { backgroundColor: "#F8E1B5" })
      .fromTo(
        ".logo",
        { opacity: 0, scale: 3, filter: "blur(20px)" },
        { 
          opacity: 1, 
          scale: 1.4, 
          filter: "blur(0px)",
          duration: 1.8, 
          ease: "expo.out" 
        }
      )
      .to(".logo", {
        scale: 0.01,
        filter: "blur(5px)",
        duration: 1.8,
        ease: "expo.inOut",
      });

    // 3. CHỮ TÂM SÓNG: FILL TỪ NGOÀI VÀO với hiệu ứng wave
    tl.set(textRef.current, {
      opacity: 1,
      clipPath: "circle(100% at 50% 50%)",
      scale: 1.1,
    })
      .to(textRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        scale: 0.95,
        duration: 1.8,
        ease: "power4.in",
      }, "+=0.15")

      // 4. LOGO mờ dần mượt mà hơn
      .to(
        ".logo",
        {
          opacity: 0,
          scale: 0.005,
          filter: "blur(15px)",
          duration: 1.4,
          ease: "expo.in",
        },
        "-=1.5"
      )

      // 5. CHỮ TÂM SÓNG: nhỏ lại + mờ dần siêu mượt
      .to(textRef.current, {
        scale: 0.6,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.4,
        ease: "expo.inOut",
      }, "+=0.15")

      // 6. Nền chuyển sang xanh base với các đốm màu
      .to(".intro-bg", {
        backgroundColor: "#1e40af",
        duration: 2.0,
        ease: "expo.inOut",
      })
      // Các đốm màu xuất hiện với stagger effect
      .to(".blob-1", {
        opacity: 0.8,
        scale: 1.1,
        duration: 2.0,
        ease: "expo.out",
      }, "-=2.0")
      .to(".blob-2", {
        opacity: 0.75,
        scale: 1.05,
        duration: 2.0,
        ease: "expo.out",
      }, "-=1.85")
      .to(".blob-3", {
        opacity: 0.7,
        scale: 1.08,
        duration: 2.0,
        ease: "expo.out",
      }, "-=1.7")
      .to(".blob-4", {
        opacity: 0.85,
        scale: 1.12,
        duration: 2.0,
        ease: "expo.out",
      }, "-=1.55")
      .to(".blob-5", {
        opacity: 0.75,
        scale: 1.06,
        duration: 2.0,
        ease: "expo.out",
      }, "-=1.4")
      .to(".blob-6", {
        opacity: 0.7,
        scale: 1.04,
        duration: 2.0,
        ease: "expo.out",
      }, "-=1.25")
      
      // INNER WAVE với nhiều layer animation
      .fromTo(
        ".text-inner",
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.8,
          filter: "blur(20px)",
          letterSpacing: "0.5em"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: "blur(0px)",
          letterSpacing: "0.1em",
          duration: 2.0, 
          ease: "expo.out" 
        },
        "-=1.5"
      )
      // Thêm glow effect cho text
      .to(".text-inner", {
        textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)",
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      }, "-=0.5");
  }, [onFinish]);

  return (
    <section className="fixed inset-0 flex items-center justify-center intro-bg bg-[#F8E1B5] overflow-hidden">
      {/* Background với các đốm màu - mỗi đốm có class riêng */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Đốm xanh dương đậm bên trái */}
        <div 
          className="blob-1 absolute top-0 left-0 w-[800px] h-[800px] opacity-0"
          style={{
            background: "radial-gradient(circle, #1e3a8a 0%, transparent 70%)",
            transform: "translate(-30%, -20%) scale(0.9)",
            filter: "blur(60px)",
          }}
        />

        {/* Đốm tím ở giữa trái */}
        <div 
          className="blob-2 absolute top-1/4 left-1/4 w-[700px] h-[700px] opacity-0"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)",
            transform: "translate(-50%, -20%) scale(0.95)",
            filter: "blur(50px)",
          }}
        />

        {/* Đốm tím hồng ở giữa */}
        <div 
          className="blob-3 absolute top-1/3 left-1/2 w-[600px] h-[600px] opacity-0"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 60%)",
            transform: "translate(-50%, -30%) scale(0.92)",
            filter: "blur(55px)",
          }}
        />

        {/* Đốm hồng đỏ bên phải */}
        <div 
          className="blob-4 absolute top-0 right-0 w-[900px] h-[900px] opacity-0"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
            transform: "translate(35%, -25%) scale(0.88)",
            filter: "blur(65px)",
          }}
        />

        {/* Đốm xanh lá góc dưới phải */}
        <div 
          className="blob-5 absolute bottom-0 right-0 w-[750px] h-[750px] opacity-0"
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 65%)",
            transform: "translate(30%, 40%) scale(0.94)",
            filter: "blur(58px)",
          }}
        />

        {/* Đốm xanh cyan ở giữa phải */}
        <div 
          className="blob-6 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-0"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 55%)",
            transform: "translate(20%, 20%) scale(0.96)",
            filter: "blur(45px)",
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
        style={{ willChange: "transform, opacity, filter" }}
      />

      {/* Text "TÂM SÓNG" */}
      <h1
        ref={textRef}
        className="text-ts absolute text-5xl md:text-8xl font-extrabold text-[#3A7D4F] opacity-0 tracking-wide text-center leading-tight z-10"
        style={{ 
          clipPath: "circle(100% at 50% 50%)",
          willChange: "transform, opacity, clip-path, filter"
        }}
      >
        TÂM <br /> SÓNG
      </h1>

      {/* Text "INNER WAVE" */}
      <motion.h1
        className="text-inner absolute text-5xl md:text-7xl font-bold text-white opacity-0 z-10"
        style={{ willChange: "transform, opacity, filter, letter-spacing, text-shadow" }}
      >
        INNER WAVE
      </motion.h1>
    </section>
  );
};

export default HeroIntro;