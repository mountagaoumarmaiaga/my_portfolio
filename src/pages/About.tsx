import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            À propos <span className="text-gradient">de moi</span>
          </h1>

          <section className="mb-12 glass-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Mon histoire</h2>
            <p className="text-muted-foreground mb-4">
              Je suis un développeur full-stack et un data scientist passionné
              par la création de solutions numériques innovantes qui résolvent
              des problèmes concrets. Avec plus de 5 ans d'expérience dans
              divers secteurs, je me spécialise dans la création d'applications
              évolutives et performantes qui exploitent les données pour offrir
              des expériences utilisateur exceptionnelles.
            </p>
            <p className="text-muted-foreground">
              Mon parcours dans la technologie a commencé par un diplôme en
              informatique, suivi de rôles dans des startups et des entreprises
              où j'ai affiné mes compétences en développement et en science des
              données. Je suis en apprentissage constant et j'explore de
              nouvelles technologies pour rester à la pointe du secteur.
            </p>
          </section>

          {/* Section Expérience */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Chronologie de l'expérience et Projets
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-neon-purple before:via-neon-blue before:to-transparent">
              {/* Assistant Développeur Full-Stack | EMOMAR */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-purple/10 border border-neon-purple/30 shadow shrink-0 md:mx-auto">
                  <span className="w-3 h-3 bg-neon-purple rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-lg ml-4 md:ml-0">
                  <div className="font-bold text-neon-purple">
                    2022 - Présent
                  </div>
                  <div className="text-xl font-semibold">
                    Assistant Développeur Full-Stack | Réseau et Informatique
                  </div>
                  <div className="text-muted-foreground">EMOMAR</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Assistance dans la conception et le développement
                    d'applications web, incluant une application sécurisée de
                    gestion des entrées et sorties de la plateforme de Koulouba,
                    utilisant React pour le frontend, Tailwind CSS pour le
                    design, et Django Rest Framework pour le backend, avec MySQL
                    pour la gestion de la base de données ; intégration de la
                    reconnaissance faciale avec SciPy, NumPy, et Scikit-learn,
                    ainsi que des équipements électroniques (webcams, lecteurs
                    de badges).
                    <br />
                    Participation au développement du site web d'Emomar et d'une
                    application de gestion de paie pour Emomar SARL, avec
                    Next.js pour le frontend, Tailwind CSS et ShadCN UI pour le
                    design, Django Rest Framework pour le backend, et MySQL pour
                    la gestion de la base de données.{" "}
                    <a
                      href="https://www.emomar.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir le site
                    </a>
                    .
                    <br />
                    Contribution à la réalisation du site web de la startup Next
                    Gen Mali Tech, optimisé avec Next.js, Tailwind CSS, et
                    ShadCN UI.{" "}
                    <a
                      href="https://nextgenmalitech.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir le site
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Projet Titanic Starship (Kaggle) */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-purple/10 border border-neon-purple/30 shadow shrink-0 md:mx-auto">
                  <span className="w-3 h-3 bg-neon-purple rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-lg ml-4 md:ml-0">
                  <div className="font-bold text-neon-purple">2024</div>
                  <div className="text-xl font-semibold">
                    Analyse des données Titanic Starship (Kaggle)
                  </div>
                  <div className="text-muted-foreground">
                    Kaggle - Titanic Starship
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analyse approfondie des données du jeu Spaceship Titanic
                    pour comprendre les dynamiques et les stratégies de survie.
                    Préparation et nettoyage des données pour une analyse
                    efficace. Entraînement de modèles de machine learning pour
                    prédire la survie des passagers, utilisant des techniques
                    comme la régression logistique et les forêts aléatoires.
                    Évaluation des performances des modèles et ajustement des
                    hyperparamètres pour optimiser la précision des prédictions.
                  </p>
                </div>
              </div>

              {/* Etude sur les impacts des coûts des denrées alimentaires */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-blue/10 border border-neon-blue/30 shadow shrink-0 md:mx-auto">
                  <span className="w-3 h-3 bg-neon-blue rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-lg ml-4 md:ml-0">
                  <div className="font-bold text-neon-blue">2024</div>
                  <div className="text-xl font-semibold">
                    Etude sur les impacts des hausses des prix des denrées
                    alimentaires sur les ménages au Mali
                  </div>
                  <div className="text-muted-foreground">
                    Université Internationale d'Excellence
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Collecte et nettoyage des données via Google Forms pour
                    évaluer les impacts des hausses de prix des denrées
                    alimentaires sur les ménages au Mali. Analyse des données
                    avec Python pour obtenir des résultats précis et
                    exploitables. Rédaction d'un rapport synthétisant les
                    conclusions de l'étude.
                  </p>
                </div>
              </div>

              {/* Projet KOMPASS */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/30 shadow shrink-0 md:mx-auto">
                  <span className="w-3 h-3 bg-neon-green rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-lg ml-4 md:ml-0">
                  <div className="font-bold text-neon-green">2024</div>
                  <div className="text-xl font-semibold">
                    Analyse des données KOMPASS
                  </div>
                  <div className="text-muted-foreground">KOMPASS</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analyse des données collectées de l'entreprise KOMPASS entre
                    2012 et 2014. Utilisation de techniques statistiques et de
                    visualisation de données pour comprendre les dynamiques de
                    l'entreprise et tirer des conclusions exploitables pour les
                    stratégies futures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section Compétences et Valeurs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Compétences & Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  Compétences techniques
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Développement Full-Stack</li>
                  <li>Science des données & Apprentissage automatique</li>
                  <li>DevOps & CI/CD</li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  Valeurs fondamentales
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Apprentissage continu</li>
                  <li>Design centré sur l'utilisateur</li>
                  <li>Qualité du code & Meilleures pratiques</li>
                  <li>Innovation & Résolution de problèmes</li>
                  <li>Collaboration & Communication</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
