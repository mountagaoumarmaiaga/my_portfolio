import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, X } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

/* ─── Bilingual project data ───────────────────────────── */
const PROJECTS = {
  fr: [
    { id: 1, title: "Next Gen Mali Tech", subtitle: "Site Web Corporate", category: "Web App", year: "2024", status: "Live", accent: "#7c3aed", image: "/Next gen.jpeg", tags: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"], description: "Site web officiel de la startup présentant sa vision, ses services et solutions innovantes.", longDescription: "Conception et développement du site officiel de la startup Next Gen Mali Tech. Architecture moderne avec Next.js, design system complet. Optimisations SEO, performance Lighthouse 95+.", github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen", demo: "https://nextgenmalitech.netlify.app/" },
    { id: 2, title: "Gestion de Paie", subtitle: "Application Full Stack", category: "Full Stack", year: "2023", status: "Production", accent: "#2563eb", image: "/Emomar124.png", tags: ["Django REST API", "React", "MySQL", "Tailwind CSS"], description: "Système automatisé de gestion des salaires, congés et conformité réglementaire.", longDescription: "Application web complète pour la gestion de la paie des employés chez EMOMAR SARL. Calcul automatique des salaires, gestion des congés, exports PDF, tableaux de bord analytiques.", github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git", demo: "#" },
    { id: 3, title: "Prédiction Immobilière", subtitle: "Plateforme Data Science", category: "Data Science", year: "2024", status: "Prototype", accent: "#d946ef", image: "/Imobilier.jpg", tags: ["Flask", "MySQL", "Streamlit", "Machine Learning"], description: "Plateforme de prédiction des prix immobiliers avec ML et analyse des tendances.", longDescription: "Plateforme intelligente qui prédit les prix immobiliers. Modèle de régression avec Feature Engineering avancé, dashboard Streamlit, API Flask.", github: "https://github.com/AissataTraore/immobilier_project.git", demo: "#" },
    { id: 4, title: "Titanic Starship — Kaggle", subtitle: "Compétition ML", category: "Data Science", year: "2024", status: "Complété", accent: "#f59e0b", image: "/titanic.webp", tags: ["Python", "CatBoost", "LightGBM", "Scikit-learn"], description: "Analyse approfondie et modélisation prédictive sur les données Spaceship Titanic.", longDescription: "Compétition Kaggle. Pipeline complet : EDA, Feature Engineering, ensemble CatBoost/LightGBM/XGBoost, tuning Optuna.", github: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE.git", demo: "#" },
    { id: 5, title: "KOMPASS Analytics", subtitle: "Analyse de données", category: "Data Science", year: "2024", status: "Complété", accent: "#10b981", image: "/Kompass.webp", tags: ["Python", "Pandas", "NumPy", "Matplotlib"], description: "Analyse statistique approfondie des données d'entreprise KOMPASS (2012-2014).", longDescription: "Étude analytique complète des données KOMPASS sur 2 années. Nettoyage, visualisations interactives, analyse des tendances.", github: "https://github.com/mountagaoumarmaiaga/Kompass.git", demo: "#" },
    { id: 6, title: "Gestion Entrées/Sorties", subtitle: "Système de sécurité", category: "Full Stack", year: "2023", status: "Production", accent: "#6366f1", image: "/WebApp.jpg", tags: ["Django REST", "React", "MySQL", "Scikit-learn"], description: "Application sécurisée de contrôle d'accès avec reconnaissance faciale.", longDescription: "Système de contrôle d'accès pour Koulouba. Reconnaissance faciale, intégration webcams, lecteurs RFID, logs en temps réel.", github: "#", demo: "#" },
  ],
  en: [
    { id: 1, title: "Next Gen Mali Tech", subtitle: "Corporate Website", category: "Web App", year: "2024", status: "Live", accent: "#7c3aed", image: "/Next gen.jpeg", tags: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"], description: "Official startup website showcasing its vision, services and innovative solutions.", longDescription: "Design and development of the Next Gen Mali Tech startup website. Modern Next.js architecture, complete design system. SEO optimizations, Lighthouse 95+ performance.", github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen", demo: "https://nextgenmalitech.netlify.app/" },
    { id: 2, title: "Payroll Management", subtitle: "Full Stack Application", category: "Full Stack", year: "2023", status: "Production", accent: "#2563eb", image: "/Emomar124.png", tags: ["Django REST API", "React", "MySQL", "Tailwind CSS"], description: "Automated salary, leave and regulatory compliance management system.", longDescription: "Complete web application for employee payroll management at EMOMAR SARL. Automatic salary calculation, leave management, PDF exports, analytics dashboards.", github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git", demo: "#" },
    { id: 3, title: "Real Estate Prediction", subtitle: "Data Science Platform", category: "Data Science", year: "2024", status: "Prototype", accent: "#d946ef", image: "/Imobilier.jpg", tags: ["Flask", "MySQL", "Streamlit", "Machine Learning"], description: "ML-powered real estate price prediction platform with market trend analysis.", longDescription: "Smart platform predicting real estate prices. Regression model with advanced Feature Engineering, Streamlit dashboard, Flask API.", github: "https://github.com/AissataTraore/immobilier_project.git", demo: "#" },
    { id: 4, title: "Spaceship Titanic — Kaggle", subtitle: "ML Competition", category: "Data Science", year: "2024", status: "Completed", accent: "#f59e0b", image: "/titanic.webp", tags: ["Python", "CatBoost", "LightGBM", "Scikit-learn"], description: "In-depth analysis and predictive modeling on Spaceship Titanic data.", longDescription: "Kaggle competition. Full pipeline: EDA, Feature Engineering, CatBoost/LightGBM/XGBoost ensemble, Optuna tuning.", github: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE.git", demo: "#" },
    { id: 5, title: "KOMPASS Analytics", subtitle: "Data Analysis", category: "Data Science", year: "2024", status: "Completed", accent: "#10b981", image: "/Kompass.webp", tags: ["Python", "Pandas", "NumPy", "Matplotlib"], description: "In-depth statistical analysis of KOMPASS company data (2012-2014).", longDescription: "Complete analytical study of KOMPASS data over 2 years. Cleaning, interactive visualizations, trend analysis.", github: "https://github.com/mountagaoumarmaiaga/Kompass.git", demo: "#" },
    { id: 6, title: "Access Control System", subtitle: "Security System", category: "Full Stack", year: "2023", status: "Production", accent: "#6366f1", image: "/WebApp.jpg", tags: ["Django REST", "React", "MySQL", "Scikit-learn"], description: "Secure access control application with facial recognition.", longDescription: "Access control system for Koulouba platform. Facial recognition, webcam integration, RFID readers, real-time logs.", github: "#", demo: "#" },
  ],
};

const statusColors: Record<string, { bg: string; text: string }> = {
  "Live": { bg: "rgba(16,185,129,0.15)", text: "#34d399" },
  "Production": { bg: "rgba(37,99,235,0.15)", text: "#60a5fa" },
  "Prototype": { bg: "rgba(245,158,11,0.15)", text: "#fbbf24" },
  "Complété": { bg: "rgba(139,92,246,0.15)", text: "#a78bfa" },
  "Completed": { bg: "rgba(139,92,246,0.15)", text: "#a78bfa" },
};

const CATS = { fr: ["Tous", "Web App", "Full Stack", "Data Science"], en: ["All", "Web App", "Full Stack", "Data Science"] };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Projects = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const projects = PROJECTS[lang];
  const cats = CATS[lang];
  const [selected, setSelected] = useState(cats[0]);
  const [modal, setModal] = useState<typeof projects[0] | null>(null);

  const filtered = selected === cats[0] ? projects : projects.filter(p => p.category === selected || p.category === selected);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setSelected(cats[0]); }, [lang]);
  useEffect(() => { document.body.style.overflow = modal ? "hidden" : "auto"; }, [modal]);

  const cardBg = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.025)";
  const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const headColor = isLight ? "#0a0a0e" : "#ffffff";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <span className="section-label"><span className="w-2 h-2 rounded-full bg-pink-400" />{t("projects_label")}</span>
          </div>
          <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] leading-none mb-6" style={{ color: headColor }}>
            {t("projects_page_title")} <span className="text-gradient">{t("projects_page_title_2")}</span>
          </h1>
          <p className="text-white/40 max-w-md mx-auto text-base leading-relaxed" style={{ color: textSub }}>
            {t("projects_page_desc")}
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-16">
          {cats.map((cat) => (
            <motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(cat)}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
              style={selected === cat ? { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa", boxShadow: "0 0 16px rgba(124,58,237,0.2)" }
                : { background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)", border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`, color: textSub }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div key={`${selected}-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => {
            const status = statusColors[project.status] || { bg: "rgba(139,92,246,0.15)", text: "#a78bfa" };
            return (
              <motion.div key={project.id} custom={i} variants={fadeUp} initial="hidden" animate="show"
                whileHover={{ y: -8 }}
                onClick={() => setModal(project)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${project.accent}40`; el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${project.accent}20`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = cardBorder; el.style.boxShadow = "none"; }}>
                <div className="relative h-52 overflow-hidden">
                  <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,9,0.85) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={{ background: status.bg, color: status.text, backdropFilter: "blur(8px)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.text }} />{project.status}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-medium"
                    style={{ background: "rgba(8,8,9,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{project.year}</div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: project.accent }}>{project.subtitle}</div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-white transition-colors" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>{project.title}</h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: textSub }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => <span key={tag} className="skill-tag text-[10px]">{tag}</span>)}
                    {project.tags.length > 3 && <span className="skill-tag text-[10px]" style={{ color: project.accent }}>+{project.tags.length - 3}</span>}
                  </div>
                </div>
                <motion.div className="absolute bottom-0 left-0 h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)" }}
            onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.92, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }} transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{ background: isLight ? "#ffffff" : "#0e0e10", border: `1px solid ${cardBorder}` }}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setModal(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: textSub }}>
                <X size={16} />
              </button>
              <div className="h-56 overflow-hidden rounded-t-3xl relative">
                <img src={modal.image} alt={modal.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,16,0.9) 0%, transparent 60%)" }} />
              </div>
              <div className="p-8 -mt-6 relative z-10">
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: modal.accent }}>{modal.subtitle}</div>
                <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>{modal.title}</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: textSub }}>{modal.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {modal.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${modal.accent}15`, border: `1px solid ${modal.accent}30`, color: modal.accent }}>{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: cardBorder }}>
                  {modal.demo !== "#" && <a href={modal.demo} target="_blank" rel="noopener noreferrer"><button className="btn-primary text-sm gap-2"><ExternalLink size={14} />Demo</button></a>}
                  {modal.github !== "#" && <a href={modal.github} target="_blank" rel="noopener noreferrer"><button className="btn-secondary text-sm gap-2"><Github size={14} />GitHub</button></a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Projects;
