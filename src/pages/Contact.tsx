import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, MessageSquare, Send, Twitter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

// Configuration EmailJS - Remplacer avec vos vraies valeurs
const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "votre_service_id",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "votre_template_id",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "votre_public_key"
};

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github size={24} />,
    href: "https://github.com/mountagaoumarmaiaga",
    color: "hover:text-white"
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    href: "https://www.linkedin.com/in/mountaga-oumar-maiga-182745251/",
    color: "hover:text-[#0A66C2]"
  },
  {
    name: "Twitter",
    icon: <Twitter size={24} />,
    href: "https://twitter.com",
    color: "hover:text-[#1DA1F2]"
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    href: "mailto:mountagaoumarmaiga@gmail.com",
    color: "hover:text-neon-purple"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!emailjsConfig.publicKey) {
      console.error("EmailJS public key is missing!");
      return;
    }
    emailjs.init(emailjsConfig.publicKey);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email
        },
        emailjsConfig.publicKey
      );

      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais."
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "L'envoi a échoué. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Contactez-<span className="text-gradient">moi</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Discutons de votre projet ou simplement échangeons autour d'un café virtuel !
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="glass-card p-8 rounded-xl shadow-lg neon-border">
              <div className="flex items-center mb-8">
                <MessageSquare className="text-neon-purple mr-3" size={28} />
                <h2 className="text-2xl font-bold">Envoyez un message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-medium">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent resize-none"
                    placeholder="Dites-moi tout..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity h-12"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Envoyer <Send className="ml-2" size={18} />
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Informations */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Mes coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-neon-purple/20 p-3 rounded-full">
                      <Mail className="text-neon-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href="mailto:mountagaoumarmaiga@gmail.com" className="text-neon-blue hover:underline">
                        mountagaoumarmaiga@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-neon-blue/20 p-3 rounded-full">
                      <MapPin className="text-neon-blue" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Localisation</h3>
                      <p className="text-muted-foreground">Bamako, Mali</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Réseaux sociaux</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 glass-card rounded-full transition-all ${link.color} hover:scale-105`}
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
                  <div>
                    <h3 className="font-bold">Disponibilité</h3>
                    <p className="text-muted-foreground">Ouvert aux nouvelles opportunités</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;