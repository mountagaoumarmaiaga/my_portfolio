import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const liensSociaux = [
  { nom: "GitHub", icone: <Github size={20} />, href: "https://github.com" },
  {
    nom: "LinkedIn",
    icone: <Linkedin size={20} />,
    href: "https://linkedin.com",
  },
  { nom: "Twitter", icone: <Twitter size={20} />, href: "https://twitter.com" },
  {
    nom: "Email",
    icone: <Mail size={20} />,
    href: "mailto:contact@example.com",
  },
];

const PiedDePage = () => {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">DevFolio</h3>
            <p className="text-muted-foreground max-w-md">
              Création de solutions innovantes à l'intersection du design, du
              code et de la science des données.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-neon-purple transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Réseaux Sociaux</h4>
            <div className="flex space-x-4">
              {liensSociaux.map((lien) => (
                <a
                  key={lien.nom}
                  href={lien.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-purple transition-all duration-200 hover:scale-110"
                  aria-label={lien.nom}
                >
                  {lien.icone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            © {annee} Développé par Mountaga Oumar Maiga. Tous droits réservés.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PiedDePage;
