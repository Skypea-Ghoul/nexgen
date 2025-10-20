// ============================================
// FILE: app/components/TestimonialsSection.tsx
// ============================================
"use client";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Data Analyst, Startup Fintech",
    initials: "AP",
    gradient: "from-green-500 to-green-700",
    testimonial: "Panduan 'Prompt Engineering' di website ini membuka wawasan baru. Saya berhasil mengotomatisasi 80% tugas reporting saya.",
    delay: 100
  },
  {
    name: "Rina S.",
    role: "Mahasiswa Tingkat Akhir",
    initials: "RS",
    gradient: "from-purple-500 to-purple-700",
    testimonial: "Artikel tentang 'Peluang Karir Baru' sangat membantu saya menentukan arah skripsi dan karir setelah lulus. Sangat inspiratif!",
    delay: 200
  },
  {
    name: "Budi Santoso",
    role: "Manajer Pemasaran",
    initials: "BS",
    gradient: "from-blue-500 to-blue-700",
    testimonial: "Berkat checklist 'Skill Masa Depan', saya bisa merancang program upskilling yang relevan untuk tim saya. Luar biasa!",
    delay: 300
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-6xl mb-32">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--color-primary)" }}>
          Kisah Sukses Pembaca Kami
        </h2>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Bagaimana materi kami membantu para profesional dan pelajar beradaptasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-sm" 
            data-aos="zoom-in" 
            data-aos-delay={testimonial.delay}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-xl font-bold`}>
                {testimonial.initials}
              </div>
              <div>
                <div className="font-bold" style={{ color: "var(--color-primary)" }}>
                  {testimonial.name}
                </div>
                <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
            <p style={{ color: "var(--color-text-secondary)" }}>
              {testimonial.testimonial}
            </p>
            <div className="mt-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500">⭐</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}