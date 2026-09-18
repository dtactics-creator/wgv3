"use client";

import { useRef } from "react";
import { counter, fadeUp } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { stats } from "@/data/site";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, () => {
    const scope = root.current;
    if (!scope) return;
    fadeUp(scope.querySelectorAll("[data-stat]"), null, { stagger: 0.12 });
    const value = scope.querySelector("[data-counter]");
    counter(value, value?.closest("[data-stat]"), 15);
    return () => { if (value) value.textContent = "15"; };
  });

  return (
    <section ref={root} aria-label="Our foundation" className="border-t border-ink/10 bg-white text-ink">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-stat className="bg-white p-8 md:p-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-black/45">{stat.label}</p>
              <p className="font-display mt-7 text-4xl font-semibold uppercase leading-none tracking-wide md:text-5xl">
                {stat.value !== null ? (
                  <>
                    <span className="sr-only">15+ years of industry knowledge</span>
                    <span aria-hidden="true"><span data-counter>15</span><span className="text-wintergreen">+</span></span>
                  </>
                ) : (
                  <span className={stat.text === "End-to-End" ? "text-[2rem] md:text-[2.6rem]" : ""}>{stat.text}</span>
                )}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-black/50">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
