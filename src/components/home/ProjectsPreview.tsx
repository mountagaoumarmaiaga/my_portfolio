import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const PROJECTS_DATA = {
  fr: [
    { id: 1, title: "Next Gen Mali Tech", subtitle: "Site Web Corporate", description: "Site web officiel de la startup présentant sa vision, ses services et solutions innovantes. Optimisé pour la performance et le SEO.", image: "/Next gen.jpeg", tags: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"], accent: "#7c3aed", demo: "https://nextgenmalitech.netlify.app/", github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen" },
    { id: 2, title: "Gestion de Paie", subtitle: "Application Full Stack", description: "Système automatisé de gestion des salaires, congés et conformité réglementaire pour les entreprises.", image: "/Emomar124.png", tags: ["Django REST", "React", "MySQL", "Tailwind CSS"], accent: "#2563eb", demo: "#", github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git" },
    { id: 3, title: "Prédiction Immobilière", subtitle: "Data Science", description: "Plateforme de prédiction des prix immobiliers et d'analyse des tendances du marché avec ML.", image: "/Imobilier.jpg", tags: ["Flask", "MySQL", "Streamlit", "Machine Learning"], accent: "#d946ef", demo: "#", github: "https://github.com/AissataTraore/immobilier_project.git" },
  ],
  en: [
    { id: 1, title: "Next Gen Mali Tech", subtitle: "Corporate Website", description: "Official startup website showcasing its vision, services and innovative solutions. SEO and performance optimized.", image: "/Next gen.jpeg", tags: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"], accent: "#7c3aed", demo: "https://nextgenmalitech.netlify.app/", github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen" },
    { id: 2, title: "Payroll Management", subtitle: "Full Stack App", description: "Automated payroll management system for salaries, leaves and regulatory compliance.", image: "/Emomar124.png", tags: ["Django REST", "React", "MySQL", "Tailwind CSS"], accent: "#2563eb", demo: "#", github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git" },
    { id: 3, title: "Real Estate Prediction", subtitle: "Data Science", description: "ML-powered platform for real estate price prediction and market trend analysis.", image: "/Imobilier.jpg", tags: ["Flask", "MySQL", "Streamlit", "Machine Learning"], accent: "#d946ef", demo: "#", github: "https://github.com/AissataTraore/immobilier_project.git" },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ProjectsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const projects = PROJECTS_DATA[lang];

  const cardBg = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.025)";
  const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"} className="mb-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              {t("projects_label")}
            </span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2 variants={fadeUp}
              className="heading-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
              style={{ color: isLight ? "#0a0a0e" : "#ffffff" }}>
              {t("projects_title_1")}<br /><span className="text-gradient">{t("projects_title_2")}</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/projects">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 text-sm font-medium hover:text-purple-400 transition-colors"
                  style={{ color: textSub }}>
                  {t("projects_view_all")} <ArrowUpRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${project.accent}40`;
                el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px ${project.accent}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = cardBorder;
                el.style.boxShadow = "none";
              }}>
              <div className="relative h-48 overflow-hidden">
                <motion.img src={project.image} alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,9,0.8) 0%, transparent 60%)" }} />
              </div>
              <div className="p-5">
                <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: project.accent }}>
                  {project.subtitle}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: isLight ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)" }}>
                  {project.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: textSub }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="skill-tag text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
              <motion.div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
