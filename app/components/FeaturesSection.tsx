// ============================================
// FILE: app/components/FeaturesSection.tsx (Updated with icons)
// ============================================
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code, ShieldCheck, Scale, Mic, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: "Prompt Engineering",
    description: "Kuasai seni berkomunikasi dengan AI untuk menghasilkan output yang presisi, kreatif, dan relevan sesuai kebutuhan.",
    items: ["Dasar-dasar LLM", "Teknik Zero-shot & Few-shot", "Chain-of-Thought Prompting"],
    hoverColor: "green-500"
  },
  {
    icon: Brain,
    title: "Analisis Data dengan AI",
    description: "Manfaatkan machine learning untuk mengekstrak insight, memprediksi tren, dan membuat keputusan berbasis data secara efisien.",
    items: ["Python untuk Data Science", "Visualisasi Data Interaktif", "Model Prediktif"],
    hoverColor: "purple-500"
  },
  {
    icon: Scale,
    title: "Etika & Kebijakan AI",
    description: "Pahami isu bias, privasi, dan regulasi untuk memastikan implementasi AI yang bertanggung jawab dan adil.",
    items: ["Audit Algoritma", "Regulasi GDPR & AI Act", "Studi Kasus Etika"],
    hoverColor: "blue-500"
  },
  {
    icon: Code,
    title: "Low-Code/No-Code AI",
    description: "Bangun aplikasi cerdas tanpa perlu coding mendalam. Demokratisasi pengembangan AI untuk semua kalangan.",
    items: ["Platform Drag-and-Drop", "Integrasi API AI", "Otomasi Proses Bisnis"],
    hoverColor: "green-500"
  },
  {
    icon: Mic,
    title: "AI-Powered Content Creation",
    description: "Tingkatkan kreativitas dan produktivitas dalam membuat tulisan, gambar, dan video dengan bantuan tool AI generatif.",
    items: ["Copywriting dengan GPT-4", "Generasi Gambar (Midjourney)", "Video Editing Otomatis"],
    hoverColor: "yellow-500"
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Siber di Era AI",
    description: "Lindungi aset digital dari ancaman siber yang semakin canggih dengan sistem deteksi anomali berbasis AI.",
    items: ["Deteksi Ancaman Otomatis", "Analisis Malware AI", "Zero Trust Architecture"],
    hoverColor: "red-500"
  }
];

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card");
      
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -10,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }
  }, []);

  return (
   <section id="features" ref={featuresRef} className="w-full max-w-6xl mb-32">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--color-primary)" }}>
          Mengasah Skill Masa Depan
        </h2>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Panduan hard skill dan soft skill kunci untuk unggul di era Kecerdasan Buatan. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article 
              key={index}
              className={`feature-card group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-${feature.hoverColor}/30 transition-all duration-500`}
            >
              <div className="mb-4 p-3 rounded-xl bg-white/5 inline-block">
                <Icon size={32} color="var(--color-primary)" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                {feature.title}
              </h3>
              <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {feature.description}
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {feature.items.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}