import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Twitter,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SkillsVisualization from "@/components/skills/SkillsVisualization";

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github size={24} />,
    href: "https://github.com",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    href: "https://linkedin.com",
    color: "hover:text-[#0A66C2]",
  },
  {
    name: "Twitter",
    icon: <Twitter size={24} />,
    href: "https://twitter.com",
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    href: "mailto:contact@example.com",
    color: "hover:text-neon-purple",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message. Je vous répondrai bientôt.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entrons en <span className="text-gradient">Contact</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Vous avez un projet en tête ? Vous souhaitez collaborer ? Ou
            simplement échanger ? N'hésitez pas à me contacter.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Formulaire de contact */}
            <div className="glass-card rounded-lg p-6 md:p-8 neon-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="mr-2" size={24} />
                Envoyer un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    placeholder="jean@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    placeholder="Demande de projet"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="contact-input resize-none"
                    placeholder="Parlez-moi de votre projet ou de votre demande..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-purple hover:bg-neon-purple/90"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            </div>

            {/* Infos de contact & Visualisation des compétences */}
            <div className="space-y-8">
              {/* Visualisation des compétences */}
              <SkillsVisualization />

              <div className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Me contacter</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-neon-purple/20 p-3 rounded-full mr-4">
                      <Mail className="text-neon-purple" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">E-mail</h3>
                      <a
                        href="mailto:contact@example.com"
                        className="text-neon-blue hover:underline"
                      >
                        contact@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-neon-blue/20 p-3 rounded-full mr-4">
                      <MapPin className="text-neon-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">Localisation</h3>
                      <p className="text-muted-foreground">
                        San Francisco, Californie
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Profils sociaux</h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 glass-card rounded-full transition-all duration-200 hover:scale-110 ${link.color}`}
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Disponibilité</h2>
                <p className="text-muted-foreground mb-2">
                  Je suis actuellement disponible pour des missions freelance et
                  des collaborations.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
                  <span>Ouvert aux nouvelles opportunités</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
