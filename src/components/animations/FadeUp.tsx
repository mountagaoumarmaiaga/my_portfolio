"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type Ref } from "react";
import { revealOnScroll } from "@/lib/animations";

interface FadeUpProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

/** Reveals a single element as it enters the viewport. */
export default function FadeUp({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  start = "top 84%",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = revealOnScroll(ref.current, { y, delay, start, stagger: 0 });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [delay, start, y]);

  // `as` is a runtime choice; the cast narrows the props to one concrete element
  // so TypeScript can check className, ref and children instead of giving up.
  const Component = as as "div";

  return (
    <Component ref={ref as Ref<HTMLDivElement>} className={className} data-animate>
      {children}
    </Component>
  );
}
