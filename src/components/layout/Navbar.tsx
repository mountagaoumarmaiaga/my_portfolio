import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLang();
  const isLight = theme === "light";

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_experience"), href: "/experience" },
    { label: t("nav_skills"), href: "/skills" },
    { label: t("nav_projects"), href: "/projects" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const bgColor = isLight
    ? scrolled ? "rgba(245,245,247,0.9)" : "rgba(245,245,247,0.6)"
    : scrolled ? "rgba(8,8,9,0.9)" : "rgba(8,8,9,0.5)";
  const borderColor = isLight
    ? scrolled ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.06)"
    : scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)";
  const textColor = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.55)";
  const activeColor = isLight ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)";
  const pillBg = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      >
        <motion.nav
          animate={{ background: bgColor, borderColor, backdropFilter: "blur(24px)" }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between w-full max-w-6xl px-5 py-3 rounded-2xl border"
          style={{ boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.15)" : "none" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
              M
            </div>
            <span className="text-sm font-semibold tracking-wide transition-colors"
              style={{ color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)" }}>
              Mountaga
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="relative px-3.5 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{ color: isActive ? activeColor : textColor }}
                    whileHover={{ color: activeColor }}
                  >
                    {isActive && (
                      <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                        style={{ background: pillBg }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Lang toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all"
              style={{
                background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.55)",
              }}
            >
              <Languages size={13} />
              {lang.toUpperCase()}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.55)",
              }}
            >
              <motion.div
                animate={{ rotate: isLight ? 0 : 180 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {isLight ? <Moon size={15} /> : <Sun size={15} />}
              </motion.div>
            </motion.button>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary text-xs px-5 py-2.5"
              >
                {t("nav_cta")}
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{
              background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
              color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 md:hidden flex flex-col"
        style={{
          background: isLight ? "rgba(245,245,247,0.97)" : "rgba(8,8,9,0.97)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link href={link.href}
                className="block px-8 py-3 text-2xl font-bold transition-colors"
                style={{ fontFamily: "Syne, sans-serif", color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)" }}>
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Mobile controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mt-6"
          >
            <button onClick={toggleLang} className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
              }}>
              {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
            </button>
            <button onClick={toggleTheme} className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
              }}>
              {isLight ? "🌙 Dark" : "☀️ Light"}
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4"
          >
            <Link href="/contact"><button className="btn-primary">{t("nav_cta")}</button></Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
