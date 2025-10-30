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
      })

      // Lông vũ bay vào
      .fromTo(
        ".feather-top",
        { opacity: 0, y: -150, x: -50, rotate: -20 },
        { opacity: 1, y: 0, x: 0, rotate: 0, duration: 2, ease: "power2.out" },
        "-=2.8"
      )
      .fromTo(
        ".feather-bottom",
        { opacity: 0, y: 150, x: 50, rotate: 20 },
        { opacity: 1, y: 0, x: 0, rotate: 0, duration: 2, ease: "power2.out" },
        "-=2.6"
      );

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

      // 4. LOGO + LÔNG VŨ mờ dần (đồng bộ với chữ)
      .to(
        [".logo", ".feather-top", ".feather-bottom"],
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

      // 6. Nền gradient + INNER WAVE
      .to(".intro-bg", {
        background:
          "linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #ec4899 100%)",
        duration: 1.8,
        ease: "power2.inOut",
      })
      .fromTo(
        ".text-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
        "-=1.2"
      );
  }, [onFinish]);

  return (
    <section className="fixed inset-0 flex items-center justify-center intro-bg bg-[#F8E1B5] overflow-hidden">
      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Logo TS"
        className="logo absolute w-[80vw] md:w-[60vw] max-w-none"
        initial={{ opacity: 0 }}
      />

      {/* Feather trên */}
      <motion.img
        src="/feather.png"
        alt="Feather top"
        className="feather-top absolute top-[15%] left-[25%] w-16 opacity-0"
      />

      {/* Feather dưới */}
      <motion.img
        src="/feather.png"
        alt="Feather bottom"
        className="feather-bottom absolute bottom-[15%] right-[25%] w-16 opacity-0"
      />

      {/* Text “TÂM SÓNG” */}
      <h1
        ref={textRef}
        className="text-ts absolute text-5xl md:text-8xl font-extrabold text-[#3A7D4F] opacity-0 tracking-wide text-center leading-tight"
        style={{ clipPath: "circle(100% at 50% 50%)" }}
      >
        TÂM <br /> SÓNG
      </h1>

      {/* Text “INNER WAVE” */}
      <motion.h1
        className="text-inner absolute text-5xl md:text-7xl font-bold text-white opacity-0"
      >
        INNER WAVE
      </motion.h1>
    </section>
  );
};

export default HeroIntro;