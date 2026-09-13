import type { I18n } from "@/lib/i18n";

/** 1–5. Five reads as "this is a tool I reach for without thinking". */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Discipline = "fullstack" | "data";

/** Group keys, not labels — the display names live in `copy.ts`. */
export type SkillGroup =
  | "frontend"
  | "mobile"
  | "backend"
  | "auth"
  | "database"
  | "infra"
  | "testing"
  | "analysis"
  | "modelling"
  | "delivery";

export interface Tech {
  id: string;
  /** Technology names are not translated. */
  name: string;
  discipline: Discipline;
  group: SkillGroup;
  level: SkillLevel;
  /** What it is actually used for here — not what the docs say it is for. */
  use: I18n;
  /**
   * Stack entries in `projects.ts` that count as this technology, so each card
   * can show the work it was used on rather than an invented number of years.
   */
  matches: string[];
}

export const disciplines: Array<{ id: Discipline; title: I18n; caption: I18n }> = [
  {
    id: "fullstack",
    title: { fr: "Fullstack", en: "Fullstack" },
    caption: {
      fr: "De l'interface jusqu'au serveur qui la fait tourner.",
      en: "From the interface down to the server it runs on.",
    },
  },
  {
    id: "data",
    title: { fr: "Data Science", en: "Data Science" },
    caption: {
      fr: "Transformer des enregistrements bruts en décisions.",
      en: "Turning raw records into decisions people act on.",
    },
  },
];

export const technologies: Tech[] = [
  {
    id: "react",
    name: "React",
    discipline: "fullstack",
    group: "frontend",
    level: 5,
    use: {
      fr: "L'architecture des consoles et tableaux de bord que je livre.",
      en: "Component architecture for the consoles and dashboards I ship.",
    },
    matches: ["React"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    discipline: "fullstack",
    group: "frontend",
    level: 5,
    use: {
      fr: "App Router, composants serveur, et le SEO qui vient avec.",
      en: "App Router, server components, and the SEO that comes with them.",
    },
    matches: ["Next.js"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    discipline: "fullstack",
    group: "frontend",
    level: 5,
    use: {
      fr: "Mode strict par défaut — le compilateur attrape ce que les tests laisseraient passer.",
      en: "Strict mode by default — the compiler catches what tests would not.",
    },
    matches: ["TypeScript"],
  },
  {
    id: "vite",
    name: "Vite",
    discipline: "fullstack",
    group: "frontend",
    level: 4,
    use: {
      fr: "Le build derrière la console d'administration Hombori.",
      en: "The build behind the Hombori admin console.",
    },
    matches: [],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    discipline: "fullstack",
    group: "frontend",
    level: 5,
    use: {
      fr: "Des design systems qui restent cohérents sans feuille de style à surveiller.",
      en: "Design systems that stay consistent without a stylesheet to police.",
    },
    matches: ["Tailwind CSS"],
  },
  {
    id: "shadcn",
    name: "ShadCN UI",
    discipline: "fullstack",
    group: "frontend",
    level: 4,
    use: {
      fr: "Des primitives accessibles dont je possède le code, pas une dépendance.",
      en: "Accessible primitives I own the source of, rather than a dependency.",
    },
    matches: ["ShadCN UI"],
  },
  {
    id: "react-native",
    name: "React Native",
    discipline: "fullstack",
    group: "mobile",
    level: 4,
    use: {
      fr: "Applications client sur iOS et Android depuis une seule base de code, livrées avec Expo.",
      en: "Client apps on iOS and Android from one codebase, shipped with Expo.",
    },
    matches: ["React Native"],
  },
  {
    id: "laravel",
    name: "Laravel",
    discipline: "fullstack",
    group: "backend",
    level: 5,
    use: {
      fr: "Le backend sous NextGenStock, Hombori et Sufitel.",
      en: "The backend under NextGenStock, Hombori and Sufitel.",
    },
    matches: ["Laravel"],
  },
  {
    id: "python",
    name: "Python",
    discipline: "fullstack",
    group: "backend",
    level: 5,
    use: {
      fr: "Services, pipelines de données et colle — le langage que j'écris le plus.",
      en: "Services, data pipelines and glue — the language I write most.",
    },
    matches: ["Python"],
  },
  {
    id: "django",
    name: "Django REST",
    discipline: "fullstack",
    group: "backend",
    level: 4,
    use: {
      fr: "Quand une API a besoin d'une administration complète derrière elle.",
      en: "Where an API needs a batteries-included admin behind it.",
    },
    matches: ["Django REST"],
  },
  {
    id: "node",
    name: "Node.js · Express",
    discipline: "fullstack",
    group: "backend",
    level: 4,
    use: {
      fr: "JavaScript côté serveur, pour l'outillage et les couches d'API légères.",
      en: "JavaScript on the server, for tooling and thin API layers.",
    },
    matches: [],
  },
  {
    id: "flask",
    name: "Flask",
    discipline: "fullstack",
    group: "backend",
    level: 4,
    use: {
      fr: "Petits services où un framework complet gênerait plus qu'il n'aiderait.",
      en: "Small services where a full framework would be in the way.",
    },
    matches: ["Flask"],
  },
  {
    id: "php",
    name: "PHP",
    discipline: "fullstack",
    group: "backend",
    level: 4,
    use: {
      fr: "Le langage sous le travail Laravel, lu et écrit directement.",
      en: "The language under the Laravel work, read and written directly.",
    },
    matches: [],
  },
  {
    id: "nestjs",
    name: "NestJS",
    discipline: "fullstack",
    group: "backend",
    level: 2,
    use: {
      fr: "En cours d'apprentissage — services Node structurés avec injection de dépendances.",
      en: "Currently learning — structured Node services with dependency injection.",
    },
    matches: [],
  },
  {
    id: "rest",
    name: "Design d'API REST",
    discipline: "fullstack",
    group: "auth",
    level: 5,
    use: {
      fr: "Contrats, versionnage et gestion d'erreurs décidés avant d'écrire le code.",
      en: "Contracts, versioning and error handling agreed before code is written.",
    },
    matches: ["REST API"],
  },
  {
    id: "clerk",
    name: "Clerk",
    discipline: "fullstack",
    group: "auth",
    level: 4,
    use: {
      fr: "Hooks headless quand le parcours de connexion doit être le nôtre, pas le leur.",
      en: "Headless hooks when the sign-in flow has to be ours, not theirs.",
    },
    matches: ["Clerk"],
  },
  {
    id: "sanctum",
    name: "Laravel Sanctum",
    discipline: "fullstack",
    group: "auth",
    level: 4,
    use: {
      fr: "Authentification par jeton entre une API Laravel et ses clients.",
      en: "Token auth between a Laravel API and the clients that consume it.",
    },
    matches: [],
  },
  {
    id: "rbac",
    name: "Contrôle d'accès par rôle",
    discipline: "fullstack",
    group: "auth",
    level: 5,
    use: {
      fr: "Permissions et droits, de la console d'administration jusqu'à la ligne de données.",
      en: "Permissions and entitlements, from the admin console down to the row.",
    },
    matches: [],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    discipline: "fullstack",
    group: "database",
    level: 5,
    use: {
      fr: "Quand le modèle de données mérite de vraies contraintes et de vrais types.",
      en: "Where the data model deserves constraints and real types.",
    },
    matches: ["PostgreSQL"],
  },
  {
    id: "mysql",
    name: "MySQL",
    discipline: "fullstack",
    group: "database",
    level: 5,
    use: {
      fr: "La base derrière les systèmes plus anciens que je maintiens encore.",
      en: "The database behind the older systems I still maintain.",
    },
    matches: ["MySQL"],
  },
  {
    id: "supabase",
    name: "Supabase",
    discipline: "fullstack",
    group: "database",
    level: 4,
    use: {
      fr: "Postgres, authentification et stockage sans monter un serveur d'abord.",
      en: "Postgres, auth and storage without standing a server up first.",
    },
    matches: ["Supabase"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    discipline: "fullstack",
    group: "database",
    level: 3,
    use: {
      fr: "Stockage documentaire quand la forme des données varie vraiment.",
      en: "Document storage when the shape genuinely varies.",
    },
    matches: [],
  },
  {
    id: "linux",
    name: "VPS Linux",
    discipline: "fullstack",
    group: "infra",
    level: 4,
    use: {
      fr: "Provisionner et faire tourner les machines Contabo où vivent mes applications.",
      en: "Provisioning and running the Contabo boxes my apps live on.",
    },
    matches: ["VPS"],
  },
  {
    id: "nginx",
    name: "Nginx · PHP-FPM",
    discipline: "fullstack",
    group: "infra",
    level: 4,
    use: {
      fr: "Reverse proxy, TLS et service des fichiers statiques devant chaque déploiement.",
      en: "Reverse proxy, TLS and static serving in front of every deploy.",
    },
    matches: ["Nginx"],
  },
  {
    id: "git",
    name: "Git · GitHub",
    discipline: "fullstack",
    group: "infra",
    level: 5,
    use: {
      fr: "Branches, revues, et un historique que je peux relire.",
      en: "Branching, review and a history I can actually read back.",
    },
    matches: [],
  },
  {
    id: "ci",
    name: "Pipelines CI",
    discipline: "fullstack",
    group: "infra",
    level: 4,
    use: {
      fr: "Des vérifications à chaque push, pour qu'un build cassé n'atteigne jamais un serveur.",
      en: "Checks on every push, so a broken build never reaches a server.",
    },
    matches: [],
  },
  {
    id: "aws",
    name: "AWS",
    discipline: "fullstack",
    group: "infra",
    level: 2,
    use: {
      fr: "En cours d'apprentissage — patterns cloud-native au-delà d'un seul VPS.",
      en: "Currently learning — cloud-native patterns beyond a single VPS.",
    },
    matches: [],
  },
  {
    id: "jest",
    name: "Jest",
    discipline: "fullstack",
    group: "testing",
    level: 4,
    use: {
      fr: "Tests unitaires et d'intégration sur les parcours qui ne doivent pas casser.",
      en: "Unit and integration coverage on the flows that must not break.",
    },
    matches: [],
  },
  {
    id: "phpunit",
    name: "PHPUnit",
    discipline: "fullstack",
    group: "testing",
    level: 4,
    use: {
      fr: "La même discipline du côté Laravel de la pile.",
      en: "The same discipline on the Laravel side of the stack.",
    },
    matches: [],
  },
  {
    id: "pandas",
    name: "Pandas",
    discipline: "data",
    group: "analysis",
    level: 5,
    use: {
      fr: "Nettoyer et remodeler avant de pouvoir poser la moindre question aux données.",
      en: "Cleaning and reshaping before any question can be asked of the data.",
    },
    matches: ["Pandas"],
  },
  {
    id: "numpy",
    name: "NumPy",
    discipline: "data",
    group: "analysis",
    level: 4,
    use: {
      fr: "Le calcul matriciel sous tout le reste de la pile.",
      en: "The array maths under everything else in the stack.",
    },
    matches: ["NumPy"],
  },
  {
    id: "jupyter",
    name: "Jupyter",
    discipline: "data",
    group: "analysis",
    level: 4,
    use: {
      fr: "Là où se fait l'exploration, avant que quoi que ce soit devienne un script.",
      en: "Where the exploration happens before anything becomes a script.",
    },
    matches: [],
  },
  {
    id: "sklearn",
    name: "Scikit-learn",
    discipline: "data",
    group: "modelling",
    level: 4,
    use: {
      fr: "Baselines, pipelines et l'évaluation qui les tient honnêtes.",
      en: "Baselines, pipelines and the evaluation that keeps them honest.",
    },
    matches: ["Scikit-learn"],
  },
  {
    id: "boosting",
    name: "CatBoost · LightGBM",
    discipline: "data",
    group: "modelling",
    level: 4,
    use: {
      fr: "Gradient boosting quand la donnée tabulaire est tout le problème.",
      en: "Gradient boosting where tabular data is the whole problem.",
    },
    matches: ["CatBoost", "LightGBM"],
  },
  {
    id: "optuna",
    name: "Optuna",
    discipline: "data",
    group: "modelling",
    level: 4,
    use: {
      fr: "Chercher les hyperparamètres au lieu de les deviner.",
      en: "Searching hyperparameters instead of guessing at them.",
    },
    matches: ["Optuna"],
  },
  {
    id: "opencv",
    name: "OpenCV",
    discipline: "data",
    group: "modelling",
    level: 3,
    use: {
      fr: "Détection de visages et tout le traitement d'image autour.",
      en: "Face detection and the image handling around it.",
    },
    matches: ["OpenCV"],
  },
  {
    id: "streamlit",
    name: "Streamlit",
    discipline: "data",
    group: "delivery",
    level: 4,
    use: {
      fr: "Mettre un modèle devant ceux qui ont posé la question.",
      en: "Putting a model in front of the people who asked the question.",
    },
    matches: ["Streamlit"],
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    discipline: "data",
    group: "delivery",
    level: 4,
    use: {
      fr: "Des graphiques faits pour être lus, pas pour remplir une diapositive.",
      en: "Charts made to be read, not to fill a slide.",
    },
    matches: ["Matplotlib"],
  },
];

export const skillGroups = [...new Set(technologies.map((tech) => tech.group))];
