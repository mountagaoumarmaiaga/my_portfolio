import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* All techs flat for marquee — with real icons */
const marqueeLogos = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", invert: true },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", invert: true },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", invert: true },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
];
/* Duplicate for seamless loop */
const marqueeDouble = [...marqueeLogos, ...marqueeLogos];

const categoryColors: Record<string, string> = {
  "Frontend": "rgba(124,58,237,0.15)", "Backend": "rgba(37,99,235,0.15)",
  "Bases de données": "rgba(217,70,239,0.12)", "Mobile": "rgba(16,185,129,0.12)",
  "Data & IA": "rgba(245,158,11,0.12)", "DevOps": "rgba(99,102,241,0.12)",
};
const categoryBorders: Record<string, string> = {
  "Frontend": "rgba(124,58,237,0.3)", "Backend": "rgba(37,99,235,0.3)",
  "Bases de données": "rgba(217,70,239,0.25)", "Mobile": "rgba(16,185,129,0.25)",
  "Data & IA": "rgba(245,158,11,0.25)", "DevOps": "rgba(99,102,241,0.25)",
};

const techsPerCategory: Record<string, { name: string; icon: string; invert?: boolean }[]> = {
  "Frontend": [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  ],
  "Backend": [
    { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", invert: true },
    { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ],
  "Bases de données": [
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", invert: true },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ],
  "Mobile": [
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Expo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg", invert: true },
  ],
  "Data & IA": [
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", invert: true },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  ],
  "DevOps": [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  ],
};

const SkillsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const fadeBg = isLight ? "#f5f5f7" : "#080809";
  const cardBg = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.02)";
  const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const chipBg = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";
  const chipText = isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.55)";
  const chipBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"} className="mb-20">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              {t("skills_label")}
            </span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.h2 variants={fadeUp}
              className="heading-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
              style={{ color: isLight ? "#0a0a0e" : "#ffffff" }}>
              {t("skills_title_1")}<br /><span className="text-gradient">{t("skills_title_2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm max-w-sm leading-relaxed" style={{ color: textSub }}>
              {t("skills_desc")}
            </motion.p>
          </div>
        </motion.div>

        {/* Bento grid with real logos */}
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {Object.entries(techsPerCategory).map(([cat, items]) => (
            <motion.div key={cat} variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryBorders[cat]?.replace("0.3","0.8").replace("0.25","0.8") }} />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: categoryBorders[cat]?.replace("0.3","0.8").replace("0.25","0.8") }}>
                  {cat}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {items.map((tech) => (
                  <motion.div key={tech.name} whileHover={{ scale: 1.08, y: -2 }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl"
                    style={{ background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${cardBorder}` }}>
                    <img src={tech.icon} alt={tech.name} className="w-7 h-7 object-contain"
                      style={tech.invert && !isLight ? { filter: "invert(1) brightness(0.85)" } : tech.invert && isLight ? { filter: "opacity(0.7)" } : {}}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span className="text-[9px] font-medium text-center leading-tight" style={{ color: chipText }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Marquee with real logos ── */}
      <div className="relative overflow-hidden mt-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-32 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-main), transparent)" }} />
        <div className="absolute right-0 top-0 w-32 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-main), transparent)" }} />

        <div className="flex gap-3 animate-marquee py-4" style={{ width: "max-content" }}>
          {marqueeDouble.map((tech, i) => (
            <div key={i}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl flex-shrink-0 transition-transform duration-200 hover:scale-105"
              style={{
                background: chipBg,
                border: `1px solid ${chipBorder}`,
                minWidth: "max-content",
              }}>
              {/* Logo */}
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-5 h-5 object-contain flex-shrink-0"
                style={
                  tech.invert && !isLight
                    ? { filter: "invert(1) brightness(0.9)" }
                    : tech.invert && isLight
                    ? { filter: "brightness(0) opacity(0.6)" }
                    : {}
                }
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
              />
              {/* Name */}
              <span className="text-xs font-medium" style={{ color: chipText }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
