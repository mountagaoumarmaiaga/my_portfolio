"use client";

import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/hooks/useCopy";

interface LoadingScreenProps {
  /** Real texture progress, 0–100. Stays at 0 until the 3D chunk has loaded. */
  progress: number;
  /** True while the scene still has assets in flight. */
  active: boolean;
  onDone?: () => void;
}

/**
 * Sits over the hero until the globe is ready. The bar reports real bytes once
 * three's loading manager is running; before that it crawls, capped low, so the
 * download of the 3D chunk reads as progress without ever lying about being done.
 */
export default function LoadingScreen({ progress, active, onDone }: LoadingScreenProps) {
  const { lang, c } = useCopy();
  const [display, setDisplay] = useState(0);
  const [hidden, setHidden] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      // Asymptotic crawl to ~14% while we wait for the chunk itself.
      const crawl = 14 * (1 - Math.exp(-elapsed / 1.6));
      setDisplay((current) => Math.max(current, crawl, progress));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setHidden(true);
    onDone?.();
  };

  useEffect(() => {
    if (active || progress < 100) return;
    const timer = window.setTimeout(finish, 380);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, progress]);

  // A texture that never resolves must not trap anyone behind a curtain.
  useEffect(() => {
    const bail = window.setTimeout(finish, 9000);
    return () => window.clearTimeout(bail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = Math.min(100, Math.round(display));

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-void transition-opacity duration-[900ms] ease-editorial ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-hidden={hidden}
    >
      <div className="flex w-[min(300px,68vw)] flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">{c.loading.title}</p>
          <p className="font-mono text-[10px] tabular-nums text-ink-faint">{String(value).padStart(3, "0")}</p>
        </div>

        <div className="h-px w-full overflow-hidden bg-hairline">
          <div
            className="h-full origin-left bg-mali-green transition-[width] duration-500 ease-out"
            style={{ width: `${value}%` }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
          {lang === "fr" ? "Bamako · 12,6392° N, 8,0029° O" : "Bamako · 12.6392° N, 8.0029° W"}
        </p>
      </div>
    </div>
  );
}
