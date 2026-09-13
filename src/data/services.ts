import type { I18n, I18nList } from "@/lib/i18n";

export interface Service {
  index: string;
  title: I18n;
  /** One line under the title — what the stage is. */
  description: I18n;
  /** What actually gets handed over. Three each, kept concrete. */
  deliverables: I18nList;
}

/**
 * Read as a pipeline, not a menu: the section is called "from idea to
 * production" and these are the stages in that order.
 */
export const services: Service[] = [
  {
    index: "01",
    title: { fr: "Développement produit", en: "Product Development" },
    description: {
      fr: "Je conçois et construis des produits numériques complets — architecture, interface, API et base de données comme un seul ensemble cohérent.",
      en: "I design and build complete digital products — architecture, interface, API and database as one coherent whole.",
    },
    deliverables: {
      fr: ["Architecture et design system", "API REST et modèle de données", "Contrôle d'accès par rôle"],
      en: ["Architecture and design system", "REST API and data model", "Role-based access control"],
    },
  },
  {
    index: "02",
    title: { fr: "Web & Mobile", en: "Web & Mobile" },
    description: {
      fr: "Applications web responsives et expériences mobiles, construites pour rester rapides sur les réseaux et les appareils que les gens ont vraiment.",
      en: "Responsive web applications and mobile experiences, built to stay fast on the networks and devices people actually have.",
    },
    deliverables: {
      fr: ["Applications React et Next.js", "Mobile React Native, iOS et Android", "Accessibilité et performance"],
      en: ["React and Next.js applications", "React Native on iOS and Android", "Accessibility and performance"],
    },
  },
  {
    index: "03",
    title: { fr: "Data & Analyse", en: "Data & Analytics" },
    description: {
      fr: "Transformer des données brutes en informations et en outils de décision, jusqu'aux APIs qui mettent le résultat devant les gens.",
      en: "Turning raw data into insights and decision tools, down to the APIs that put results in front of people.",
    },
    deliverables: {
      fr: ["Nettoyage et modélisation", "Tableaux de bord interactifs", "API de prédiction servie en ligne"],
      en: ["Cleaning and modelling", "Interactive dashboards", "A prediction API served live"],
    },
  },
  {
    index: "04",
    title: { fr: "Déploiement & Infrastructure", en: "Deployment & Infrastructure" },
    description: {
      fr: "Déployer, maintenir et améliorer des applications en production — et rester joignable quand elles tombent.",
      en: "Deploying, maintaining and improving production applications — and staying reachable when they fall over.",
    },
    deliverables: {
      fr: ["VPS Linux, Nginx, TLS", "Pipelines CI sur chaque push", "Supervision et astreinte"],
      en: ["Linux VPS, Nginx, TLS", "CI pipelines on every push", "Monitoring and on-call"],
    },
  },
];
