"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/Logo";

const ReadyContext = createContext({ ready: false });
export function useReady() { return useContext(ReadyContext); }

/** A short brand reveal that hands over to the scroll experience in 1.8 seconds. */
export default function SiteLoader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousOverflow = document.documentElement.style.overflow;
    let finished = false;
    let timeline: gsap.core.Timeline | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (root) root.style.display = "none";
      document.documentElement.style.overflow = previousOverflow;
      setReady(true);
    };
    document.documentElement.style.overflow = "hidden";
    const safety = window.setTimeout(finish, 2200);

    const context = gsap.context(() => {
      if (preference.matches) { finish(); return; }
      timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo("[data-loader-mark]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0)
        .to("[data-loader-body]", { opacity: 0, y: -12, duration: 0.3 }, 0.7)
        .to(root, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0.95);
    }, root);

    const onPreference = () => {
      if (preference.matches) { timeline?.kill(); finish(); }
    };
    preference.addEventListener("change", onPreference);
    return () => {
      window.clearTimeout(safety);
      preference.removeEventListener("change", onPreference);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <ReadyContext.Provider value={{ ready }}>
      {!ready && (
        <div ref={rootRef} aria-hidden="true" className="site-loader pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink">
          <div data-loader-body className="flex flex-col items-center">
            <div data-loader-mark><Logo tone="light" size="md" /></div>
          </div>
        </div>
      )}
      <noscript><style>{`.site-loader { display: none !important; }`}</style></noscript>
      {children}
    </ReadyContext.Provider>
  );
}
