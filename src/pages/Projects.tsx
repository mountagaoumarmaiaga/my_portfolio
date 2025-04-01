
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

// Sample projects data
const projectsData = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    description: "Interactive data visualization platform with real-time analytics and machine learning insights for business intelligence.",
    longDescription: "A comprehensive analytics solution that processes large datasets and presents actionable insights through interactive visualizations. Features include predictive analytics, anomaly detection, and customizable dashboards.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=AI+Dashboard",
    tags: ["React", "TensorFlow.js", "D3.js", "Node.js", "MongoDB"],
    category: "Data Science",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack online store with payment integration, inventory management, and customer analytics.",
    longDescription: "A scalable e-commerce solution with features like product management, secure payment processing, order tracking, user authentication, and an admin dashboard for inventory and sales analytics.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=E-Commerce",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS", "Express.js"],
    category: "Full Stack",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 3,
    title: "Blockchain Explorer",
    description: "Real-time visualization and exploration tool for blockchain transactions and network metrics.",
    longDescription: "An interactive application for exploring blockchain data, visualizing transaction flows, and monitoring network health. Includes search functionality, detailed transaction views, and historical data analysis.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Blockchain+Explorer",
    tags: ["TypeScript", "Web3.js", "Express", "PostgreSQL", "Chart.js"],
    category: "Web3",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and progress tracking.",
    longDescription: "A productivity application designed for teams to manage tasks, track progress, and collaborate effectively. Features include drag-and-drop interfaces, notifications, file sharing, and integration with popular tools.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Task+Management",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    category: "Web App",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  },
  {
    id: 5,
    title: "Natural Language Processing API",
    description: "Sentiment analysis and text classification service with multilingual support.",
    longDescription: "A robust NLP API that processes text data to extract sentiment, classify content, and identify entities. Supports multiple languages and can be integrated with various applications for content moderation and analysis.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=NLP+API",
    tags: ["Python", "Flask", "spaCy", "Docker", "AWS Lambda"],
    category: "AI/ML",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio with interactive 3D elements and custom animations.",
    longDescription: "A showcase of my work and skills featuring innovative UI/UX design, interactive 3D elements, and smooth animations. Built with performance and accessibility in mind while delivering a memorable user experience.",
    image: "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Portfolio",
    tags: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS"],
    category: "Frontend",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  }
];

// Category filters
const categories = ["All", "Full Stack", "Frontend", "AI/ML", "Data Science", "Web3", "Web App"];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Projects</span></h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
            A collection of my work spanning web development, data science, and innovative solutions.
          </p>
          
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-neon-purple hover:bg-neon-purple/90" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="project-card cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-neon-purple/90 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    {project.title}
                    <ArrowUpRight size={16} className="ml-2 opacity-70" />
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="skill-tag text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="skill-tag text-xs">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No projects message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closeProjectModal}>
          <div className="max-w-4xl w-full glass-card rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</h2>
              
              <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Button className="neon-border bg-transparent" asChild>
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink size={18} className="mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" className="neon-border" asChild>
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github size={18} className="mr-2" />
                    View Code
                  </a>
                </Button>
                <Button variant="ghost" onClick={closeProjectModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Projects;
