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
      document.documentElement.style.overflow = previousOverflow;
      setReady(true);
    };
    document.documentElement.style.overflow = "hidden";
    const safety = window.setTimeout(finish, 2200);

    const context = gsap.context(() => {
      if (preference.matches) { finish(); return; }
      timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo("[data-loader-mark]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0)
        .fromTo("[data-letter]", { yPercent: 115 }, { yPercent: 0, duration: 0.55, stagger: 0.018, ease: "power4.out" }, 0.08)
        .fromTo("[data-loader-sub]", { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.3)
        .fromTo("[data-loader-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.4)
        .to("[data-loader-body]", { opacity: 0, y: -18, duration: 0.22 }, 0.95)
        .to(root, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, 1.1);
    }, root);
    const onPreference = () => {
      if (preference.matches) { timeline?.kill(); finish(); }
    };
    preference.addEventListener("change", onPreference);
    return () => {
      window.clearTimeout(safety);
      preference.removeEventListener("change", onPreference);
      context.revert();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <ReadyContext.Provider value={{ ready }}>
      {!ready && (
        <div ref={rootRef} aria-hidden="true" className="site-loader pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink">
          <div data-loader-body className="flex flex-col items-center">
            <div data-loader-mark><Logo tone="light" size="md" /></div>
            <div className="mt-10 flex overflow-hidden">
              {"WinterGreen".split("").map((letter, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span data-letter className="font-display inline-block text-2xl font-semibold tracking-[0.28em] text-white md:text-4xl">{letter}</span>
                </span>
              ))}
            </div>
            <span data-loader-sub className="mt-4 text-[9px] font-medium uppercase tracking-[0.38em] text-wintergreen md:text-[10px]">
              Timeless&nbsp;Properties.&nbsp;Evergreen&nbsp;Value
            </span>
            <span data-loader-line className="mt-8 block h-px w-16 origin-left bg-wintergreen/70" />
          </div>
        </div>
      )}
      <noscript><style>{`.site-loader { display: none !important; }`}</style></noscript>
      {children}
    </ReadyContext.Provider>
  );
}
