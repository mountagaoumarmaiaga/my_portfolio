"use client";

import React, { createContext, useContext, useState } from "react";

type Lang = "fr" | "en";

const translations = {
  fr: {
    // Navbar
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_experience: "Expérience",
    nav_skills: "Compétences",
    nav_projects: "Projets",
    nav_contact: "Contact",
    nav_cta: "Me contacter",
    // Hero
    hero_available: "Disponible pour des collaborations",
    hero_description: "Je conçois des expériences numériques immersives — APIs Laravel, Django REST, Express.js, PHP · React · Next.js · Data Science · Infrastructures. 4+ ans d'expérience.",
    hero_cta_projects: "Voir mes projets",
    hero_cta_cv: "Télécharger CV",
    hero_location: "Bamako, Mali",
    // About
    about_label: "À propos de moi",
    about_title_1: "Développeur",
    about_title_2: "full-stack",
    about_title_3: "& data scientist.",
    about_desc_1: "Co-Fondateur de Java Digital Solution et développeur full-stack avec plus de 4 ans d'expérience. Je travaille à l'intersection du software engineering, de la data science et de l'infrastructure IT.",
    about_desc_2: "Backend : Laravel · Django REST · Express.js · PHP · Frontend : React, Next.js · DB : PostgreSQL, MySQL, MongoDB, Supabase, Prisma · Mobile : React Native · Data Science & ML.",
    about_stat_1: "Années d'expérience",
    about_stat_2: "Projets livrés",
    about_stat_3: "Technologies maîtrisées",
    about_stat_4: "Collaborations",
    // Skills
    skills_label: "Stack Technique",
    skills_title_1: "Expertise &",
    skills_title_2: "technologies",
    skills_desc: "Une boîte à outils complète construite sur des projets réels — du frontend au backend, du mobile à la data science et à l'IA.",
    skills_page_title: "Mes",
    skills_page_title_2: "technologies",
    skills_page_desc: "Une boîte à outils construite sur des projets réels — du frontend cinématique au machine learning, du backend robuste à l'infrastructure réseau.",
    // Projects
    projects_label: "Projets sélectionnés",
    projects_title_1: "Mes dernières",
    projects_title_2: "réalisations",
    projects_view_all: "Voir tous les projets",
    projects_page_title: "Mes",
    projects_page_title_2: "réalisations",
    projects_page_desc: "Une collection de projets qui illustrent mon expertise technique, ma curiosité et mon approche produit.",
    // Contact
    contact_label: "Travaillons ensemble",
    contact_title_1: "Vous avez un",
    contact_title_2: "projet",
    contact_title_3: "? Discutons-en.",
    contact_desc: "Développeur disponible pour des missions freelance, des opportunités de collaboration ou des postes à temps plein. Bamako · Remote · Ouvert au monde.",
    contact_cta: "Envoyer un message",
    contact_available: "Disponible maintenant",
    contact_page_title: "Parlons de votre",
    contact_page_title_2: "projet.",
    contact_page_desc: "Disponible pour des missions freelance, des opportunités full-time ou simplement pour échanger sur la tech.",
    contact_send: "Envoyer le message",
    contact_sending: "Envoi en cours...",
    contact_name: "Votre nom",
    contact_email: "Votre email",
    contact_subject: "Sujet",
    contact_message: "Votre message...",
    contact_location: "Bamako, Mali · Remote OK",
    contact_networks: "Réseaux",
    contact_response: "Temps de réponse moyen",
    contact_response_val: "< 24h",
    contact_response_sub: "en semaine",
    // Experience
    exp_label: "Parcours",
    exp_title_1: "Mon",
    exp_title_2: "expérience",
    exp_desc: "Chronologie de mes expériences professionnelles, projets académiques et réalisations techniques.",
    exp_interested: "Intéressé par mon profil ?",
    exp_contact_cta: "Me contacter",
    exp_cv_cta: "Télécharger mon CV",
    // Footer
    footer_desc: "Full Stack Developer & Data Scientist basé à Bamako, Mali. Ouvert aux collaborations et opportunités.",
    // Misc
    scroll: "Scroll",
    filter_all: "Tous",
    tech_count: "technologie",
    tech_count_pl: "technologies",
    tech_in: "en",
    tech_total: "au total",
  },
  en: {
    // Navbar
    nav_home: "Home",
    nav_about: "About",
    nav_experience: "Experience",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_cta: "Contact me",
    // Hero
    hero_available: "Available for collaborations",
    hero_description: "I craft immersive digital experiences — Laravel APIs, Django REST, Express.js, PHP · React · Next.js · Data Science · Infrastructure. 4+ years of experience.",
    hero_cta_projects: "View projects",
    hero_cta_cv: "Download CV",
    hero_location: "Bamako, Mali",
    // About
    about_label: "About me",
    about_title_1: "Full-stack",
    about_title_2: "developer",
    about_title_3: "& data scientist.",
    about_desc_1: "Co-Founder of Java Digital Solution and full-stack developer with 4+ years of experience. I work at the intersection of software engineering, data science, and IT infrastructure.",
    about_desc_2: "Backend: Laravel, Django REST, Express.js, PHP · Frontend: React, Next.js · Databases: PostgreSQL, MySQL, MongoDB, Supabase, Prisma · Mobile: React Native · Data Science & ML · Network infrastructure.",
    about_stat_1: "Years of experience",
    about_stat_2: "Projects delivered",
    about_stat_3: "Technologies mastered",
    about_stat_4: "Collaborations",
    // Skills
    skills_label: "Tech Stack",
    skills_title_1: "Expertise &",
    skills_title_2: "technologies",
    skills_desc: "A complete toolbox built on real projects — from frontend to backend, from mobile to data science and AI.",
    skills_page_title: "My",
    skills_page_title_2: "technologies",
    skills_page_desc: "A toolbox built on real projects — from cinematic frontends to machine learning, from robust backends to network infrastructure.",
    // Projects
    projects_label: "Selected projects",
    projects_title_1: "My latest",
    projects_title_2: "work",
    projects_view_all: "View all projects",
    projects_page_title: "My",
    projects_page_title_2: "work",
    projects_page_desc: "A collection of projects showcasing my technical expertise, curiosity, and product-oriented approach.",
    // Contact
    contact_label: "Let's work together",
    contact_title_1: "Got a",
    contact_title_2: "project",
    contact_title_3: "? Let's talk.",
    contact_desc: "Developer available for freelance missions, collaboration opportunities or full-time positions. Bamako · Remote · Open to the world.",
    contact_cta: "Send a message",
    contact_available: "Available now",
    contact_page_title: "Let's talk about your",
    contact_page_title_2: "project.",
    contact_page_desc: "Available for freelance missions, full-time opportunities, or just to discuss tech.",
    contact_send: "Send message",
    contact_sending: "Sending...",
    contact_name: "Your name",
    contact_email: "Your email",
    contact_subject: "Subject",
    contact_message: "Your message...",
    contact_location: "Bamako, Mali · Remote OK",
    contact_networks: "Networks",
    contact_response: "Average response time",
    contact_response_val: "< 24h",
    contact_response_sub: "on weekdays",
    // Experience
    exp_label: "Career",
    exp_title_1: "My",
    exp_title_2: "experience",
    exp_desc: "A timeline of my professional experiences, academic projects and technical achievements.",
    exp_interested: "Interested in my profile?",
    exp_contact_cta: "Contact me",
    exp_cv_cta: "Download my CV",
    // Footer
    footer_desc: "Full Stack Developer & Data Scientist based in Bamako, Mali. Open to collaborations and opportunities.",
    // Misc
    scroll: "Scroll",
    filter_all: "All",
    tech_count: "technology",
    tech_count_pl: "technologies",
    tech_in: "in",
    tech_total: "total",
  },
} as const;

type TranslationKey = keyof typeof translations.fr;

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}>({
  lang: "fr",
  toggle: () => {},
  t: (key) => translations.fr[key],
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "fr";
    }
    return "fr";
  });

  const toggle = () => {
    const next: Lang = lang === "fr" ? "en" : "fr";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key: TranslationKey): string => translations[lang][key] as string;

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
};
