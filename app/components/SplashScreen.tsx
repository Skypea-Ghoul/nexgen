"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// PERBAIKAN 1: Konten teks disesuaikan dengan tema "AI & Karir"
const loadingTexts = [
  "> INITIALIZING LEARNING MODULES...",
  "> ANALYZING CAREER TRAJECTORIES...",
  "> COMPILING SKILL REQUIREMENTS...",
  "> BUILDING KNOWLEDGE BASE...",
  "> GENERATING FUTURE INSIGHTS...",
  "> PREPARING DIGITAL ROADMAP...",
  "> BOOTING UP AI MENTOR...",
];

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Cek ukuran layar untuk optimalisasi mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev + 1) % loadingTexts.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden p-4"
    >
      {/* Background dioptimalkan untuk mobile */}
      <MatrixRain isMobile={isMobile} />

      {/* PERBAIKAN 2: Logo utama dan ukuran font dibuat responsif */}
      <motion.div
        animate={{
          textShadow: [
            "0 0 20px #39FF14, 0 0 40px #39FF14",
            "0 0 30px #39FF14, 0 0 50px #39FF14",
            "0 0 20px #39FF14, 0 0 40px #39FF14",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl md:text-7xl font-bold text-[#39FF14] mb-12 font-mono"
      >
        AI & Karir
      </motion.div>

      {/* PERBAIKAN 3: Ukuran teks dan padding disesuaikan untuk mobile */}
      <div className="text-[#39FF14] text-xs md:text-sm font-mono mb-8 max-w-md w-full text-center space-y-2">
        {loadingTexts.slice(0, Math.floor(progress / 14) + 1).map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={i === phase ? "animate-pulse" : ""}
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* Loading Bar tetap responsif */}
      <div className="w-full max-w-xs md:max-w-md h-1 bg-[#111] border border-[#39FF14] relative overflow-hidden shadow-[0_0_20px_rgba(57,255,20,0.3)]">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          className="h-full bg-gradient-to-r from-[#39FF14] to-[#0A0] shadow-[0_0_20px_#39FF14]"
        />
      </div>

      {/* PERBAIKAN 4: Ukuran font progress dibuat responsif */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="mt-6 text-lg md:text-xl text-[#39FF14] font-mono tracking-[0.3em] shadow-[0_0_10px_#39FF14]"
      >
        LOADING: {Math.floor(Math.min(progress, 100))}%
      </motion.div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39FF14] to-transparent animate-scan" />
      </div>
    </motion.div>
  );
}

// Matrix Rain Component (dioptimalkan)
function MatrixRain({ isMobile }: { isMobile: boolean }) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  // PERBAIKAN 5: Jumlah kolom dikurangi di mobile untuk performa
  const columns = isMobile ? 20 : 40;

  return (
    <div className="absolute inset-0 opacity-10 overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "-20vh" }}
          animate={{ y: "120vh" }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute text-[#39FF14] text-sm font-mono"
          style={{ left: `${(i / columns) * 100}%` }}
        >
          {/* Membuat beberapa karakter jatuh bersamaan */}
          {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((char, index) => (
             <span key={index} style={{ display: 'block' }}>
                {chars[Math.floor(Math.random() * chars.length)]}
             </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
