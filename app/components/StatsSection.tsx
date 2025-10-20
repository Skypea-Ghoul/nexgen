// ============================================
// FILE: app/components/StatsSection.tsx
// ============================================
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".stat-number");
      
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
            },
            onUpdate: function() {
              counter.textContent = Math.ceil(parseFloat(counter.textContent as any)).toLocaleString();
            }
          }
        );
      });
    }
  }, []);

  return (
    <section ref={statsRef} className="w-full max-w-5xl mb-32" data-aos="fade-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm">
          <div className="stat-number text-4xl md:text-5xl font-bold mb-2" data-target="250" style={{ color: "var(--color-primary)" }}>0</div>
          <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>AI Models Trained</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm">
          <div className="stat-number text-4xl md:text-5xl font-bold mb-2" data-target="99" style={{ color: "var(--color-primary)" }}>0</div>
          <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Uptime Percentage</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm">
          <div className="stat-number text-4xl md:text-5xl font-bold mb-2" data-target="1000" style={{ color: "var(--color-primary)" }}>0</div>
          <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Enterprise Clients</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm">
          <div className="stat-number text-4xl md:text-5xl font-bold mb-2" data-target="24" style={{ color: "var(--color-primary)" }}>0</div>
          <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Countries Served</div>
        </div>
      </div>
    </section>
  );
}
