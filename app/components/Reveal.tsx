"use client";

import { type ReactNode, useEffect, useRef } from "react";

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: "div" | "li" | "dl";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        ref.current = el;
      }}
      data-reveal=""
      className={className}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
