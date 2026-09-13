import GlobeLayer from "@/components/globe/GlobeLayer";
import SectionGlobeSync from "@/components/globe/SectionGlobeSync";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Profile from "@/components/sections/Profile";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Journey from "@/components/sections/Journey";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import GlobalSection from "@/components/sections/GlobalSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      {/* One globe, pinned behind the page. Every section below reframes it. */}
      <GlobeLayer />
      <SectionGlobeSync />

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <Profile />
        <FeaturedProjects />
        <Journey />
        <Skills />
        <Services />
        <About />
        <GlobalSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
