import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- 1. Import Footer di sini

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AI & Karir Era Baru",
  description: "Membongkar Dampak Kecerdasan Buatan, Mengasah Skill, dan Menemukan Peluang Kerja Masa Depan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <Navbar />
        {children}
        <div className="flex justify-center px-4 md:px-8">
            <Footer /> {/* <-- 2. Tambahkan Footer di sini, setelah konten utama */}
        </div>
      </body>
    </html>
  );
}
