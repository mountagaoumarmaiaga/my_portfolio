import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ContactPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const pillBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
  const pillBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const pillText = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)";

  return (
    <section ref={ref} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)" }} />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}>

          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="section-label">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {t("contact_label")}
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp}
            className="heading-display text-[clamp(2.5rem,7vw,6rem)] leading-none mb-6"
            style={{ color: isLight ? "#0a0a0e" : "#ffffff" }}>
            {t("contact_title_1")} <span className="text-gradient">{t("contact_title_2")}</span>
            <br />{t("contact_title_3")}
          </motion.h2>

          <motion.p variants={fadeUp} className="max-w-2xl mx-auto mb-12 text-sm leading-relaxed" style={{ color: textSub }}>
            {t("contact_desc")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary gap-2.5 text-sm">
                <Mail size={16} />{t("contact_cta")} <ArrowRight size={15} />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {[
              { icon: MapPin, text: t("contact_location") },
              { icon: Mail, text: "mountagaoumarmaiga@gmail.com" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                style={{ background: pillBg, border: `1px solid ${pillBorder}`, color: pillText }}>
                <Icon size={12} />{text}
              </span>
            ))}
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("contact_available")}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPreview;
