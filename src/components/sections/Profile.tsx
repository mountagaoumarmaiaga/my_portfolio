"use client";

import { useEffect, useMemo, useRef } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Stagger from "@/components/animations/Stagger";
import { useCopy } from "@/hooks/useCopy";
import { gsap, registerGsap } from "@/lib/animations";
import { objectives } from "@/data/site";

/**
 * The presentation: who is speaking, before any project is shown. The statement
 * is scrubbed in word by word because it is the one line the whole page rests on.
 */
export default function Profile() {
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const { lang, c } = useCopy();

  const words = useMemo(() => c.profile.statement.split(" "), [c.profile.statement]);
  const objective = objectives[lang].trim();

  useEffect(() => {
    const root = wordsRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root.querySelectorAll("[data-word]"), { opacity: 1 });
      return;
    }

    registerGsap();
    const tween = gsap.to(root.querySelectorAll("[data-word]"), {
      opacity: 1,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: { trigger: root, start: "top 78%", end: "bottom 62%", scrub: 0.5 },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // Re-splitting on a language change means the tween has to be rebuilt.
  }, [words]);

  return (
    <section id="profile" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="shell">
        <FadeUp className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-label text-mali-green">
            {c.profile.index}
          </span>
          <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />
          <span className="eyebrow">{c.profile.eyebrow}</span>
        </FadeUp>

        <FadeUp as="h2" className="display mt-8 max-w-4xl text-[clamp(2.1rem,6vw,4.4rem)]" y={34}>
          {c.profile.titleLine1}
          <br />
          {c.profile.titleLine2}
          <span className="text-mali-gold">.</span>
        </FadeUp>

        <p
          key={lang}
          ref={wordsRef}
          className="mt-12 max-w-3xl text-pretty text-[clamp(1rem,2vw,1.32rem)] leading-[1.7] text-ink"
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} data-word className="opacity-[0.22]">
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-6">
            <FadeUp>
              <h3 className="eyebrow">{c.profile.summaryTitle}</h3>
              <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-muted">
                {c.profile.summary}
              </p>
            </FadeUp>

            {/* Rendered only once he has written them — no invented ambitions. */}
            {objective && (
              <FadeUp className="mt-12" delay={0.08}>
                <h3 className="eyebrow">{c.profile.objectivesTitle}</h3>
                <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink">
                  {objective}
                </p>
              </FadeUp>
            )}
          </div>

          <div className="lg:col-span-6">
            <FadeUp>
              <h3 className="eyebrow">{c.profile.strengthsTitle}</h3>
            </FadeUp>

            <Stagger as="ul" className="mt-5 flex flex-col" y={16} stagger={0.07}>
              {c.profile.strengths.map((strength, index) => (
                <li
                  key={strength}
                  data-animate
                  className="flex gap-4 border-b border-hairline-soft py-3.5 last:border-b-0"
                >
                  <span className="mt-0.5 font-mono text-[10px] tracking-label text-mali-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty text-[14px] leading-relaxed text-ink-muted">
                    {strength}
                  </span>
                </li>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
