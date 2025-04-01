
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import SkillsPreview from '@/components/home/SkillsPreview';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import ContactPreview from '@/components/home/ContactPreview';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutPreview />
        <SkillsPreview />
        <ProjectsPreview />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
