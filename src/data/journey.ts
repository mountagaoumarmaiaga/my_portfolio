import type { I18n, I18nList } from "@/lib/i18n";

export interface JourneyItem {
  id: string;
  period: I18n;
  title: I18n;
  organisation: string;
  location: string;
  description: I18n;
  /** What was actually done there. Empty for entries that do not need it. */
  highlights: I18nList;
  kind: "education" | "work";
}

/** Newest first — the timeline renders in this order. */
export const journey: JourneyItem[] = [
  {
    id: "emomar",
    period: { fr: "2022 — Aujourd'hui", en: "2022 — Present" },
    title: {
      fr: "Développeur Fullstack & Technicien informatique",
      en: "Full Stack Developer & IT Technician",
    },
    organisation: "Emomar SARL",
    location: "Bamako, Mali",
    description: {
      fr: "Quatre ans à construire, déployer et maintenir les applications de production de l'entreprise — et à rester joignable quand elles tombent.",
      en: "Four years building, deploying and maintaining the company's production applications — and staying reachable when they fall over.",
    },
    highlights: {
      fr: [
        "Pilotage de la console d'administration Hombori (React / Vite / TypeScript, Clerk headless, Laravel Sanctum) : gestion des utilisateurs, contrôle des licences, permissions par rôle et flux d'abonnement, utilisés par les clients web et mobiles.",
        "Conception et maintenance des APIs REST consommées par les clients web et React Native — contrats définis, versionnage géré, gestion d'erreurs standardisée pour fiabiliser l'intégration.",
        "Déploiement et exploitation sur VPS Linux (Nginx, PHP-FPM, Contabo) : pipelines CI, configuration d'environnements, supervision de la disponibilité et astreinte en cas d'incident.",
        "Qualité du code tenue par les revues, les patterns MVC et Repository, et les tests automatisés (Jest, PHPUnit).",
        "Construction de la plateforme d'accès par reconnaissance faciale de Koulouba (React, Django REST, MySQL, scikit-learn), avec intégration matérielle : webcams et lecteurs de badges.",
        "Développement de la plateforme de paie Emomar (Next.js, Django REST, MySQL) et du site Next Gen Mali Tech, et gestion de leurs mises en production.",
        "Traduction de besoins produit complexes en tâches chiffrées, avec estimation de charge et coordination de la livraison avec l'équipe.",
      ],
      en: [
        "Led the Hombori admin console (React / Vite / TypeScript, Clerk headless, Laravel Sanctum): user management, licence control, role-based permissions and subscription flows, used by both web and mobile clients.",
        "Designed and maintained the REST APIs consumed by web and React Native clients — contracts defined, versioning managed, error handling standardised to make integration reliable.",
        "Deployed and ran production applications on Linux VPS (Nginx, PHP-FPM, Contabo): CI pipelines, environment configuration, uptime monitoring and on-call incident response.",
        "Held code quality through reviews, MVC and Repository patterns, and automated testing (Jest, PHPUnit).",
        "Built the Koulouba facial-recognition access platform (React, Django REST, MySQL, scikit-learn), integrating the hardware: webcams and badge readers.",
        "Developed the Emomar payroll platform (Next.js, Django REST, MySQL) and the Next Gen Mali Tech site, and managed both production deployments.",
        "Translated complex product requirements into scoped tasks with level-of-effort estimates, coordinating delivery with teammates.",
      ],
    },
    kind: "work",
  },
  {
    id: "master-data-science",
    period: { fr: "2023 — Aujourd'hui", en: "2023 — Present" },
    title: { fr: "Master en Informatique", en: "Master's in Computer Science" },
    organisation: "UIE Mali",
    location: "Bamako, Mali",
    description: {
      fr: "Data science et machine learning : statistiques avancées, modélisation, et recherche appliquée sur des jeux de données issus de l'économie malienne.",
      en: "Data science and machine learning: advanced statistics, modelling, and applied research on datasets drawn from the Malian economy.",
    },
    highlights: { fr: [], en: [] },
    kind: "education",
  },
  {
    id: "licence",
    period: { fr: "2019 — 2022", en: "2019 — 2022" },
    title: { fr: "Licence en Informatique", en: "B.Sc. in Computer Science" },
    organisation: "INTEC-SUP",
    location: "Bamako, Mali",
    description: {
      fr: "Réseaux et télécommunications, génie logiciel et systèmes distribués, avec une première vraie exposition à l'analyse de données.",
      en: "Networks and telecommunications, software engineering and distributed systems, with a first serious exposure to data analysis.",
    },
    highlights: { fr: [], en: [] },
    kind: "education",
  },
  {
    id: "dut",
    period: { fr: "2019 — 2021", en: "2019 — 2021" },
    title: { fr: "DUT en Informatique", en: "DUT in Computer Science" },
    organisation: "INTEC-SUP",
    location: "Bamako, Mali",
    description: {
      fr: "Informatique de gestion : bases de données, conception de systèmes d'information, et le côté opérationnel d'un logiciel dans une organisation.",
      en: "Management informatics: databases, information systems design, and the operational side of running software inside an organisation.",
    },
    highlights: { fr: [], en: [] },
    kind: "education",
  },
];

/** Earliest year on the timeline, used by the expertise stats. */
export const buildingSince = journey.reduce((min, item) => {
  const year = Number(item.period.en.slice(0, 4));
  return Number.isFinite(year) ? Math.min(min, year) : min;
}, 9999);
