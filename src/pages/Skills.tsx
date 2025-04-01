import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillsVisualization from "@/components/skills/SkillsVisualization";
import { motion } from "framer-motion";

// Catégories de compétences avec leurs technologies
const skillCategories = [
  {
    title: "Développement Frontend",
    description:
      "Création d'interfaces utilisateur réactives, accessibles et performantes",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    title: "Développement Backend",
    description: "Création d'applications serveur sécurisées et évolutives",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "Django", level: 75 },
      { name: "Flask", level: 70 },
      { name: "Python", level: 90 },
      { name: "API RESTful", level: 95 },
     
    ],
  },
  {
    title: "Bases de données & DevOps",
    description: "Gestion des données et infrastructure de déploiement",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySql", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Firebase", level: 90 },
      { name: "Docker", level: 50 },
      { name: "Git", level: 95 },
    ],
  },
  {
    title: "Data Science & IA",
    description: "Extraction d'insights et création de systèmes intelligents",
    skills: [
      { name: "Python", level: 90 },
      { name: "Pandas", level: 85 },
      { name: "TensorFlow", level: 75 },
      { name: "PyTorch", level: 70 },
      { name: "Visualisation de données", level: 80 },
      { name: "Machine Learning", level: 85 },
      { name: "Analyse statistique", level: 80 },
    ],
  },
];

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compétences <span className="text-gradient">Techniques</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
            Ma boîte à outils technique a été façonnée au fil des années grâce à
            une expérience pratique dans le développement full-stack et le
            paysage de la data science.
          </p>

          {/* Visualisation moderne des compétences */}
          <SkillsVisualization />

          {/* Détail des compétences par catégorie */}
          <div className="space-y-16 mt-16">
            {skillCategories.map((category, idx) => (
              <motion.section
                key={idx}
                className="glass-card p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-neon-purple">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <motion.div
                          className="h-2.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * skillIdx }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Section Outils & Logiciels */}
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Outils & Logiciels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "VS Code",
                "Git",
                "Figma",
                "Adobe XD",
                "Postman",
                "Docker",
                "Jupyter",
                "Google Cloud",
                "AWS",
                "Slack",
                "Notion",
                "JIRA",
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card p-4 rounded-lg text-center hover:shadow-md hover:shadow-neon-purple/20 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section En cours d'apprentissage */}
          <motion.section
            className="mt-16 glass-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              En cours d'apprentissage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Rust",
                "WebAssembly",
                "Kubernetes",
                "Three.js",
                "Web3",
                "Développement LLM",
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                >
                  <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
