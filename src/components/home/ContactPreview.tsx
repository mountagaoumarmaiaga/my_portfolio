import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const liensSociaux = [
  { nom: "GitHub", icone: <Github size={24} />, lien: "https://github.com" },
  {
    nom: "LinkedIn",
    icone: <Linkedin size={24} />,
    lien: "https://linkedin.com",
  },
  { nom: "Twitter", icone: <Twitter size={24} />, lien: "https://twitter.com" },
  {
    nom: "Email",
    icone: <Mail size={24} />,
    lien: "mailto:mountagaoumarmaiga@gmail.com",
  },
];

const AperçuContact = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent -z-10"></div>

      <div className="container mx-auto max-w-4xl glass-card rounded-xl p-8 md:p-12 neon-border">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Premons <span className="text-gradient">Contact</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Intéressé(e) par une collaboration ? Une question sur mon travail ?
            Connectons-nous et créons quelque chose d'exceptionnel.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <Button
            size="lg"
            className="w-full md:w-auto neon-border bg-transparent"
          >
            <Link to="/contact" className="flex items-center justify-center">
              Envoyer un message
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            {liensSociaux.map((lien) => (
              <a
                key={lien.nom}
                href={lien.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-full hover:text-neon-purple hover:scale-110 transition-all duration-200"
                aria-label={lien.nom}
              >
                {lien.icone}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-muted-foreground">
          <p>
            Ou contactez-moi directement par email à :{" "}
            <a
              href="mailto:mountagaoumarmaiga@gmail.com"
              className="text-neon-blue hover:underline"
            >
              mountagaoumarmaiga@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AperçuContact;
