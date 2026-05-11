import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Smartphone, Server, Network, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Software Engineering",
    desc: "Applications web full-stack, architectures scalables, APIs robustes et expériences frontend cinématiques.",
    accent: "#7c3aed",
    tags: ["React", "Next.js", "Laravel", "Django"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Applications mobiles cross-platform performantes et natives avec React Native et Expo.",
    accent: "#2563eb",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    icon: Server,
    title: "Backend Systems",
    desc: "Systèmes backend robustes, bases de données optimisées, authentification et APIs RESTful sécurisées.",
    accent: "#d946ef",
    tags: ["Laravel", "Node.js", "Supabase", "PostgreSQL"],
  },
  {
    icon: Network,
    title: "IT Infrastructure",
    desc: "Infrastructure réseau, monitoring, sécurité systèmes, Windows Server et solutions CCTV Hikvision.",
    accent: "#10b981",
    tags: ["Networking", "Security", "Windows Server", "Hikvision"],
  },
  {
    icon: Cpu,
    title: "Digital Transformation",
    desc: "Accompagnement des entreprises dans leur transition numérique, automatisation et stratégie digitale.",
    accent: "#f59e0b",
    tags: ["Audit IT", "Automatisation", "Stratégie", "Conseil"],
  },
  {
    icon: Sparkles,
    title: "UI/UX & Product",
    desc: "Design systems premium, expériences utilisateurs immersives et positionnement de marque digitale.",
    accent: "#6366f1",
    tags: ["Figma", "Design System", "UX Research", "Branding"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const JavaDigitalSection = () => {
  return (
    <section className="relative py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)",
        }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Company Intro ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-20"
        >
          {/* Logo badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #d946ef 100%)",
                  fontFamily: "Syne, sans-serif",
                  boxShadow: "0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(124,58,237,0.15)",
                }}
              >
                JDS
              </div>
              {/* Orbiting ring */}
              <div
                className="absolute -inset-2 rounded-[2rem] border animate-spin-slow pointer-events-none"
                style={{ borderColor: "rgba(124,58,237,0.2)", borderStyle: "dashed" }}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Java Digital Solution
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="heading-display text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-none mb-6"
          >
            Technology company<br />
            <span className="text-gradient">built for the future.</span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/45 text-base max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Java Digital Solution est une entreprise technologique fondée sur la conviction que les petites et
            moyennes entreprises méritent des solutions digitales de qualité enterprise.
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed mb-12">
            Software engineering · Mobile apps · Backend systems · IT Infrastructure · Digital transformation — 
            une plateforme unique pour la transformation numérique au Mali et en Afrique de l'Ouest.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-2"
          >
            {[
              { value: "2024", label: "Fondée" },
              { value: "Bamako", label: "Siège social" },
              { value: "6+", label: "Services" },
              { value: "Startup", label: "Phase actuelle" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white mb-1 text-gradient" style={{ fontFamily: "Syne, sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Services Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {services.map(({ icon: Icon, title, desc, accent, tags }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="relative p-6 rounded-2xl group overflow-hidden transition-all duration-500 cursor-default"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `${accent}35`;
                el.style.background = `rgba(255,255,255,0.04)`;
                el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${accent}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.025)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Top line */}
              <div className="absolute top-0 left-6 right-6 h-px transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${accent}60, transparent)`, opacity: 0 }}
                ref={(el) => {
                  if (el) {
                    el.closest(".group")?.addEventListener("mouseenter", () => el.style.opacity = "1");
                    el.closest(".group")?.addEventListener("mouseleave", () => el.style.opacity = "0");
                  }
                }}
              />
              {/* Ambient */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                <Icon size={20} style={{ color: accent }} />
              </div>

              <h3 className="text-sm font-bold text-white/85 mb-2 group-hover:text-white transition-colors"
                style={{ fontFamily: "Syne, sans-serif" }}>
                {title}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${accent}12`,
                      border: `1px solid ${accent}25`,
                      color: `${accent}cc`,
                    }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative p-8 md:p-12 rounded-3xl overflow-hidden text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.5), transparent)" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
                ✦ Co-Founder & CTO
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Votre projet mérite une exécution d'excellence.
            </h3>
            <p className="text-white/35 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Java Digital Solution accompagne les entrepreneurs et entreprises dans la création 
              de solutions digitales modernes, robustes et scalables.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-sm gap-2"
                >
                  Discuter de votre projet
                  <ArrowUpRight size={15} />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary text-sm"
                >
                  Voir nos réalisations
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JavaDigitalSection;
