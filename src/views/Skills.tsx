import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const CATEGORIES = { fr: ["Tous", "Frontend", "Backend", "Database", "Mobile", "Data & IA", "DevOps"], en: ["All", "Frontend", "Backend", "Database", "Mobile", "Data & AI", "DevOps"] };

const allSkills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", level: 95 },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend", level: 90, invert: true },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend", level: 85 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend", level: 95 },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", level: 92 },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend", level: 98 },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend", level: 90 },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "Backend", level: 82 },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Backend", level: 78 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend", level: 90 },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend", level: 80, invert: true },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend", level: 75, invert: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", level: 85 },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database", level: 88 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", level: 82 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database", level: 82 },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Database", level: 88 },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", category: "Database", level: 80 },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", category: "Database", level: 78, invert: true },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Mobile", level: 80 },
  { name: "Expo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg", category: "Mobile", level: 78, invert: true },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "Data & IA", level: 88, invert: true },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Data & IA", level: 85 },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "Data & IA", level: 72 },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "Data & IA", level: 68 },
  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", category: "Data & IA", level: 85 },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", level: 92 },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "DevOps", level: 90, invert: true },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", level: 60 },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps", level: 72 },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "DevOps", level: 96 },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "DevOps", level: 78 },
];

const categoryColors: Record<string, string> = {
  "Frontend": "#7c3aed", "Backend": "#2563eb", "Database": "#d946ef",
  "Mobile": "#10b981", "Data & IA": "#f59e0b", "DevOps": "#6366f1",
};

const Skills = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cats = CATEGORIES[lang];
  const [selected, setSelected] = useState(cats[0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setSelected(cats[0]); }, [lang]);

  const filtered = selected === cats[0] ? allSkills
    : allSkills.filter(s => {
        const catMap: Record<string, string> = { "Data & AI": "Data & IA", "All": "" };
        const mapped = catMap[selected] || selected;
        return s.category === mapped || s.category === selected;
      });

  const headColor = isLight ? "#0a0a0e" : "#ffffff";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />
      <div className="fixed top-0 left-0 w-96 h-96 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <span className="section-label"><span className="w-2 h-2 rounded-full bg-purple-400" />{t("skills_label")}</span>
          </div>
          <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] leading-none mb-6" style={{ color: headColor }}>
            {t("skills_page_title")} <span className="text-gradient">{t("skills_page_title_2")}</span>
          </h1>
          <p className="max-w-lg mx-auto text-base leading-relaxed" style={{ color: textSub }}>
            {t("skills_page_desc")}
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-16">
          {cats.map((cat) => {
            const isActive = selected === cat;
            const color = cat === cats[0] ? "#7c3aed" : categoryColors[cat] || categoryColors["Data & IA"];
            return (
              <motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setSelected(cat)}
                className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
                style={isActive
                  ? { background: `${color}22`, border: `1px solid ${color}55`, color: color, boxShadow: `0 0 16px ${color}25` }
                  : { background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)", border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`, color: textSub }}>
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Logo grid */}
        <motion.div key={`${selected}-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filtered.map((tech, i) => {
            const color = categoryColors[tech.category] || "#7c3aed";
            return (
              <motion.div key={tech.name}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.5 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl group cursor-default"
                style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.025)", border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = `${color}12`; el.style.borderColor = `${color}35`; el.style.boxShadow = `0 8px 24px ${color}15`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.025)"; el.style.borderColor = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"; el.style.boxShadow = "none"; }}>
                <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain"
                  style={tech.invert && !isLight ? { filter: "invert(1) brightness(0.85)" } : {}}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <span className="text-[10px] font-medium text-center leading-tight group-hover:opacity-90" style={{ color: textSub }}>{tech.name}</span>
                <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
                    initial={{ width: 0 }} whileInView={{ width: `${tech.level}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.02, ease: "easeOut" }} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <span className="text-xs" style={{ color: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }}>
            {filtered.length} {filtered.length > 1 ? t("tech_count_pl") : t("tech_count")}
            {selected !== cats[0] ? ` ${t("tech_in")} ${selected}` : ` ${t("tech_total")}`}
          </span>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
