import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6">
              À propos <span className="text-gradient">de moi</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Développeur full-stack et data scientist, je combine expertise
              technique et esprit analytique pour créer des solutions numériques
              performantes et adaptées aux enjeux technologiques actuels."
            </p>
            <p className="text-muted-foreground mb-6">
              Fort d’un parcours en informatique et d’une expérience variée dans
              plusieurs industries, je me spécialise dans le développement
              d’applications performantes et évolutives, exploitant la puissance
              des données pour offrir des expériences utilisateur optimales.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-2xl font-bold text-neon-purple mb-1">
                  3+
                </div>
                <div className="text-sm text-muted-foreground">
                  Années d'expérience
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-blue mb-1">
                  5+
                </div>
                <div className="text-sm text-muted-foreground">
                  Projets réalisés
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-pink mb-1">
                  3+
                </div>
                <div className="text-sm text-muted-foreground">
                  Clients satisfaits
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-purple mb-1">
                  10+
                </div>
                <div className="text-sm text-muted-foreground">
                  Technologies maîtrisées
                </div>
              </div>
            </div>

            <Button variant="ghost" className="group">
              <Link to="/about" className="flex items-center">
                En savoir plus
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  size={18}
                />
              </Link>
            </Button>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="glass-card rounded-lg p-1 max-w-md mx-auto neon-border">
              <div className="aspect-square w-full bg-secondary rounded-lg overflow-hidden">
                {/* Remplace par une image de profil réelle */}
                <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-gradient">
                  <img
                    src="/mountaga.png"
                    alt="Mountaga"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-blue/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-neon-purple/10 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
