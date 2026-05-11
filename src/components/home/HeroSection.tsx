import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const ROLES_FR = [
  "Co-Founder @ Java Digital Solution",
  "Full Stack Engineer",
  "Backend Developer",
  "Infrastructure & Network Specialist",
  "Creative Technologist",
  "Modern Product Builder",
  "Data Scientist",
];
const ROLES_EN = [
  "Co-Founder @ Java Digital Solution",
  "Full Stack Engineer",
  "Backend Developer",
  "Infrastructure & Network Specialist",
  "Creative Technologist",
  "Modern Product Builder",
  "Data Scientist",
];

const useTypewriter = (words: string[], speed = 80, pause = 2200) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
};

const Orb = ({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(60px)" }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const Particle = ({ delay, x }: { delay: number; x: string }) => (
  <motion.div className="absolute w-px rounded-full pointer-events-none"
    style={{ left: x, bottom: "0%", height: Math.random() * 60 + 40 }}
    animate={{ y: [0, -800], opacity: [0, 0.6, 0] }}
    transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, delay, ease: "linear" }}>
    <div className="w-full h-full" style={{ background: "linear-gradient(to top, transparent, rgba(139,92,246,0.5), transparent)" }} />
  </motion.div>
);

const HeroSection = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const roles = lang === "fr" ? ROLES_FR : ROLES_EN;
  const role = useTypewriter(roles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };
  const item = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-main)" }}>

      {!isLight && mounted && (
        <>
          <Orb x="10%" y="20%" size={600} color="rgba(124,58,237,0.25)" delay={0} />
          <Orb x="65%" y="10%" size={500} color="rgba(37,99,235,0.2)" delay={3} />
          <Orb x="40%" y="60%" size={400} color="rgba(217,70,239,0.12)" delay={6} />
          {Array.from({ length: 12 }).map((_, i) => (
            <Particle key={i} delay={i * 1.2} x={`${8 + i * 8}%`} />
          ))}
        </>
      )}
      {isLight && mounted && (
        <>
          <Orb x="10%" y="20%" size={500} color="rgba(124,58,237,0.08)" delay={0} />
          <Orb x="65%" y="10%" size={400} color="rgba(37,99,235,0.07)" delay={3} />
        </>
      )}

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.015)"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.015)"} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Available badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {t("hero_available")}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item}
            className="heading-display text-[clamp(3rem,10vw,8rem)] leading-none mb-6"
            style={{ color: isLight ? "#0a0a0e" : "#ffffff" }}>
            <span className="block">Mountaga</span>
            <span className="block text-gradient">Oumar Maïga</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8 h-10">
            <span style={{ color: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }} className="text-2xl font-light">/</span>
            <span className="text-xl md:text-2xl font-medium" style={{ fontFamily: "Syne, sans-serif", color: isLight ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.7)" }}>
              {role}
              <span className="animate-cursor text-purple-400 ml-0.5">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={item}
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
            style={{ color: isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)" }}>
            {t("hero_description")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/projects">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary gap-2.5 text-sm">
                {t("hero_cta_projects")} <ArrowRight size={16} />
              </motion.button>
            </Link>
            <motion.a href="/CV.pdf" download whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-sm">
              <Download size={16} /> {t("hero_cta_cv")}
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center justify-center gap-4">
            {[
              { icon: Github, href: "https://github.com/mountagaoumarmaiaga" },
              { icon: Linkedin, href: "https://linkedin.com/in/mountaga-oumar-maiga-182745251" },
            ].map(({ icon: Icon, href }) => (
              <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center transition-colors duration-200"
                style={{ color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>
                <Icon size={18} />
              </motion.a>
            ))}
            <div className="h-px w-12" style={{ background: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)" }}>
              {t("hero_location")}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)" }}>
            {t("scroll")}
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;