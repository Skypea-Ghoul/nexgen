"use client";

import { useEffect, useState } from "react";
// Pastikan komponen 3D diimpor dengan benar
import Scene3D from "./components/Scene3D"; 
import SplashScreen from "./components/SplashScreen";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import TimelineSection from "./components/TimelineSection";
import UseCasesSection from "./components/UseCasesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

// Show splash only once per client session (will reset on full page refresh)
export default function Home() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !Boolean((window as any).__splashShown);
  });

  useEffect(() => {
    // Inisialisasi AOS setelah loading selesai
    if (!loading) {
      const AOS = require("aos");
      AOS.init({
        duration: 800,
        once: true,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") (window as any).__splashShown = true;
    }, 3500);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {loading && <SplashScreen />}
      <Scene3D />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start p-4 md:p-8">
        <HeroSection />
        <StatsSection />
        <FeaturesSection /> {/* Pastikan komponen ini ada */}
        <TimelineSection />
        <UseCasesSection /> {/* Pastikan komponen ini ada */}
        <TestimonialsSection /> {/* Pastikan komponen ini ada */}
        <CTASection /> {/* Pastikan komponen ini ada */}
      </main>
    </>
  );
}