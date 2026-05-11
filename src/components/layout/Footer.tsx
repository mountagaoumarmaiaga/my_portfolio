import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLang();
  const isLight = theme === "light";

  const borderColor = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)";
  const textMuted = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.3)";
  const textSub = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)";
  const pillBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_experience"), href: "/experience" },
    { label: t("nav_projects"), href: "/projects" },
    { label: t("nav_skills"), href: "/skills" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/mountagaoumarmaiaga", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mountaga-oumar-maiga-182745251", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:mountagaoumarmaiga@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t py-16 px-6" style={{ borderColor }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>M</div>
              <span className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif", color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.75)" }}>
                Mountaga Oumar Maïga
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-5" style={{ color: textSub }}>
              {t("footer_desc")}
            </p>
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("contact_available")}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: textMuted }}>
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-xs transition-colors duration-200 hover:text-purple-400"
                  style={{ color: textSub }}>{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: textMuted }}>
              {t("contact_networks")}
            </div>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ background: pillBg, border: `1px solid ${borderColor}`, color: textSub }}>
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor }}>
          <span className="text-xs" style={{ color: textMuted }}>
            © {new Date().getFullYear()} Mountaga Oumar Maïga — All rights reserved
          </span>
          <span className="text-xs" style={{ color: textMuted }}>
            Co-Founder @ Java Digital Solution
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
