"use client";

import { useRef } from "react";
import { gsap, fadeUp, maskReveal } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { approachSteps } from "@/data/site";
import { Eyebrow, Mask } from "@/components/ui";

export default function Approach() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useScrollScene(root, ({ mobile }) => {
    const scope = root.current;
    if (!scope) return;
    maskReveal(headingRef.current);
    fadeUp(scope.querySelectorAll("[data-fade]"));
    scope.querySelectorAll("[data-step]").forEach((step) => {
      const title = step.querySelector("[data-step-heading]");
      const number = step.querySelector("[data-step-num]");
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: step, start: "top 86%", end: "bottom 22%", scrub: 0.55 },
      })
        .fromTo(title, { y: mobile ? 8 : 16, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35 }, 0)
        .fromTo(number, { color: "#888888" }, { color: "#3F7B3C", duration: 0.3 }, 0.05)
        .to(title, { opacity: 0.55, duration: 0.2 }, 0.8);
    });
  });

  return (
    <section id="approach" ref={root} className="bg-paper text-ink">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-44 lg:px-14">
        <Eyebrow index="07" className="mb-10 md:mb-16">Our approach</Eyebrow>
        <div className="grid gap-14 lg:grid-cols-12">
          <div ref={headingRef} className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2rem,6.2vw,5.8rem)] font-medium uppercase leading-[1.02] md:text-[clamp(2.6rem,6.2vw,5.8rem)]">
              <Mask>From opportunity</Mask>
              <Mask>to <em className="italic">ownership.</em></Mask>
            </h2>
          </div>
          <div className="self-end lg:col-span-4">
            <p data-fade className="text-base leading-relaxed text-black/60 md:text-lg">
              Five stages — one considered journey from the first conversation to completion. Clear, discreet and methodical at every step.
            </p>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24">
          <ol ref={listRef} className="grid grid-cols-1 gap-0 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {approachSteps.map((step) => (
              <li key={step.num} data-step className="relative px-0 pt-8 pb-4 pr-6">
                <div className="flex flex-col gap-3">
                  <span data-step-num aria-hidden="true" className="font-display text-2xl font-medium italic leading-none text-wintergreen md:text-3xl">{step.num}</span>
                  <h3 data-step-heading className="font-display text-lg font-medium uppercase leading-tight md:text-2xl">{step.title}.</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
