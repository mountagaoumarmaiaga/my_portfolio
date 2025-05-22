import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

// Données d'exemple des projets
const projectsData = [
  {
    id: 1,
    title: "Site_Web Next-Gen-Mali-Tech",
    description: "Site web pour une startup.",
    longDescription:
      "Site web officiel de notre startup, présentant notre vision, nos services et nos solutions innovantes.",
    image: "/Next gen.jpeg",
    tags: ["React", "Next.js", "Tailwind", "Shadcn ui"],
    category: "Full Stack",
    github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen",
    demo: "https://nextgenmalitech.netlify.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Gestion de Paiement",
    description: "Gestionnaire de Paie des employés.",
    longDescription:
      "Application web dédiée à la gestion de la paie, offrant des solutions automatisées et efficaces pour le calcul des salaires, la gestion des congés, et la conformité réglementaire.",
    image: "/Emomar124.png",
    category: "Full Stack",
    tags: ["django Rest Api", "Sql-lite", "React", "Tailwind CSS"],
    github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Plateforme de prédiction de prix immobiliers",
    description:
      "Plateforme de prédiction des prix immobiliers et d'analyse des tendances du marché en temps réel.",
    image: "Imobilier.jpg",
    category: "Data Science",

    tags: ["flask", "mysql", "streamlit", "modèle de régression linéaire"],
    github: "https://github.com/AissataTraore/immobilier_project.git",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: 4,
    title: "Compétition KAGGLE: TITANIC STARSHIP",
    description: "Analyse approfondie des données du jeu Spaceship Titanic.",
    longDescription:
      "Analyse approfondie des données du jeu Spaceship Titanic pour comprendre les dynamiques et les stratégies de survie. Préparation et nettoyage des données pour une analyse efficace. Entraînement de modèles de machine learning pour prédire la survie des passagers, utilisant des techniques comme la régression logistique et les forêts aléatoires. Évaluation des performances des modèles et ajustement des hyperparamètres pour optimiser la précision des prédictions.",
    image: "titanic.webp",
    tags: [
      "kaggle",
      "Python",
      "catboost",
      "sklearn",
      "lightgbm",
      "numpy",
      "pandas",
    ],
    category: "AI/ML",
    github: "https://github.com/mountagaoumarmaiaga/CompetitionKAGGLE.git",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: 5,
    title: "KOMPASS",
    description: "Analyse de données",
    longDescription:
      "Analyse des données collectées (utilisation de techniques statistiques et de visualisation de données) sur les données de l'entreprise KOMPASS entre 2012 et 2014.",
    image: "/Kompass.webp",
    tags: ["Python", "Excel", "numpy", "pandas"],
    category: "Data Science",
    github: "https://github.com/mountagaoumarmaiaga/Kompass.git",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: 6,
    title: "Application sécurisée de gestion des entrées et sorties",
    description:
      "Une application sécurisée de gestion des entrées et sorties de la plateforme de Koulouba.",
    longDescription:
      "Une application sécurisée de gestion des entrées et sorties de la plateforme de Koulouba.",
    image: "/WebApp.jpg",
    tags: [
      "Django Rest Framework",
      "React",
      "mysql",
      "Tailwind CSS",
      "SciPy",
      "Scikit­learn",
      "NumPy",
    ],
    category: "Web App",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
];

// Filtres par catégorie
const categories = [
  "Tous",
  "Full Stack",
  "Frontend",
  "AI/ML",
  "Data Science",
  "Web3",
  "Web App",
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCategory === "Tous") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-gradient">Projets</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
            Une collection de mes travaux couvrant le développement web, la
            science des données et des solutions innovantes.
          </p>

          {/* Filtre par catégories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-neon-purple hover:bg-neon-purple/90"
                    : ""
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Grille des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-neon-purple/90 text-white text-xs px-2 py-1 rounded-full">
                      Vedette
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    {project.title}
                    <ArrowUpRight size={16} className="ml-2 opacity-70" />
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="skill-tag text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="skill-tag text-xs">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun projet */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal du projet */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeProjectModal}
        >
          <div
            className="max-w-4xl w-full glass-card rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-muted-foreground mb-6">
                {selectedProject.longDescription}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Technologies utilisées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <Button className="neon-border bg-transparent" asChild>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Démo en direct
                  </a>
                </Button>
                <Button variant="outline" className="neon-border" asChild>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github size={18} className="mr-2" />
                    Voir sur GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Projects;
