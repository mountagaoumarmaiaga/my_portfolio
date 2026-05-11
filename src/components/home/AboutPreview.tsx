import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Cpu, Globe } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const stats_keys = ["about_stat_1", "about_stat_2", "about_stat_3", "about_stat_4"] as const;
const stat_values = ["4+", "20+", "25+", "8+"];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const AboutPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pillars = [
    { icon: Globe, titleKey: "Full Stack Engineering", descKey: "React, Next.js, Laravel, Django, Express.js — du frontend cinématique au backend scalable." },
    { icon: Database, titleKey: "Backend & APIs", descKey: "Laravel · Django REST · Express.js · PHP · Node.js — APIs robustes, Prisma, Supabase, PostgreSQL, MongoDB." },
    { icon: Cpu, titleKey: "Infrastructure & Réseau", descKey: "IT Support, Monitoring, Windows Server, Hikvision, sécurité et réseaux." },
    { icon: Code2, titleKey: "Co-Founder @ JDS", descKey: "Java Digital Solution — startup tech focalisée sur la transformation numérique." },
  ];

  const borderColor = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)";
  const textSecondary = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)";

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${isLight ? "rgba(37,99,235,0.05)" : "rgba(37,99,235,0.08)"} 0%, transparent 70%)`, filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"} className="mb-20">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {t("about_label")}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="heading-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none mb-6"
                style={{ color: isLight ? "#0a0a0e" : "#ffffff" }}>
                {t("about_title_1")} <br />
                <span className="text-gradient">{t("about_title_2")}</span><br />
                {t("about_title_3")}
              </h2>
              <p className="leading-relaxed mb-6 text-base" style={{ color: textSecondary }}>
                {t("about_desc_1")}
              </p>
              <p className="leading-relaxed text-sm" style={{ color: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)" }}>
                {t("about_desc_2")}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stat_values.map((val, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card-hover p-6 rounded-2xl">
                  <div className="text-4xl font-black mb-1 text-gradient" style={{ fontFamily: "Syne, sans-serif" }}>{val}</div>
                  <div className="text-xs leading-snug" style={{ color: textSecondary }}>{t(stats_keys[i])}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div key={i} variants={fadeUp}
              className="glass-card-hover p-6 rounded-2xl group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <Icon size={20} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "Syne, sans-serif", color: isLight ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)" }}>
                {titleKey}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: textSecondary }}>{descKey}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
