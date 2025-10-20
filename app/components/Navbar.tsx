"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },               // <-- point to root
    { name: "Technologies", href: "/#features" },
    { name: "Timeline", href: "/#timeline" },
    { name: "Applications", href: "/#applications" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const sections = ["home", "features", "timeline", "applications"];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // initialize on mount
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If clicking Home while already on "/", smooth-scroll to #home instead of full navigation
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("home");
      if (element) {
        const offsetTop = element.offsetTop - 100; // adjust for fixed navbar
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        setActiveSection("home");
      }
      return;
    }

    // Handle same-page hash links (e.g. "/#features")
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const offsetTop = element.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }

    // Otherwise let Link perform navigation (to root or other pages)
  };

  const isActive = (href: string) => {
    if (href === "/about") return pathname === "/about";
    if (href === "/contact") return pathname === "/contact";
    if (href === "/") return pathname === "/" && activeSection === "home";
    if (href.startsWith("/#")) {
      const section = href.replace("/#", "");
      return pathname === "/" && activeSection === section;
    }
    return false;
  };

  return (
    <header className="fixed top-6 left-0 z-50 w-full px-4 pointer-events-auto">
      <nav
        className="
          floating-nav
          w-full max-w-6xl mx-auto px-6 py-3 flex items-center justify-between
          bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl
          transform-gpu transition-transform duration-300
        "
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="w-24">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
            onClick={(e) => handleClick(e as any, "/")}
          >
            NEXGEN
          </Link>
        </div>

        <ul className="hidden md:flex items-center justify-center space-x-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e as any, item.href)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    color: active ? "#000" : "var(--color-text-primary)",
                    background: active ? "var(--color-primary)" : "transparent",
                    boxShadow: active ? "0 6px 20px rgba(57,255,20,0.18)" : undefined,
                  }}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="w-24 flex justify-end">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background:
                pathname === "/contact"
                  ? "var(--color-primary)"
                  : "linear-gradient(135deg, rgba(57,255,20,0.2), rgba(143,0,255,0.1))",
              border: "1px solid rgba(57,255,20,0.3)",
              color: pathname === "/contact" ? "#000" : "var(--color-primary)",
              boxShadow: pathname === "/contact" ? "0 8px 30px rgba(57,255,20,0.2)" : undefined,
            }}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}