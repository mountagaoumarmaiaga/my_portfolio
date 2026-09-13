import type { I18n } from "@/lib/i18n";

export type ProjectCategory = "hybrid" | "fullstack" | "data";

/** Where a project actually stands. `in-development` is for work still underway. */
export type ProjectStatus = "live" | "production" | "prototype" | "completed" | "in-development";

/** Green for anything running right now, gold for anything still moving. */
export const statusTone: Record<ProjectStatus, "green" | "gold" | "neutral"> = {
  live: "green",
  production: "green",
  prototype: "gold",
  completed: "neutral",
  "in-development": "gold",
};

export interface ProjectMetric {
  /** Short and concrete. It is read before the prose, so it has to carry weight. */
  value: I18n;
  label: I18n;
}

export interface Project {
  id: string;
  index: string;
  /** Product names are not translated. */
  title: string;
  /** Sits above the title in the carousel, in the accent colour. */
  kicker: I18n;
  category: ProjectCategory;
  status: ProjectStatus;
  /** One line. Resist the urge to write two. */
  summary: I18n;
  /** Two or three sentences — the carousel has room the old grid did not. */
  detail: I18n;
  /** The outcome, not the feature list. */
  result: I18n;
  /** Exactly three. Every one of them has to be defensible. */
  metrics: [ProjectMetric, ProjectMetric, ProjectMetric];
  stack: string[];
  /** Omit when there is no screenshot; the card draws a frame instead of borrowing one. */
  image?: string;
  imageAlt?: I18n;
  year: I18n;
  links: {
    demo?: string;
    github?: string;
  };
}

/** Hybrid work leads: it is the intersection this portfolio is actually about. */
export const projects: Project[] = [
  {
    id: "koulouba",
    index: "01",
    title: "Plateforme Koulouba",
    kicker: { fr: "Administration · Vision par ordinateur", en: "Government · Computer vision" },
    category: "hybrid",
    status: "production",
    summary: {
      fr: "Contrôle d'accès sécurisé alliant reconnaissance faciale et lecteurs de badges RFID.",
      en: "Secure government access control pairing facial recognition with RFID badge readers.",
    },
    detail: {
      fr: "Conçu pour un site où l'on signait encore les entrées sur un cahier. Un backend Django REST pilote la chaîne de reconnaissance et le matériel — webcams et lecteurs de badges — pendant qu'une console React montre qui est à l'intérieur, maintenant, avec l'historique consultable derrière.",
      en: "Built for a site that was still signing people in on paper. A Django REST backend drives the recognition pipeline and the hardware — webcams and badge readers — while a React console shows who is inside right now, with a searchable history behind it.",
    },
    result: {
      fr: "Le cahier papier remplacé par une traçabilité d'accès en temps réel et auditable.",
      en: "Replaced paper logs with a real-time, auditable access trail.",
    },
    metrics: [
      { value: { fr: "2 facteurs", en: "2 factors" }, label: { fr: "Visage + badge", en: "Face + badge" } },
      {
        value: { fr: "Temps réel", en: "Real time" },
        label: { fr: "Entrées & sorties", en: "Entry & exit log" },
      },
      {
        value: { fr: "Matériel", en: "Hardware" },
        label: { fr: "Caméras + lecteurs", en: "Cameras + readers" },
      },
    ],
    stack: ["React", "Django REST", "MySQL", "Scikit-learn", "OpenCV"],
    image: "/images/projects/access-control.jpg",
    imageAlt: {
      fr: "Console de la plateforme de contrôle d'accès Koulouba affichant les entrées en direct",
      en: "Console of the Koulouba access control platform showing live entry logs",
    },
    year: { fr: "2022 — 2023", en: "2022 — 2023" },
    links: {},
  },
  {
    id: "real-estate-prediction",
    index: "02",
    title: "Prédiction Immobilière",
    kicker: { fr: "Machine learning · Application web", en: "Machine learning · Web app" },
    category: "hybrid",
    status: "prototype",
    summary: {
      fr: "Plateforme de prédiction des prix mêlant un modèle de régression et un tableau de bord interactif.",
      en: "Price prediction platform combining a regression model with an interactive dashboard.",
    },
    detail: {
      fr: "Du feature engineering sur les variables du marché alimente un modèle de régression servi derrière une API Flask. Un tableau de bord Streamlit se pose dessus, pour que ceux qui posent la question puissent y répondre eux-mêmes plutôt que de commander un rapport.",
      en: "Feature engineering on market variables feeds a regression model served behind a Flask REST API. A Streamlit dashboard sits on top so the people asking the question can answer it themselves instead of requesting a report.",
    },
    result: {
      fr: "Des annonces éparpillées transformées en estimations comparables.",
      en: "Turned scattered listing data into comparable price estimates.",
    },
    metrics: [
      {
        value: { fr: "Régression", en: "Regression" },
        label: { fr: "Modèle de prix", en: "Price model" },
      },
      { value: { fr: "API Flask", en: "Flask API" }, label: { fr: "Servie en ligne", en: "Served live" } },
      { value: { fr: "Streamlit", en: "Streamlit" }, label: { fr: "Tableau de bord", en: "Dashboard" } },
    ],
    stack: ["Flask", "Streamlit", "MySQL", "Scikit-learn", "Pandas"],
    image: "/images/projects/realestate.jpg",
    imageAlt: {
      fr: "Tableau de bord de prédiction des prix immobiliers",
      en: "Real estate price prediction dashboard",
    },
    year: { fr: "2024", en: "2024" },
    links: { github: "https://github.com/AissataTraore/immobilier_project" },
  },
  {
    id: "nextgenstock",
    index: "03",
    title: "NextGenStock",
    kicker: { fr: "SaaS · Stock & facturation", en: "SaaS · Inventory & invoicing" },
    category: "fullstack",
    status: "live",
    summary: {
      fr: "Stock, devis, factures, achats et dettes dans un seul outil — pour ceux qui les tenaient dans cinq cahiers séparés.",
      en: "Stock, quotes, invoices, purchases and debts in one tool — for businesses running them in five separate notebooks.",
    },
    detail: {
      fr: "Une facture encaissée met à jour le stock, la caisse et ce que le client doit, au même instant. Le stock est valorisé en FIFO, l'alerte de seuil part avant la rupture, et un devis accepté devient une facture sans ressaisie — numérotation, PDF et lien public compris. Les factures et les relances partent par WhatsApp, sans que le client ait à créer un compte.",
      en: "A paid invoice updates the stock, the till and what the customer owes in the same moment. Stock is valued FIFO, low-stock alerts fire before the shelf is empty, and an accepted quote becomes an invoice without being retyped — numbering, PDF and a public link included. Invoices and reminders go out over WhatsApp, so the customer never has to create an account.",
    },
    result: {
      fr: "Un produit en ligne, sur abonnement, ouvert aux inscriptions.",
      en: "A live subscription product, priced and open for sign-up.",
    },
    metrics: [
      {
        value: { fr: "FIFO", en: "FIFO" },
        label: { fr: "Valorisation du stock", en: "Stock valuation" },
      },
      {
        value: { fr: "Devis → facture", en: "Quote → invoice" },
        label: { fr: "Sans ressaisie", en: "No re-entry" },
      },
      { value: { fr: "WhatsApp", en: "WhatsApp" }, label: { fr: "Canal d'envoi", en: "Delivery channel" } },
    ],
    stack: ["Laravel", "React", "Supabase", "Nginx", "VPS"],
    image: "/images/projects/nextgenstock.jpg",
    imageAlt: {
      fr: "Page d'accueil de NextGenStock avec son tableau de bord : chiffre d'affaires, factures impayées, alertes de stock et ventes de la semaine",
      en: "NextGenStock landing page with its dashboard: revenue, unpaid invoices, stock alerts and weekly sales",
    },
    year: { fr: "Depuis 2023", en: "Since 2023" },
    links: { demo: "https://nextgenstock-main-go59d8.laravel.cloud/" },
  },
  {
    id: "hombori",
    index: "04",
    title: "Hombori",
    kicker: { fr: "Immobilier · Console & mobile", en: "Real estate · Admin console & mobile" },
    category: "fullstack",
    status: "in-development",
    summary: {
      fr: "Plateforme immobilière : une console d'administration pour les utilisateurs, les annonces et les licences, et une application client sur les deux stores.",
      en: "Real estate platform: an admin console for users, listings and licences, plus a client app on both stores.",
    },
    detail: {
      fr: "La console gère les utilisateurs, la validation des annonces et les flux d'abonnement. Côté client, c'est du React Native sur iOS et Android. Une seule API REST Laravel sur PostgreSQL sert les deux, avec des hooks Clerk headless pour l'authentification sur mesure, et une CI qui fait tourner les tests sur les parcours critiques.",
      en: "The console handles user management, listing approvals and subscription entitlement flows. The client side is React Native on iOS and Android. One Laravel REST API over PostgreSQL serves both, with Clerk headless hooks driving custom authentication, and CI running automated tests over the core flows.",
    },
    result: {
      fr: "Une API unique derrière une console web et une application sur les deux stores.",
      en: "One API behind a web console and a mobile app on both stores.",
    },
    metrics: [
      {
        value: { fr: "iOS + Android", en: "iOS + Android" },
        label: { fr: "React Native", en: "React Native" },
      },
      { value: { fr: "Par rôle", en: "Role-based" }, label: { fr: "Contrôle d'accès", en: "Access control" } },
      { value: { fr: "CI", en: "CI" }, label: { fr: "Parcours testés", en: "Tested core flows" } },
    ],
    stack: ["React", "TypeScript", "React Native", "Laravel", "PostgreSQL", "Clerk"],
    year: { fr: "Depuis 2023", en: "Since 2023" },
    links: {},
  },
  {
    id: "sufitel",
    index: "05",
    title: "Sufitel",
    kicker: { fr: "Santé · Mobile", en: "Healthcare · Mobile" },
    category: "fullstack",
    status: "in-development",
    summary: {
      fr: "Application patient pour la prise de rendez-vous, le signalement d'anomalies et le suivi du dossier médical.",
      en: "Patient app for appointment booking, anomaly reporting and medical record tracking.",
    },
    detail: {
      fr: "Les patients prennent et suivent leurs rendez-vous depuis une application React Native. Une API REST Laravel sur PostgreSQL tient les dossiers et pousse des notifications en temps réel quand quelque chose bouge — personne n'a à rafraîchir une page pour l'apprendre.",
      en: "Patients book and follow appointments from a React Native app. A Laravel REST API over PostgreSQL holds the records and pushes real-time notifications when something changes, so nobody has to refresh a page to find out.",
    },
    result: {
      fr: "Rendez-vous, signalements et dossiers dans une seule application patient.",
      en: "Appointments, reports and records in one patient-facing app.",
    },
    metrics: [
      { value: { fr: "Temps réel", en: "Real time" }, label: { fr: "Notifications", en: "Notifications" } },
      {
        value: { fr: "React Native", en: "React Native" },
        label: { fr: "Application patient", en: "Patient app" },
      },
      {
        value: { fr: "PostgreSQL", en: "PostgreSQL" },
        label: { fr: "Dossiers médicaux", en: "Medical records" },
      },
    ],
    stack: ["React Native", "Laravel", "PostgreSQL", "REST API"],
    year: { fr: "Depuis 2024", en: "Since 2024" },
    links: {},
  },
  {
    id: "payroll",
    index: "06",
    title: "Emomar Paie",
    kicker: { fr: "Systèmes métier · Fullstack", en: "Business systems · Fullstack" },
    category: "fullstack",
    status: "production",
    summary: {
      fr: "Plateforme de paie complète : salaires, congés et conformité réglementaire.",
      en: "Full payroll platform covering salaries, leave and regulatory compliance.",
    },
    detail: {
      fr: "Calcul des salaires, soldes de congés et règles de conformité au même endroit, avec les bulletins générés en PDF directement depuis le système et des tableaux de bord sur tout le cycle. Construite et maintenue en production chez Emomar SARL.",
      en: "Salary calculation, leave balances and compliance rules in one place, with PDF payslips generated straight out of the system and dashboards over the whole cycle. Built and maintained in production at Emomar SARL.",
    },
    result: {
      fr: "Salaires, congés et conformité sur un seul système au lieu de trois.",
      en: "Put salaries, leave and compliance on one system instead of three.",
    },
    metrics: [
      { value: { fr: "Automatisé", en: "Automated" }, label: { fr: "Cycles de paie", en: "Salary runs" } },
      { value: { fr: "PDF", en: "PDF" }, label: { fr: "Export des bulletins", en: "Payslip export" } },
      {
        value: { fr: "En production", en: "In production" },
        label: { fr: "Emomar SARL", en: "Emomar SARL" },
      },
    ],
    stack: ["Next.js", "Django REST", "MySQL", "Tailwind CSS"],
    image: "/images/projects/payroll.png",
    imageAlt: {
      fr: "Interface de l'application de gestion de paie",
      en: "Payroll management application interface",
    },
    year: { fr: "2023", en: "2023" },
    links: { github: "https://github.com/mountagaoumarmaiaga/Gestion_paie" },
  },
  {
    id: "nextgen",
    index: "07",
    title: "Next Gen Mali Tech",
    kicker: { fr: "Site corporate · Design system", en: "Corporate site · Design system" },
    category: "fullstack",
    status: "live",
    summary: {
      fr: "Site corporate d'une startup tech malienne, construit sur un design system complet.",
      en: "Corporate site for a Malian tech startup, built on a complete design system.",
    },
    detail: {
      fr: "Un build Next.js complet pour une startup bamakoise : design system, architecture de contenu et SEO traités ensemble plutôt qu'ajoutés après coup — c'est pour ça que le site tient encore dans les 90 avec de vraies images dessus.",
      en: "A full Next.js build for a Bamako startup: design system, content architecture and SEO handled together rather than bolted on, so the site still scores in the nineties with real images on it.",
    },
    result: {
      fr: "Lighthouse 95+ en performance, accessibilité et SEO.",
      en: "Lighthouse 95+ across performance, accessibility and SEO.",
    },
    metrics: [
      { value: { fr: "95+", en: "95+" }, label: { fr: "Lighthouse", en: "Lighthouse" } },
      { value: { fr: "Next.js", en: "Next.js" }, label: { fr: "Framework", en: "Framework" } },
      { value: { fr: "En ligne", en: "Live" }, label: { fr: "Livré en 2024", en: "Shipped 2024" } },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "ShadCN UI"],
    image: "/images/projects/nextgen.jpg",
    imageAlt: {
      fr: "Page d'accueil du site corporate Next Gen Mali Tech",
      en: "Next Gen Mali Tech corporate website homepage",
    },
    year: { fr: "2024", en: "2024" },
    links: {
      demo: "https://nextgenmalitech.netlify.app/",
      github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen",
    },
  },
  {
    id: "spaceship-titanic",
    index: "08",
    title: "Spaceship Titanic",
    kicker: { fr: "Kaggle · Gradient boosting", en: "Kaggle · Gradient boosting" },
    category: "data",
    status: "completed",
    summary: {
      fr: "Compétition Kaggle : pipeline complet, de l'analyse exploratoire à un ensemble de modèles boostés.",
      en: "Kaggle competition: full pipeline from EDA to a tuned gradient-boosting ensemble.",
    },
    detail: {
      fr: "L'analyse exploratoire d'abord, puis le feature engineering qui a réellement fait bouger le score, puis un ensemble de trois modèles d'arbres boostés dont les hyperparamètres ont été cherchés par Optuna plutôt qu'à la main.",
      en: "Exploratory analysis first, then the feature engineering that actually moved the score, then an ensemble of three boosted-tree models with hyperparameters searched by Optuna rather than by hand.",
    },
    result: {
      fr: "Ensemble CatBoost, LightGBM et XGBoost optimisé avec Optuna.",
      en: "Ensemble of CatBoost, LightGBM and XGBoost tuned with Optuna.",
    },
    metrics: [
      { value: { fr: "3 modèles", en: "3 models" }, label: { fr: "Ensemble", en: "Ensemble" } },
      { value: { fr: "Optuna", en: "Optuna" }, label: { fr: "Optimisation", en: "Tuning" } },
      { value: { fr: "EDA complète", en: "Full EDA" }, label: { fr: "Pipeline", en: "Pipeline" } },
    ],
    stack: ["Python", "CatBoost", "LightGBM", "Scikit-learn", "Optuna"],
    image: "/images/projects/titanic.webp",
    imageAlt: {
      fr: "Graphiques d'importance des variables du modèle Spaceship Titanic",
      en: "Feature importance plots from the Spaceship Titanic model",
    },
    year: { fr: "2024", en: "2024" },
    links: { github: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE" },
  },
  {
    id: "kompass",
    index: "09",
    title: "KOMPASS Analytics",
    kicker: { fr: "Business intelligence · Analyse", en: "Business intelligence · Analysis" },
    category: "data",
    status: "completed",
    summary: {
      fr: "Étude statistique de trois ans de données d'entreprise, du nettoyage aux recommandations.",
      en: "Statistical study of three years of company data, from cleaning to recommendations.",
    },
    detail: {
      fr: "Deux ans de données KOMPASS nettoyées, réconciliées et visualisées, puis lues pour ce que les chiffres disaient vraiment — pour finir sur un jeu de recommandations plutôt qu'un mur de graphiques.",
      en: "Two years of KOMPASS records cleaned, reconciled and visualised, then read for what the numbers were actually saying — ending in a set of recommendations rather than a wall of charts.",
    },
    result: {
      fr: "Trois ans d'enregistrements bruts transformés en tendances lisibles.",
      en: "Turned three years of raw records into readable trends.",
    },
    metrics: [
      {
        value: { fr: "2012–2014", en: "2012–2014" },
        label: { fr: "Période couverte", en: "Period covered" },
      },
      { value: { fr: "Pandas", en: "Pandas" }, label: { fr: "Nettoyage + stats", en: "Cleaning + stats" } },
      { value: { fr: "Tendances", en: "Trends" }, label: { fr: "Livrées", en: "Delivered" } },
    ],
    stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    image: "/images/projects/kompass.webp",
    imageAlt: {
      fr: "Graphiques issus de l'analyse des données KOMPASS",
      en: "Charts from the KOMPASS data analysis",
    },
    year: { fr: "2024", en: "2024" },
    links: { github: "https://github.com/mountagaoumarmaiaga/Kompass" },
  },
];

export const projectFilters = ["all", "hybrid", "fullstack", "data"] as const;

export type ProjectFilterId = (typeof projectFilters)[number];
