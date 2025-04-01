import React from "react";
import { motion } from "framer-motion";
import {
  Atom,
  FileCode,
  FastForward,
  Waves,
  Terminal,
  Rocket,
  Code,
  Database,
  BarChart2,
  Leaf,
  Flame,
  Ship,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    icon: React.ReactNode;
    color: string;
    level: number;
    description: string;
  }[];
}

const SkillsVisualization = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: (
        <div className="w-6 h-6 border border-white/20 rounded mr-2 flex items-center justify-center">
          <Code size={16} />
        </div>
      ),
      skills: [
        {
          name: "React",
          icon: <Atom size={40} color="#61DAFB" />,
          color: "from-blue-500 to-cyan-400",
          level: 90,
          description:
            "Bibliothèque UI basée sur les composants pour créer des interfaces interactives",
        },
        {
          name: "TypeScript",
          icon: <FileCode size={40} color="#3178C6" />,
          color: "from-blue-600 to-blue-400",
          level: 85,
          description:
            "Sur-ensemble typé de JavaScript pour un code plus robuste",
        },
        {
          name: "Next.js",
          icon: <FastForward size={40} color="#ffffff" />,
          color: "from-gray-800 to-gray-600",
          level: 80,
          description:
            "Framework React avec SSR intégré et capacités de routage",
        },
        {
          name: "Tailwind CSS",
          icon: <Waves size={40} color="#38BDF8" />,
          color: "from-cyan-500 to-cyan-300",
          level: 90,
          description:
            "Framework CSS utility-first pour un développement UI rapide",
        },
      ],
    },
    {
      title: "Backend",
      icon: (
        <div className="w-6 h-6 border border-white/20 rounded mr-2 flex items-center justify-center">
          <Database size={16} />
        </div>
      ),
      skills: [
        {
          name: "Node.js",
          icon: <Terminal size={40} color="#83CD29" />,
          color: "from-green-600 to-green-400",
          level: 85,
          description:
            "Environnement JavaScript pour construire des applications côté serveur",
        },
        {
          name: "Express.js",
          icon: <Rocket size={40} color="#ffffff" />,
          color: "from-gray-600 to-gray-400",
          level: 80,
          description: "Framework Node.js minimaliste pour applications web",
        },
        {
          name: "Django",
          icon: <Code size={40} color="#44B78B" />,
          color: "from-green-600 to-green-400",
          level: 75,
          description: "Framework Python haut niveau avec batteries incluses",
        },
        {
          name: "Flask",
          icon: <Code size={40} color="#44B78B" />,
          color: "from-green-600 to-green-400",
          level: 75,
          description: "Framework Python haut niveau avec batteries incluses",
        },
      ],
    },
    {
      title: "Data Science & IA",
      icon: (
        <div className="w-6 h-6 border border-white/20 rounded mr-2 flex items-center justify-center">
          <BarChart2 size={16} />
        </div>
      ),
      skills: [
        {
          name: "Python",
          icon: <Code size={40} color="#FFD43B" />,
          color: "from-yellow-500 to-yellow-300",
          level: 85,
          description: "Langage polyvalent pour la data science et l'IA",
        },

        {
          name: "Pandas",
          icon: <BarChart2 size={40} color="#150458" />,
          color: "from-blue-700 to-blue-500",
          level: 80,
          description:
            "Bibliothèque Python pour la manipulation et l'analyse de données",
        },
        {
          name: "TensorFlow",
          icon: <Code size={40} color="#FF6F00" />,
          color: "from-orange-600 to-orange-400",
          level: 70,
          description:
            "Bibliothèque open-source pour le machine learning et le développement IA",
        },
      ],
    },
    {
      title: "Bases de données & DevOps",
      icon: (
        <div className="w-6 h-6 border border-white/20 rounded mr-2 flex items-center justify-center">
          <Database size={16} />
        </div>
      ),
      skills: [
        {
          name: "MongoDB",
          icon: <Leaf size={40} color="#4DB33D" />,
          color: "from-green-600 to-green-400",
          level: 85,
          description: "Base de données NoSQL pour applications modernes",
        },
        {
          name: "PostgreSQL",
          icon: <Database size={40} color="#336791" />,
          color: "from-blue-600 to-blue-400",
          level: 80,
          description:
            "Système de base de données relationnelle-objet puissant et open-source",
        },
        {
          name: "Firebase",
          icon: <Flame size={40} color="#FFCA28" />,
          color: "from-yellow-500 to-yellow-300",
          level: 85,
          description:
            "Plateforme de développement d'applications avec base de données en temps réel",
        },
        {
          name: "SQL",
          icon: <Database size={40} color="#336791" />,
          color: "from-blue-600 to-blue-400",
          level: 80,
          description:
            "Système de base de données relationnelle-objet puissant et open-source",
        },
        {
          name: "Docker",
          icon: <Ship size={40} color="#2496ED" />,
          color: "from-blue-500 to-blue-300",
          level: 50,
          description:
            "Plateforme de conteneurisation pour le déploiement d'applications",
        },
      ],
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {skillCategories.map((category, catIndex) => (
        <motion.section
          key={catIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            {category.icon}
            <h2 className="text-2xl font-bold text-white">{category.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.skills.map((skill, skillIndex) => (
              <HoverCard key={skillIndex}>
                <HoverCardTrigger asChild>
                  <motion.div
                    className="glass-card rounded-lg p-6 cursor-pointer"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    <div className="flex justify-center mb-4">{skill.icon}</div>
                    <h3 className="text-center text-lg font-medium mb-4">
                      {skill.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Maîtrise</span>
                        <span className="text-white">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 glass-card border-none">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8">{skill.icon}</div>
                      <h4 className="text-lg font-semibold">{skill.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <motion.div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default SkillsVisualization;
