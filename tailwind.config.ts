import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050608",
          50: "#0a0c10",
          100: "#0e1116",
          200: "#14181f",
        },
        mali: {
          green: "#14B45C",
          greenSoft: "#3BD47F",
          greenDeep: "#0B8A44",
          gold: "#FFC61A",
          goldSoft: "#FFD866",
        },
        /**
         * Every step is checked against the #050608 background: muted 9.6:1,
         * faint 6.0:1, ghost 4.6:1. The previous scale bottomed out at 1.4:1,
         * which was decoration pretending to be text.
         */
        ink: {
          DEFAULT: "#F4F5F7",
          muted: "rgba(244, 245, 247, 0.72)",
          faint: "rgba(244, 245, 247, 0.56)",
          ghost: "rgba(244, 245, 247, 0.48)",
        },
        hairline: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.16)",
          soft: "rgba(255, 255, 255, 0.045)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      letterSpacing: {
        label: "0.18em",
      },
      fontSize: {
        label: ["11px", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pin-pulse": {
          "0%": { transform: "scale(0.6)", opacity: "0.65" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "35%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
          "65%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "1" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "0" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pin-pulse": "pin-pulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "scroll-line": "scroll-line 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "marquee-x": "marquee-x 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
