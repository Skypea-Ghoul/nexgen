// ============================================
// FILE: app/components/CTASection.tsx (Updated with id)
// ============================================
"use client";

export default function CTASection() {
  return (
    <section id="contact" className="w-full max-w-5xl mb-32">
      <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
            Siap Menghadapi Masa Depan?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Mulai perjalanan Anda untuk beradaptasi dan unggul di era Kecerdasan Buatan. Semua materi kami gratis dan dapat diakses kapan saja.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #39FF14, #0FA)",
                color: "#000",
                boxShadow: "0 0 30px rgba(57,255,20,0.3)"
              }}
            >
              Jelajahi Materi Baru
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "var(--color-text-primary)",
              }}
            >
              Unduh Panduan
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Akses Gratis Selamanya</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Konten Berbasis Riset</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Diperbarui Setiap Minggu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}