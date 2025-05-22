import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const liensNavigation = [
  { nom: "Accueil", chemin: "/" },
  { nom: "À propos", chemin: "/about" },
  { nom: "Compétences", chemin: "/skills" },
  { nom: "Projets", chemin: "/projects" },
  { nom: "Contact", chemin: "/contact" },
];

export function BarreDeNavigation() {
  const [estDéfilé, setEstDéfilé] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const estMobile = useIsMobile();

  useEffect(() => {
    const gérerDéfilement = () => {
      setEstDéfilé(window.scrollY > 10);
    };

    window.addEventListener("scroll", gérerDéfilement);
    return () => window.removeEventListener("scroll", gérerDéfilement);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        estDéfilé
          ? "glass-morphism backdrop-blur-lg bg-background/70"
          : "bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            <span className="animate-glow">Port</span>Folio
          </div>
        </Link>

        {/* Navigation Desktop */}
        {!estMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {liensNavigation.map((lien) => (
              <Link key={lien.nom} to={lien.chemin} className="nav-link">
                {lien.nom}
              </Link>
            ))}
            <a href="/CV.pdf" download>
            <Button size="sm" variant="outline" className="group neon-border">
              CV
              <Download size={16} className="ml-2 group-hover:animate-bounce" />
            </Button>
            </a>
          </nav>
        )}

        {/* Bouton Menu Mobile */}
        {estMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="md:hidden text-white"
          >
            {menuOuvert ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}
      </div>

      {/* Navigation Mobile */}
      {estMobile && menuOuvert && (
        <nav className="glass-morphism backdrop-blur-lg md:hidden py-4 px-6 absolute top-full left-0 right-0 border-t border-white/5">
          <div className="flex flex-col space-y-4">
            {liensNavigation.map((lien) => (
              <Link
                key={lien.nom}
                to={lien.chemin}
                className="nav-link py-2"
                onClick={() => setMenuOuvert(false)}
              >
                {lien.nom}
              </Link>
            ))}
            <a href="/CV.pdf" download>
            <Button size="sm" variant="outline" className="neon-border mt-2">
              CV
              <Download size={16} className="ml-2" />
            </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default BarreDeNavigation;
