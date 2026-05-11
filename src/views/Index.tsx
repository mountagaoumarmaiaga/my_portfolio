import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import SkillsPreview from "@/components/home/SkillsPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ContactPreview from "@/components/home/ContactPreview";

const sep = (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />
      <main>
        <HeroSection />
        {sep}
        <AboutPreview />
        {sep}
        <SkillsPreview />
        {sep}
        <ProjectsPreview />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
