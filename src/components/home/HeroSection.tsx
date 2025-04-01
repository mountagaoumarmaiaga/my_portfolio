import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";


const titresDynamique = [
  "Développeur Full-Stack",
  "Designer Graphique",
  "Data Scientist",
];

const HeroSection = () => {
  const [indexTitre, setIndexTitre] = useState(0);
  const [titreAffiche, setTitreAffiche] = useState(titresDynamique[0]);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);
  const [boucleNum, setBoucleNum] = useState(0);
  const [texte, setTexte] = useState("");
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const periode = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [texte, delta, suppressionEnCours, titreAffiche]);

  const tick = () => {
    let i = boucleNum % titresDynamique.length;
    let texteComplet = titresDynamique[i];
    let texteMisAJour = suppressionEnCours
      ? texteComplet.substring(0, texte.length - 1)
      : texteComplet.substring(0, texte.length + 1);

    setTexte(texteMisAJour);

    if (suppressionEnCours) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!suppressionEnCours && texteMisAJour === texteComplet) {
      setSuppressionEnCours(true);
      setDelta(periode);
    } else if (suppressionEnCours && texteMisAJour === "") {
      setSuppressionEnCours(false);
      setBoucleNum(boucleNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-28 pb-10 px-4 relative overflow-hidden">
      {/* Effets lumineux en arrière-plan */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple/20 blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-neon-blue/20 blur-[100px] -z-10"></div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <h2 className="text-xl md:text-2xl font-medium mb-3 opacity-80">
            Bonjour, je suis
          </h2>
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient">{texte}</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-lg">
            Je crée des expériences numériques exceptionnelles avec un code
            propre et des analyses de données, ouvrant la voie à l'avenir de la
            technologie.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="neon-border bg-transparent">
              <Link to="/projects" className="flex items-center">
                Voir mes projets <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="neon-border">
              Télécharger mon CV <Download className="ml-2" size={18} />
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
            <span>Disponible pour de nouvelles opportunités</span>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center animate-float">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink opacity-30 blur-md animate-pulse-glow"></div>
            <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
              <div className="text-5xl font-bold">
                {/* Remplacez par une véritable image/avatar */}
                <div className="grid-layout w-full h-full text-9xl flex items-center justify-center text-neon-purple glow-effect">
                  <img
                    src="/mountaga.png"
                    alt="Mountaga"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
