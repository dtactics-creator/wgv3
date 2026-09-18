"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Discreet custom cursor — desktop only.
 * Expands over interactive elements; shows a label when [data-cursor] is set.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        const label = target.getAttribute("data-cursor");
        if (label && labelRef.current) {
          labelRef.current.textContent = label;
          gsap.to(labelRef.current, { autoAlpha: 1, duration: 0.25 });
          gsap.to(ring, {
            width: 84,
            height: 84,
            backgroundColor: "rgba(17,17,17,0.55)",
            borderColor: "rgba(63,123,60,0.9)",
            duration: 0.35,
            ease: "power3.out",
          });
        } else {
          gsap.to(ring, {
            width: 56,
            height: 56,
            borderColor: "rgba(63,123,60,0.9)",
            duration: 0.35,
            ease: "power3.out",
          });
        }
      } else {
        gsap.to(labelRef.current, { autoAlpha: 0, duration: 0.2 });
        gsap.to(ring, {
          width: 36,
          height: 36,
          backgroundColor: "rgba(17,17,17,0)",
          borderColor: "rgba(255,255,255,0.35)",
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-wintergreen"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] flex h-9 w-9 items-center justify-center rounded-full border border-white/35 backdrop-blur-[2px]"
      >
        <span
          ref={labelRef}
          className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white opacity-0"
        />
      </div>
    </>
  );
}
