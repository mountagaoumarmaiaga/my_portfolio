import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, BookOpen, ExternalLink, MapPin, Calendar } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const EXP_DATA = {
  fr: [
    { type: "work", icon: Briefcase, period: "2022 — Présent", title: "Assistant Développeur Full-Stack", subtitle: "Réseau & Informatique", company: "EMOMAR SARL", location: "Bamako, Mali", accent: "#7c3aed", tags: ["React", "Next.js", "Django REST", "MySQL", "Tailwind CSS", "Scikit-learn"], links: [{ label: "Site EMOMAR", href: "https://www.emomar.net/" }, { label: "Next Gen Mali Tech", href: "https://nextgenmalitech.netlify.app/" }], bullets: ["Développement d'une application sécurisée de gestion des entrées/sorties avec reconnaissance faciale.", "Intégration d'équipements : webcams, lecteurs de badges RFID.", "Développement du site web d'EMOMAR et d'une application de gestion de paie.", "Contribution au site de la startup Next Gen Mali Tech (Lighthouse 95+)."] },
    { type: "project", icon: Award, period: "2024", title: "Compétition Kaggle — Spaceship Titanic", subtitle: "Machine Learning · Compétition internationale", company: "Kaggle", location: "Remote", accent: "#f59e0b", tags: ["Python", "CatBoost", "LightGBM", "Scikit-learn", "Optuna"], links: [{ label: "Voir sur GitHub", href: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE.git" }], bullets: ["Analyse exploratoire complète (EDA) des données Spaceship Titanic.", "Feature Engineering avancé et preprocessing robuste.", "Ensemble CatBoost, LightGBM, XGBoost avec tuning Optuna.", "Score final dans les meilleurs percentiles."] },
    { type: "project", icon: GraduationCap, period: "2024", title: "Impact des prix alimentaires au Mali", subtitle: "Recherche statistique", company: "Université Internationale d'Excellence", location: "Bamako, Mali", accent: "#d946ef", tags: ["Python", "Google Forms", "Pandas", "Matplotlib"], links: [], bullets: ["Collecte de données terrain via Google Forms.", "Nettoyage et transformation des données.", "Analyse statistique des impacts des hausses de prix.", "Rapport académique avec conclusions."] },
    { type: "project", icon: BookOpen, period: "2024", title: "Analyse des données KOMPASS", subtitle: "Business Intelligence", company: "Projet Académique", location: "Bamako, Mali", accent: "#10b981", tags: ["Python", "Pandas", "NumPy", "Excel"], links: [{ label: "Voir sur GitHub", href: "https://github.com/mountagaoumarmaiaga/Kompass.git" }], bullets: ["Analyse des données KOMPASS 2012-2014.", "Visualisations interactives.", "Identification des tendances clés.", "Recommandations stratégiques."] },
    { type: "project", icon: Award, period: "2024", title: "Plateforme Prédiction Immobilière", subtitle: "Machine Learning · Web App", company: "Projet collaboratif", location: "Remote", accent: "#2563eb", tags: ["Flask", "MySQL", "Streamlit", "Scikit-learn"], links: [{ label: "Voir sur GitHub", href: "https://github.com/AissataTraore/immobilier_project.git" }], bullets: ["Modèle ML de prédiction des prix immobiliers.", "API Flask + dashboard Streamlit interactif.", "Feature Engineering sur les variables du marché.", "Base de données MySQL pour la persistance."] },
  ],
  en: [
    { type: "work", icon: Briefcase, period: "2022 — Present", title: "Full-Stack Developer Assistant", subtitle: "Network & IT", company: "EMOMAR SARL", location: "Bamako, Mali", accent: "#7c3aed", tags: ["React", "Next.js", "Django REST", "MySQL", "Tailwind CSS", "Scikit-learn"], links: [{ label: "EMOMAR Website", href: "https://www.emomar.net/" }, { label: "Next Gen Mali Tech", href: "https://nextgenmalitech.netlify.app/" }], bullets: ["Developed a secure access control application with facial recognition.", "Hardware integration: webcams, RFID badge readers.", "Developed EMOMAR website and a payroll management application.", "Contributed to Next Gen Mali Tech startup site (Lighthouse 95+)."] },
    { type: "project", icon: Award, period: "2024", title: "Kaggle Competition — Spaceship Titanic", subtitle: "Machine Learning · International Competition", company: "Kaggle", location: "Remote", accent: "#f59e0b", tags: ["Python", "CatBoost", "LightGBM", "Scikit-learn", "Optuna"], links: [{ label: "View on GitHub", href: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE.git" }], bullets: ["Complete exploratory data analysis (EDA) of Spaceship Titanic data.", "Advanced Feature Engineering and robust preprocessing.", "CatBoost, LightGBM, XGBoost ensemble with Optuna tuning.", "Final score in top percentiles."] },
    { type: "project", icon: GraduationCap, period: "2024", title: "Impact of Food Prices in Mali", subtitle: "Statistical Research", company: "International University of Excellence", location: "Bamako, Mali", accent: "#d946ef", tags: ["Python", "Google Forms", "Pandas", "Matplotlib"], links: [], bullets: ["Field data collection via Google Forms.", "Data cleaning and transformation.", "Statistical analysis of food price impacts.", "Academic report with conclusions."] },
    { type: "project", icon: BookOpen, period: "2024", title: "KOMPASS Data Analysis", subtitle: "Business Intelligence", company: "Academic Project", location: "Bamako, Mali", accent: "#10b981", tags: ["Python", "Pandas", "NumPy", "Excel"], links: [{ label: "View on GitHub", href: "https://github.com/mountagaoumarmaiaga/Kompass.git" }], bullets: ["Analysis of KOMPASS data 2012-2014.", "Interactive visualizations.", "Key trend identification.", "Strategic recommendations."] },
    { type: "project", icon: Award, period: "2024", title: "Real Estate Prediction Platform", subtitle: "Machine Learning · Web App", company: "Collaborative Project", location: "Remote", accent: "#2563eb", tags: ["Flask", "MySQL", "Streamlit", "Scikit-learn"], links: [{ label: "View on GitHub", href: "https://github.com/AissataTraore/immobilier_project.git" }], bullets: ["ML model for real estate price prediction.", "Flask API + interactive Streamlit dashboard.", "Feature Engineering on market variables.", "MySQL database for persistence."] },
  ],
};

const typeLabels = { fr: { work: "Expérience", project: "Projet" }, en: { work: "Experience", project: "Project" } };

const fadeUp = { hidden: { opacity: 0, y: 30, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

const Experience = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const experiences = EXP_DATA[lang];
  const labels = typeLabels[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const headColor = isLight ? "#0a0a0e" : "#ffffff";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />
      <div className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <main className="max-w-4xl mx-auto px-6 pt-36 pb-32">
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="text-center mb-24">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="section-label"><span className="w-2 h-2 rounded-full bg-purple-400" />{t("exp_label")}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="heading-display text-[clamp(3rem,8vw,7rem)] leading-none mb-6" style={{ color: headColor }}>
            {t("exp_title_1")} <span className="text-gradient">{t("exp_title_2")}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-lg mx-auto text-base leading-relaxed" style={{ color: textSub }}>
            {t("exp_desc")}
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(37,99,235,0.4), transparent)" }} />

          <div className="space-y-14">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="relative flex-shrink-0 flex items-start md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4 z-10">
                    <motion.div variants={fadeUp} className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${exp.accent}18`, border: `2px solid ${exp.accent}50`, boxShadow: `0 0 20px ${exp.accent}25` }}>
                      <Icon size={20} style={{ color: exp.accent }} />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeUp}
                    className={`w-full md:w-[calc(50%-3rem)] rounded-2xl p-6 md:p-8 group transition-all duration-500 relative overflow-hidden ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                    style={{ background: isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)", border: `1px solid ${cardBorder}` }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = `${exp.accent}35`; el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.2), 0 0 0 1px ${exp.accent}20`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = cardBorder; el.style.boxShadow = "none"; }}>
                    <div className="absolute top-0 left-6 right-6 h-px"
                      style={{ background: `linear-gradient(to right, transparent, ${exp.accent}50, transparent)` }} />

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={{ background: `${exp.accent}18`, color: exp.accent, border: `1px solid ${exp.accent}30` }}>
                        {labels[exp.type as keyof typeof labels]}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px]" style={{ color: textSub }}><Calendar size={10} />{exp.period}</span>
                      <span className="flex items-center gap-1.5 text-[10px]" style={{ color: textSub }}><MapPin size={10} />{exp.location}</span>
                    </div>

                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: exp.accent }}>{exp.subtitle}</div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>{exp.title}</h3>
                    <div className="text-sm font-medium mb-5" style={{ color: textSub }}>{exp.company}</div>

                    <ul className="space-y-2 mb-5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-xs leading-relaxed" style={{ color: textSub }}>
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accent }} />{b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.tags.map(tag => <span key={tag} className="skill-tag text-[10px]">{tag}</span>)}
                    </div>

                    {exp.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: cardBorder }}>
                        {exp.links.map(link => (
                          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
                            style={{ color: `${exp.accent}90` }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = exp.accent; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = `${exp.accent}90`; }}>
                            <ExternalLink size={11} />{link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }} className="text-center mt-24">
          <p className="text-sm mb-6" style={{ color: textSub }}>{t("exp_interested")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary text-sm">{t("exp_contact_cta")}</motion.button></a>
            <a href="/CV.pdf" download><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-sm">{t("exp_cv_cta")}</motion.button></a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
