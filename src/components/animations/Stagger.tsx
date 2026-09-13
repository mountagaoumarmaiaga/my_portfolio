"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type Ref } from "react";
import { revealOnScroll } from "@/lib/animations";

interface StaggerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Descendants matching this selector are revealed in sequence. */
  selector?: string;
  stagger?: number;
  y?: number;
  x?: number;
  delay?: number;
  start?: string;
}

/** Reveals every `[data-animate]` descendant in document order. */
export default function Stagger({
  children,
  as = "div",
  className,
  selector = "[data-animate]",
  stagger = 0.09,
  y = 26,
  x = 0,
  delay = 0,
  start = "top 82%",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    const tween = revealOnScroll(targets, { y, x, stagger, delay, start });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [delay, selector, stagger, start, x, y]);

  // `as` is a runtime choice; the cast narrows the props to one concrete element
  // so TypeScript can check className, ref and children instead of giving up.
  const Component = as as "div";

  return (
    <Component ref={ref as Ref<HTMLDivElement>} className={className}>
      {children}
    </Component>
  );
}
