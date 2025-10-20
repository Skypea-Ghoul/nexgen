"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Banknote, Bot, BarChart2, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    quarter: "Studi Kasus 1",
    title: "Menemukan Harga Premium di Lokasi yang Terjangkau",
    description: "Menganalisis data harga di berbagai kota untuk mengungkap dualitas pasar: meskipun harga median terjangkau, selalu ada 'harta karun' berupa produk atau properti premium dengan nilai jauh di atas rata-rata.",
    image: "/images/studi-kasus.jpeg",
    icon: BarChart2,
    color: "#39FF14",
    bgColor: "rgba(57,255,20,0.1)"
  },
  {
    quarter: "Analisis Dampak",
    title: "Revolusi AI Agent & n8n Workflows",
    description: "Bagaimana platform otomasi seperti n8n yang ditenagai AI Agent mengubah alur kerja. Tugas-tugas repetitif kini dapat diotomatisasi sepenuhnya, menggeser peran manusia menjadi pengawas dan strategis.",
    image: "/images/workflow-automation.png",
    icon: Zap,
    color: "#8F00FF",
    bgColor: "rgba(143,0,255,0.1)"
  },
  {
    quarter: "Prediksi Tren",
    title: "Peran Analis Keuangan",
    description: "AI kini mengambil alih analisis prediktif dasar, menggeser peran analis menjadi penasihat strategis yang menafsirkan output AI.",
    image: "/images/finance-analysis.png",
    icon: Banknote,
    color: "#3B82F6",
    bgColor: "rgba(59,130,246,0.1)"
  },
  {
    quarter: "Debat & Etika",
    title: "Kapan Manusia Dibutuhkan?",
    description: "Membahas batasan AI dalam empati, kreativitas, dan pengambilan keputusan etis yang krusial, memastikan peran manusia tetap relevan.",
    image: "/images/ai-ethics.png",
    icon: Bot,
    color: "#EAB308",
    bgColor: "rgba(234,179,8,0.1)"
  }
];


export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll(".timeline-item");
      
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }

    // Animated line following scroll - starts invisible
    if (lineRef.current && timelineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { 
          height: "0%",
          opacity: 0 
        },
        {
          height: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
   <section id="timeline" ref={timelineRef} className="w-full max-w-5xl mb-32">
      <div className="text-center mb-20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--color-primary)" }}>
          Memahami Disrupsi & Otomasi
        </h2>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Studi kasus tentang pekerjaan yang paling rentan dan bagaimana teknologi membentuk ulang peran manusia. 
        </p>
      </div>

      <div className="relative">
        {/* Animated gradient line */}
        <div 
          ref={lineRef}
          className="absolute left-8 md:left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-500 via-purple-500 to-blue-500"
          style={{ height: "0%", opacity: 0 }}
        ></div>

        <div className="space-y-16">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            const TextContent = () => (
              <>
                <div className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-mono" 
                     style={{ background: item.bgColor, color: item.color }}>
                  {item.quarter}
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>{item.title}</h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {item.description}
                </p>
              </>
            );

            const ImageContent = () => (
              <img src={item.image} 
                   alt={item.title}
                   className="rounded-2xl w-full h-48 object-cover border border-white/10" />
            );

            return (
              <div 
                key={index}
                className="timeline-item relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* --- IKON DI TENGAH --- */}
                <div 
                  className="absolute left-8 md:left-1/2 top-0 w-12 h-12 rounded-full -translate-x-1/2 flex items-center justify-center border-2"
                  style={{ 
                    backgroundColor: item.color,
                    borderColor: item.color,
                    boxShadow: `0 0 20px ${item.color}80`
                  }}
                >
                  <Icon size={24} color="#000" strokeWidth={2.5} />
                </div>

                {/* --- MOBILE LAYOUT --- */}
                <div className="md:hidden w-full pl-20 space-y-4">
                  <TextContent />
                  <ImageContent />
                </div>

                {/* --- DESKTOP LAYOUT --- */}
                {isEven ? (
                  <>
                    <div className="hidden md:block w-1/2 text-right pr-16">
                      <TextContent />
                    </div>
                    <div className="hidden md:block w-1/2 pl-16">
                      <ImageContent />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block w-1/2 pr-16">
                      <ImageContent />
                    </div>
                    <div className="hidden md:block w-1/2 text-left pl-16">
                      <TextContent />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

