// ============================================
// FILE: app/components/HeroSection.tsx (Updated with id)
// ============================================
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const mySplit = new SplitType(titleRef.current, { types: "chars" });
      gsap.fromTo(
        mySplit.chars,
        { y: 80, opacity: 0, rotationX: -15 },
        { y: 0, opacity: 1, rotationX: 0, stagger: 0.03, duration: 1.2, ease: "power4.out" }
      );
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const offsetTop = element.offsetTop - 100; // Adjust offset as needed
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }
};

  return (
    <section id="home" className="w-full max-w-4xl text-center mb-20 mt-28">
      <div className="mb-4" data-aos="fade-down">
        <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider" 
          style={{
            background: "rgba(57,255,20,0.08)",
            border: "1px solid rgba(57,255,20,0.2)",
            color: "var(--color-primary)",
          }}>
          Launching 2025
        </span>
      </div>
      
      <h1 ref={titleRef} className="mb-6 text-5xl md:text-7xl leading-tight font-bold" data-aos="fade-up" data-aos-delay="200">
        AI & Karir Era Baru
      </h1>
      
      <p
        className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Siapkan diri Anda untuk revolusi kerja. Temukan insight tentang pekerjaan yang akan terdisrupsi dan skill yang paling dicari di era Kecerdasan Buatan. 
      </p>

      <div className="flex gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
        <a
          href="#features"
          onClick={(e) => scrollToSection(e, 'features')}
        className="inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(57,255,20,0.15), rgba(143,0,255,0.1))",
          border: "1px solid rgba(57,255,20,0.3)",
          color: "var(--color-primary)",
          boxShadow: "0 0 20px rgba(57,255,20,0.15)"
          }}
        >
          Jelajahi Materi
        </a>
        <a
          href="#timeline"
          onClick={(e) => scrollToSection(e, 'timeline')}
        className="inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--color-text-primary)",
        }}
        >
          Lihat Panduan
        </a>
      </div>
    </section>
  );
}