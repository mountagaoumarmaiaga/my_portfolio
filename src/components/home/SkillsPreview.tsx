import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

// Groupes de compétences avec leurs technologies correspondantes et niveaux de maîtrise
const skillGroups = [
  {
    title: "Frontend",
    icon: "🖥️",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Django", level: 75 },
    ],
  },
  {
    title: "Bases de données & DevOps",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Firebase", level: 85 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    title: "Data Science & IA",
    icon: "🧠",
    skills: [
      { name: "Python", level: 85 },
      { name: "Pandas", level: 80 },
      { name: "TensorFlow", level: 70 },
    ],
  },
];

const SkillsPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Élément d'arrière-plan */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-neon-purple/10 to-transparent opacity-30 blur-[80px] -z-10"></div>

      <motion.div
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold mb-3">
            Expertise <span className="text-gradient">Technique</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un aperçu de ma boîte à outils technique, développée au fil des
            années pour créer des produits et résoudre des problèmes complexes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-lg p-6 hover:shadow-md hover:shadow-neon-purple/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="opacity-80">{group.icon}</span>
                <span className="text-gradient">{group.title}</span>
              </h3>
              <div className="space-y-3">
                {group.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-neon-purple">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * skillIdx }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10" variants={itemVariants}>
          <Button variant="ghost" className="group">
            <Link to="/skills" className="flex items-center">
              Voir toutes les compétences
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                size={18}
              />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsPreview;
