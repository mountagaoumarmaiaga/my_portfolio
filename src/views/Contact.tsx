import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";

const FloatingInput = ({ id, label, type = "text", value, onChange, required, rows }: {
  id: string; label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "14px",
    color: isLight ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
    fontFamily: "Inter, sans-serif", fontSize: "14px", resize: "none" as const,
  };

  return (
    <div className="relative">
      <motion.label htmlFor={id}
        animate={{ y: isActive ? -24 : 0, x: isActive ? -2 : 0, scale: isActive ? 0.8 : 1,
          color: focused ? "rgba(167,139,250,0.9)" : isActive ? isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" : isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)" }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 text-sm font-medium pointer-events-none origin-left z-10"
        style={{ transformOrigin: "left center" }}>
        {label}
      </motion.label>
      {rows
        ? <textarea id={id} name={id} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} rows={rows} style={{ ...baseStyle, paddingTop: "1.75rem", paddingBottom: "0.75rem", paddingLeft: "1rem", paddingRight: "1rem" }} />
        : <input id={id} name={id} type={type} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={{ ...baseStyle, padding: "1.75rem 1rem 0.75rem" }} />}
    </div>
  );
};

const Contact = () => {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: "Mountaga",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(lang === "fr" ? "Erreur d'envoi. Réessayez ou contactez-moi directement." : "Send failed. Try again or contact me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const headColor = isLight ? "#0a0a0e" : "#ffffff";
  const textSub = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const cardBg = isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.02)";
  const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";
  const pillBg = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";

  const socials = [
    { icon: Github, href: "https://github.com/mountagaoumarmaiaga", color: isLight ? "#000" : "#fff" },
    { icon: Linkedin, href: "https://linkedin.com/in/mountaga-oumar-maiga-182745251", color: "#0A66C2" },
    { icon: Twitter, href: "https://twitter.com", color: "#1DA1F2" },
    { icon: Mail, href: "mailto:mountagaoumarmaiga@gmail.com", color: "#a78bfa" },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <Navbar />
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-32">
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="text-center mb-20">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="section-label"><span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />{t("contact_label")}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="heading-display text-[clamp(3rem,8vw,7rem)] leading-none mb-6" style={{ color: headColor }}>
            {t("contact_page_title")}<br /><span className="text-gradient">{t("contact_page_title_2")}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-md mx-auto text-base leading-relaxed" style={{ color: textSub }}>
            {t("contact_page_desc")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3 relative p-8 md:p-10 rounded-3xl overflow-hidden"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.5), transparent)" }} />

            {sent && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl z-20"
                style={{ background: isLight ? "rgba(245,245,247,0.95)" : "rgba(8,8,9,0.92)", backdropFilter: "blur(12px)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <CheckCircle2 size={26} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
                  {t("contact_send") === "Send message" ? "Message sent!" : "Message envoyé !"}
                </h3>
                <p className="text-sm text-center max-w-xs" style={{ color: textSub }}>
                  {t("contact_send") === "Send message" ? "Thank you! I'll reply as soon as possible." : "Merci ! Je vous répondrai dans les meilleurs délais."}
                </p>
              </motion.div>
            )}

            <h2 className="text-xl font-bold mb-8" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>
              {t("contact_send") === "Send message" ? "Send a message" : "Envoyez un message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput id="name" label={t("contact_name")} value={form.name} onChange={handleChange} required />
                <FloatingInput id="email" label={t("contact_email")} type="email" value={form.email} onChange={handleChange} required />
              </div>
              <FloatingInput id="subject" label={t("contact_subject")} value={form.subject} onChange={handleChange} required />
              <FloatingInput id="message" label={t("contact_message")} value={form.message} onChange={handleChange} required rows={5} />
              <motion.button type="submit" disabled={submitting} whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full h-14 flex items-center justify-center gap-3 rounded-2xl font-semibold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 0 24px rgba(124,58,237,0.3)", opacity: submitting ? 0.7 : 1 }}>
                {submitting
                  ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white" />{t("contact_sending")}</>
                  : <><Send size={16} />{t("contact_send")}</>}
              </motion.button>

              {/* Error message */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                  <AlertCircle size={15} />
                  {error}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="lg:col-span-2 space-y-4">
            <div className="p-7 rounded-3xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
              <div className="space-y-6 mb-8">
                {[
                  { icon: Mail, label: "Email", text: "mountagaoumarmaiga@gmail.com", color: "#7c3aed" },
                  { icon: MapPin, label: t("contact_location").split("·")[0].trim(), text: t("contact_location"), color: "#2563eb" },
                ].map(({ icon: Icon, label, text, color }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: textSub }}>
                        {label === "Email" ? "Email" : t("contact_location").includes("Mali") ? "Localisation" : "Location"}
                      </div>
                      <span className="text-sm font-medium break-all" style={{ color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)" }}>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t" style={{ borderColor: cardBorder }}>
                <div className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: textSub }}>{t("contact_networks")}</div>
                <div className="flex gap-2">
                  {socials.map(({ icon: Icon, href, color }) => (
                    <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: pillBg, border: `1px solid ${cardBorder}`, color: textSub }}>
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <div className="flex items-start gap-4">
                <div className="relative mt-1">
                  <span className="absolute w-3 h-3 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "Syne, sans-serif", color: headColor }}>{t("contact_available")}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: textSub }}>{t("contact_page_desc")}</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
              <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: textSub }}>{t("contact_response")}</div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-gradient" style={{ fontFamily: "Syne, sans-serif" }}>{t("contact_response_val")}</span>
                <span className="text-xs mb-1" style={{ color: textSub }}>{t("contact_response_sub")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;