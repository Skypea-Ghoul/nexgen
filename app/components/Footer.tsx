"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
  ];

  return (
    <footer className="w-full max-w-6xl py-12 border-t border-white/10" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            AI & Karir
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            Membongkar dampak AI, mengasah skill, dan menemukan peluang kerja masa depan.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={`Follow us on ${link.name}`}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4" style={{ color: "var(--color-primary)" }}>Materi</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <li><Link href="/#features" className="hover:text-green-500 transition-colors">Skill & Teknologi</Link></li>
            <li><Link href="/#timeline" className="hover:text-green-500 transition-colors">Disrupsi & Otomasi</Link></li>
            <li><Link href="/#applications" className="hover:text-green-500 transition-colors">Peluang Karir</Link></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Panduan</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4" style={{ color: "var(--color-primary)" }}>Tentang</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <li><Link href="/about" className="hover:text-green-500 transition-colors">Tentang Kami</Link></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Metodologi</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Kolaborasi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4" style={{ color: "var(--color-primary)" }}>Legal</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <div>© {new Date().getFullYear()} AI & Karir Era Baru. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-green-500 transition-colors">Kontak</Link>
        </div>
      </div>
    </footer>
  );
}
