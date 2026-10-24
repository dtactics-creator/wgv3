"use client";

import { useRef } from "react";
import { gsap, fadeUp, maskReveal } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { principles } from "@/data/site";
import { Eyebrow, Mask } from "@/components/ui";

export default function Why() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    const scope = root.current;
    if (!scope) return;
    maskReveal(headingRef.current);
    fadeUp(scope.querySelectorAll("[data-fade]"));
    scope.querySelectorAll("[data-principle]").forEach((row) => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: row, start: "top 88%", end: "bottom 18%", scrub: mobile ? 0.4 : 0.75 },
      });
      timeline
        .fromTo(row.querySelector("[data-principle-heading]"), { y: mobile ? 16 : 30, opacity: 0.48 }, { y: 0, opacity: 1, duration: 0.4 }, 0)
        .fromTo(row.querySelector("[data-principle-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0)
        .to(row.querySelector("[data-principle-heading]"), { opacity: 0.55, duration: 0.2 }, 0.8);
    });
  });

  return (
    <section id="why" ref={root} className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-44 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <Eyebrow index="05" tone="dark" className="mb-10 md:mb-14">Why WinterGreen</Eyebrow>
              <div ref={headingRef}>
                <h2 className="font-display text-[clamp(1.8rem,4.2vw,4.6rem)] font-medium leading-[1.02] md:text-[clamp(2.2rem,4.2vw,4.6rem)]">
                  <Mask>Why</Mask>
                  <Mask>WinterGreen<span className="text-wintergreen">?</span></Mask>
                </h2>
              </div>
              <p data-fade className="mt-8 max-w-sm text-base leading-relaxed text-white/55">Four principles shape every conversation, every property and every relationship — quietly, and without compromise.</p>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <ul className="border-t border-white/10">
              {principles.map((principle) => (
                <li key={principle.num} data-principle className="relative border-b border-white/10 py-12 md:py-16">
                  <div data-principle-heading className="flex items-baseline gap-7 md:gap-10">
                    <span aria-hidden="true" className="font-display text-3xl font-medium italic leading-none text-wintergreen md:text-4xl">{principle.num}</span>
                    <h3 className="min-w-0 font-display text-2xl font-medium uppercase leading-none md:text-5xl">{principle.title}</h3>
                  </div>
                  <p data-fade className="ml-14 mt-5 max-w-md text-base leading-relaxed text-white/60 md:ml-20">{principle.text}</p>
                  <span data-principle-rule aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left bg-wintergreen" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
