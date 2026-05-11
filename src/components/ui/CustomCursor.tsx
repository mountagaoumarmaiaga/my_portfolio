import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [label, setLabel] = useState("");

  // Spring physics for the outer ring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  // Slower trail for a secondary ring
  const trailX = useSpring(cursorX, { stiffness: 50, damping: 15, mass: 0.8 });
  const trailY = useSpring(cursorY, { stiffness: 50, damping: 15, mass: 0.8 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setHovered(true);
        const cursorLabel = (interactive as HTMLElement).getAttribute("data-cursor") || "";
        setLabel(cursorLabel);
      } else {
        setHovered(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* ── Outer trailing ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 56 : clicked ? 28 : 36,
          height: hovered ? 56 : clicked ? 28 : 36,
          opacity: hovered ? 1 : 0.5,
          borderColor: hovered ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.25)",
          backgroundColor: hovered ? "rgba(124,58,237,0.08)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: hovered ? "blur(4px)" : "none",
        } as any}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-purple-300 uppercase tracking-widest">
            {label}
          </span>
        )}
      </motion.div>

      {/* ── Inner dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 6 : clicked ? 12 : 8,
          height: hovered ? 6 : clicked ? 12 : 8,
          backgroundColor: hovered ? "#a78bfa" : clicked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
          scale: clicked ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
