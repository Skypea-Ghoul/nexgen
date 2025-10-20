"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 100 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Kami",
      content: "hello@aikarir.tech",
      link: "mailto:hello@aikarir.tech"
    },
    {
      icon: MessageSquare,
      title: "Kolaborasi",
      content: "partnership@aikarir.tech",
      link: "mailto:partnership@aikarir.tech"
    },
    {
      icon: MapPin,
      title: "Lokasi",
      content: "Jakarta, Indonesia",
      link: "#"
    }
  ];

  return (
    <main className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      <section className="w-full max-w-5xl mx-auto text-center mb-20">
        <div className="mb-4" data-aos="fade-down">
          <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider" 
          style={{
            background: "rgba(57,255,20,0.08)",
            border: "1px solid rgba(57,255,20,0.2)",
            color: "var(--color-primary)",
          }}>
            Terhubung Dengan Kami
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up" style={{ color: "var(--color-primary)" }}>
          Kontak & Kolaborasi
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200" style={{ color: "var(--color-text-secondary)" }}>
          Punya pertanyaan, masukan, atau ide kolaborasi konten? Kami sangat senang mendengar dari Anda. Mari berdiskusi dan membangun komunitas bersama.
        </p>
      </section>

      <section className="w-full max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.link}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-green-500/30 transition-all duration-500 text-center group"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="mb-4 inline-flex p-4 rounded-2xl bg-white/5">
                  <Icon size={32} color="var(--color-primary)" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-primary)" }}>
                  {info.title}
                </h3>
                <p className="text-sm group-hover:text-green-500 transition-colors" style={{ color: "var(--color-text-secondary)" }}>
                  {info.content}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm" data-aos="fade-right">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
                Kirim Pesan
              </h2>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Isi formulir di bawah dan kami akan segera membalasnya.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-green-500/50 outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-green-500/50 outline-none transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-green-500/50 outline-none transition-colors" placeholder="Bagaimana kami bisa membantu?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-green-500/50 outline-none transition-colors resize-none" placeholder="Ceritakan lebih lanjut..."></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #39FF14, #0FA)", color: "#000", boxShadow: "0 0 30px rgba(57,255,20,0.3)" }}>
                <Send size={20} /> Send Message
              </button>
            </form>
        </div>
      </section>
    </main>
  );
}
