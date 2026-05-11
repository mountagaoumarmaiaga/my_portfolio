import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, BookOpen, Cpu, Globe, Code2, Database } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";

const ABOUT_DATA = {
  fr: {
    pageTitle: "À propos",
    pageTitleAccent: "de moi",
    pageDesc: "Co-Fondateur de Java Digital Solution · Développeur Full-Stack · Data Scientist · Infrastructure & Réseau",
    storyTitle: "Mon histoire",
    storyP1: "Je suis un développeur full-stack et data scientist passionné par la création de solutions numériques innovantes qui résolvent des problèmes concrets. Co-Fondateur de Java Digital Solution, je travaille à l'intersection du software engineering, de la data science et de l'infrastructure IT depuis plus de 4 ans.",
    storyP2: "Backend : Laravel · Django REST · Express.js · PHP · Node.js. Frontend : React, Next.js. Bases de données : PostgreSQL, MySQL, MongoDB, Supabase, Prisma. Mobile : React Native. Data Science & ML. Infrastructure réseau & IT.",
    timelineTitle: "Chronologie & Expériences",
    expertiseTitle: "Domaines d'expertise",
    valuesTitle: "Valeurs fondamentales",
    expertise: [
      "Développement Web Full-Stack (React, Next.js, Tailwind)",
      "Backend : Laravel · Django REST · Express.js · PHP · Node.js",
      "APIs REST & Systèmes backend robustes et sécurisés",
      "Bases de données : PostgreSQL, MySQL, MongoDB, Supabase, Prisma",
      "Science des données & Machine Learning",
      "Infrastructure IT & Réseaux (Hikvision, Windows Server)",
      "Mobile (React Native, Expo)",
      "UI/UX & Design Systems premium",
    ],
    values: [
      "Apprentissage continu & veille technologique",
      "Design centré sur l'utilisateur",
      "Qualité du code & meilleures pratiques",
      "Innovation & Résolution de problèmes",
      "Collaboration & Communication transparente",
    ],
    timeline: [
      { year: "2022 — Présent", title: "Assistant Développeur Full-Stack | Réseau & IT", company: "EMOMAR SARL", icon: Briefcase, accent: "#7c3aed", desc: "Développement d'une application sécurisée de gestion des entrées/sorties avec reconnaissance faciale. Développement du site EMOMAR, application de paie, et contribution à Next Gen Mali Tech (Lighthouse 95+)." },
      { year: "2024", title: "Compétition Kaggle — Spaceship Titanic", company: "Kaggle", icon: Award, accent: "#f59e0b", desc: "Analyse EDA complète, Feature Engineering avancé, ensemble CatBoost/LightGBM/XGBoost avec tuning Optuna. Score dans les meilleurs percentiles." },
      { year: "2024", title: "Impact des prix alimentaires au Mali", company: "Université Internationale d'Excellence", icon: GraduationCap, accent: "#d946ef", desc: "Collecte et nettoyage de données terrain. Analyse statistique des impacts des hausses de prix sur les ménages maliens. Rapport de synthèse académique." },
      { year: "2024", title: "Analyse des données KOMPASS", company: "Projet Académique", icon: BookOpen, accent: "#10b981", desc: "Analyse des données KOMPASS (2012-2014). Techniques statistiques avancées et visualisations interactives pour comprendre la dynamique de l'entreprise." },
    ],
  },
  en: {
    pageTitle: "About",
    pageTitleAccent: "me",
    pageDesc: "Co-Founder of Java Digital Solution · Full-Stack Developer · Data Scientist · Infrastructure & Network",
    storyTitle: "My story",
    storyP1: "I'm a full-stack developer and data scientist passionate about building innovative digital solutions that solve real-world problems. Co-Founder of Java Digital Solution, I work at the intersection of software engineering, data science and IT infrastructure for 4+ years.",
    storyP2: "Backend: Laravel · Django REST · Express.js · PHP · Node.js. Frontend: React, Next.js. Databases: PostgreSQL, MySQL, MongoDB, Supabase, Prisma. Mobile: React Native. Data Science & ML. Network & IT infrastructure.",
    timelineTitle: "Timeline & Experience",
    expertiseTitle: "Areas of expertise",
    valuesTitle: "Core values",
    expertise: [
      "Full-Stack Web Development (React, Next.js, Tailwind)",
      "Backend: Laravel · Django REST · Express.js · PHP · Node.js",
      "REST APIs & Robust, secure backend systems",
      "Databases: PostgreSQL, MySQL, MongoDB, Supabase, Prisma",
      "Data Science & Machine Learning",
      "IT Infrastructure & Networks (Hikvision, Windows Server)",
      "Mobile (React Native, Expo)",
      "UI/UX & Premium Design Systems",
    ],
    values: [
      "Continuous learning & technology watch",
      "User-centered design",
      "Code quality & best practices",
      "Innovation & Problem solving",
      "Collaboration & Transparent communication",
    ],
    timeline: [
      { year: "2022 — Present", title: "Full-Stack Developer Assistant | Network & IT", company: "EMOMAR SARL", icon: Briefcase, accent: "#7c3aed", desc: "Built a secure access control app with facial recognition. Developed EMOMAR website, payroll application, and contributed to Next Gen Mali Tech startup (Lighthouse 95+)." },
      { year: "2024", title: "Kaggle Competition — Spaceship Titanic", company: "Kaggle", icon: Award, accent: "#f59e0b", desc: "Full EDA, advanced Feature Engineering, CatBoost/LightGBM/XGBoost ensemble with Optuna tuning. Final score in top percentiles." },
      { year: "2024", title: "Impact of Food Prices in Mali", company: "International University of Excellence", icon: GraduationCap, accent: "#d946ef", desc: "Field data collection and cleaning. Statistical analysis of food price impacts on Malian households. Academic synthesis report." },
      { year: "2024", title: "KOMPASS Data Analysis", company: "Academic Project", icon: BookOpen, accent: "#10b981", desc: "Analysis of KOMPASS data (2012-2014). Advanced statistical techniques and interactive visualizations to understand company dynamics." },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const About = () => {
  const { theme } = useTheme();
  const { lang } = useLang();
  const isLight = theme === "light";
  const d = ABOUT_DATA[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const headColor = isLight ? "#0a0a0e" : "#ffffff";
  const textSub = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)";
  const textMuted = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)";
  const cardBg = isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)";
  const cardBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";
  const pillBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />

      {/* Ambient */}
      <div className="fixed top-1/4 right-0 w-96 h-96 pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${isLight ? "rgba(124,58,237,0.05)" : "rgba(124,58,237,0.08)"} 0%, transparent 70%)`, filter: "blur(80px)" }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${isLight ? "rgba(37,99,235,0.04)" : "rgba(37,99,235,0.07)"} 0%, transparent 70%)`, filter: "blur(80px)" }} />

      <main className="max-w-5xl mx-auto px-6 pt-36 pb-24">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {d.pageTitle}
            </span>
          </div>
          <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] leading-none mb-6" style={{ color: headColor }}>
            {d.pageTitle} <span className="text-gradient">{d.pageTitleAccent}</span>
          </h1>
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: textSub }}>{d.pageDesc}</p>
        </motion.div>

        {/* ── Story card ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="relative p-8 md:p-12 rounded-3xl mb-20 overflow-hidden"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <div className="absolute top-0 left-8 right-8 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)" }} />
          <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
            {d.storyTitle}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: textSub }}>
            <p>{d.storyP1}</p>
            <p>{d.storyP2}</p>
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <motion.section className="mb-20"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.6 }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-14 text-center" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
            {d.timelineTitle}
          </motion.h2>

          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2"
              style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(37,99,235,0.3), transparent)" }} />

            {d.timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index}
                  initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                  className={`relative flex gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Icon dot */}
                  <motion.div variants={fadeUp}
                    className="relative flex-shrink-0 flex items-start md:absolute md:left-1/2 md:-translate-x-1/2 md:top-3 z-10">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${item.accent}18`, border: `2px solid ${item.accent}50`, boxShadow: `0 0 16px ${item.accent}20` }}>
                      <Icon size={20} style={{ color: item.accent }} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div variants={fadeUp}
                    className={`w-full md:w-[calc(50%-3rem)] p-6 rounded-2xl transition-all duration-300 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                    style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.accent}35`; el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.15)`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = cardBorder; el.style.boxShadow = "none"; }}>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3"
                      style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}30` }}>
                      {item.year}
                    </div>
                    <h3 className="text-base font-bold mb-1" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>{item.title}</h3>
                    <div className="text-xs font-medium mb-3" style={{ color: item.accent }}>{item.company}</div>
                    <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{item.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Skills & Values ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expertise */}
          <div className="p-8 rounded-3xl relative overflow-hidden"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: pillBg, border: `1px solid ${cardBorder}` }}>💻</span>
              {d.expertiseTitle}
            </h3>
            <ul className="space-y-3">
              {d.expertise.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: textSub }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-purple-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className="p-8 rounded-3xl relative overflow-hidden"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: pillBg, border: `1px solid ${cardBorder}` }}>⭐</span>
              {d.valuesTitle}
            </h3>
            <ul className="space-y-3">
              {d.values.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: textSub }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-400" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
