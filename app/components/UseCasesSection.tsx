// ============================================
// FILE: app/components/UseCasesSection.tsx (Updated with id)
// ============================================
"use client";

import { Scale, MessageCircle, Bot, Zap } from "lucide-react";

const useCases = [
  {
    icon: Scale,
    title: "AI Ethicist",
    description: "Profesi yang memastikan pengembangan dan penerapan AI sejalan dengan nilai-nilai etika, keadilan, dan tidak merugikan masyarakat.",
    tags: ["Regulasi", "Audit Bias", "Tanggung Jawab"],
    hoverColor: "green-500",
    tagBg: "rgba(57,255,20,0.1)",
    tagColor: "var(--color-primary)"
  },
  {
    icon: MessageCircle,
    title: "Machine Learning Translator",
    description: "Menjembatani komunikasi antara tim teknis (data scientist) dan tim bisnis, menerjemahkan model kompleks menjadi strategi bisnis yang actionable.",
    tags: ["Komunikasi", "Strategi Bisnis", "Manajemen Proyek"],
    hoverColor: "blue-500",
    tagBg: "rgba(59,130,246,0.1)",
    tagColor: "#3B82F6"
  },
  {
    icon: Bot,
    title: "AI Trainer / Conversation Designer",
    description: "Merancang alur percakapan, melatih, dan menyempurnakan chatbot atau asisten virtual agar terdengar lebih manusiawi dan efektif.",
    tags: ["UX Writing", "Psikologi", "Analisis Data"],
    hoverColor: "purple-500",
    tagBg: "rgba(143,0,255,0.1)",
    tagColor: "#8F00FF"
  },
  {
    icon: Zap,
    title: "Automation Specialist",
    description: "Mengidentifikasi proses bisnis yang dapat diotomatisasi dengan AI dan Robotic Process Automation (RPA) untuk meningkatkan efisiensi.",
    tags: ["Analisis Proses", "RPA", "Efisiensi Operasional"],
    hoverColor: "yellow-500",
    tagBg: "rgba(234,179,8,0.1)",
    tagColor: "#EAB308"
  }
];

export default function UseCasesSection() {
     const getHoverBorderColor = (hoverColor: string) => {
    switch (hoverColor) {
      case "green-500": return "rgba(57,255,20,0.3)";
      case "blue-500": return "rgba(59,130,246,0.3)";
      case "purple-500": return "rgba(143,0,255,0.3)";
      case "yellow-500": return "rgba(234,179,8,0.3)";
      default: return "rgba(255,255,255,0.1)";
    }
  };
  return (
    <section id="applications" className="w-full max-w-6xl mb-32" data-aos="fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--color-primary)" }}>
          Menemukan Peluang Karir Baru
        </h2>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Eksplorasi bagaimana AI tidak hanya menggeser, tetapi juga menciptakan profesi-profesi baru. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <div 
              key={index}
              className={`group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-${useCase.hoverColor}/30 transition-all duration-500`}
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                transition: "border-color 0.5s ease",
                ["--hover-border" as string]: getHoverBorderColor(useCase.hoverColor)
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLDivElement).style.borderColor = getHoverBorderColor(useCase.hoverColor);
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="mb-4 p-3 rounded-xl bg-white/5 inline-block">
                <Icon size={32} color="var(--color-primary)" strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
                {useCase.title}
              </h4>
              <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full text-xs" 
                    style={{ background: useCase.tagBg, color: useCase.tagColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}