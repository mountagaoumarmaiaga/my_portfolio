"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import GlobeFallback from "./GlobeFallback";
import GlobeHud from "./GlobeHud";
import GlobeTether from "./GlobeTether";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useIsMobile, useReducedMotion, useWebGLSupport } from "@/hooks/useEnvironment";
import { forViewport, getStop, setGlobeReady, useGlobeState } from "@/lib/globe-director";

// three.js, drei and the textures live entirely in this chunk — nothing 3D is
// parsed on the server or blocks the first paint.
const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => null });

/**
 * The globe, mounted once for the whole page and pinned behind everything.
 *
 * Sections do not each get a canvas; they take turns pointing this one
 * somewhere, and it fades back when a section needs the reader's attention on
 * words instead. That single shared object is what ties the page together.
 */
export default function GlobeLayer() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const webgl = useWebGLSupport();
  const { stopId, phase, ready } = useGlobeState();

  const [loader, setLoader] = useState({ progress: 0, active: true });

  const stop = useMemo(() => forViewport(getStop(stopId), isMobile), [stopId, isMobile]);

  const handleProgress = useCallback(
    (progress: number, active: boolean) => setLoader({ progress, active }),
    [],
  );

  // Without WebGL there is nothing to wait for, so release the copy at once.
  useEffect(() => {
    if (webgl === false) setGlobeReady();
  }, [webgl]);

  const showScene = webgl === true;
  // Opacity only — a CSS blur on a full-viewport canvas costs a filter pass every
  // single frame, and the fade alone is enough to put text back in front.
  const presence = 1 - stop.dim * 0.82;

  return (
    <>
      {showScene && (
        <LoadingScreen progress={loader.progress} active={loader.active} onDone={setGlobeReady} />
      )}

      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div
          className="h-full w-full transition-opacity duration-[1700ms] ease-editorial"
          style={{ opacity: ready ? presence : 0 }}
        >
          {showScene ? (
            <GlobeScene
              isMobile={isMobile}
              reducedMotion={reducedMotion}
              onProgress={handleProgress}
            />
          ) : webgl === false ? (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-[1700ms] ease-editorial"
              style={{ transform: `translateX(${-stop.offsetX * 100}%)` }}
            >
              <GlobeFallback className="h-auto w-[min(78vw,460px)]" />
            </div>
          ) : null}
        </div>
      </div>

      <GlobeTether isMobile={isMobile} />

      <GlobeHud stop={stop} visible={phase === "IDLE" && ready} isMobile={isMobile} />
    </>
  );
}
