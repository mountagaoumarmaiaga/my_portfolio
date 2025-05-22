import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

// Données d'exemple pour les projets
const projects = [
  {
    id: 1,
    title: "Site_Web Next-Gen-Mali-Tech",
    description: "Site web pour une startup.",
    image: "/Next gen.jpeg", // Assurez-vous que l'image est dans le dossier 'public' sans le préfixe 'public/'
    tags: ["React", "Next.js", "Tailwind", "Shadcn ui"],
    github: "https://github.com/mountagaoumarmaiaga/Site-web-Next-Gen",
    demo: "https://nextgenmalitech.netlify.app/",
  },
  {
    id: 2,
    title: "Gestion de Paiement",
    description: "Gestionnaire de Paie des employee.",
    image: "/Emomar124.png",
    tags: ["django Rest Api", "Sql-lite", "React", "Tailwind CSS"],
    github: "https://github.com/mountagaoumarmaiaga/Gestion_paie.git",
    demo: "https://example.com",
  },
  {
    id: 3,
    title: "Plateforme de prediction de prix immobiliers",
    description:
      "Plateforme de prédiction des prix immobiliers et d'analyse des tendances du marché en temps réel.",
    image: "Imobilier.jpg", // Assurez-vous que l'image est dans le dossier 'public' sans le préfixe 'public/'
    tags: [
      "flask",
      "mysql",
      "streamlit",
      "model de regression linear",
      
    ],
    github: "https://github.com/AissataTraore/immobilier_project.git",
    demo: "https://example.com",
  },
];

const ProjectsPreview = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Accent de fond */}
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-radial from-neon-blue/10 to-transparent opacity-30 blur-[80px] -z-10"></div>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">
            Projets <span className="text-gradient">Mise en Avant</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une sélection de mes travaux les plus impactants, couvrant les
            applications web, la data science et des solutions innovantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card group">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="skill-tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" className="group">
            <Link to="/projects" className="flex items-center">
              Voir tous les projets
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                size={18}
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
