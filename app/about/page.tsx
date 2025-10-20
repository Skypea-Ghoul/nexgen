"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Users, Target, Rocket, Search, Edit, Send } from "lucide-react";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 100 });
  }, []);

  const methodology = [
    { icon: Search, title: "Riset Mendalam", description: "Setiap artikel dan panduan didasarkan pada studi, laporan, dan data terverifikasi dari sumber terkemuka." },
    { icon: Users, title: "Wawancara Ahli", description: "Kami berkolaborasi dengan para praktisi dan akademisi di bidang AI untuk memberikan perspektif yang otentik." },
    { icon: Edit, title: "Studi Kasus Nyata", description: "Menganalisis implementasi AI di dunia nyata, baik keberhasilan maupun kegagalannya, sebagai bahan pembelajaran." },
    { icon: Send, title: "Publikasi Terstruktur", description: "Menyajikan konten yang kompleks dalam format yang mudah dipahami, terstruktur, dan actionable bagi pembaca." }
  ];

  return (
    <main className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center mb-32">
        <div className="mb-4" data-aos="fade-down">
          <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider" 
          style={{
            background: "rgba(57,255,20,0.08)",
            border: "1px solid rgba(57,255,20,0.2)",
            color: "var(--color-primary)",
          }}>
            Tentang Kami
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up" style={{ color: "var(--color-primary)" }}>
          Menjembatani Peluang
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200" style={{ color: "var(--color-text-secondary)" }}>
          Kami adalah tim pegiat teknologi dan edukator yang percaya bahwa pemahaman tentang AI adalah kunci untuk membuka potensi karir di masa depan. Website ini lahir dari kegelisahan melihat ketakutan dan kesalahpahaman tentang AI, dan kami bertujuan untuk mengubahnya menjadi peluang melalui edukasi yang terpercaya. 
        </p>
      </section>

      {/* Vision */}
      <section className="w-full max-w-6xl mx-auto mb-32">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20" data-aos="fade-up">
          <div className="mb-4 text-center">
            <Rocket size={48} color="#8F00FF" strokeWidth={1.5} className="inline-block" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center text-glow-purple">Visi Website</h2>
          <p className="text-xl text-center leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            "Menjadi sumber daya terdepan bagi profesional dan pelajar yang ingin beradaptasi dan unggul di era Kecerdasan Buatan." 
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="w-full max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            Metodologi Konten Kami
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
            Bagaimana kami memastikan setiap konten yang Anda baca berkualitas, relevan, dan terpercaya. 
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methodology.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm" data-aos-delay={index * 100} data-aos="zoom-in">
                <div className="mb-4 inline-block p-3 rounded-xl bg-white/5"><Icon size={32} color="var(--color-primary)" /></div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>{item.title}</h3>
                <p style={{ color: "var(--color-text-secondary)" }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
