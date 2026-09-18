"use client";

import { useRef } from "react";
import { gsap, fadeUp, horizontalDrift } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { statementWords } from "@/data/site";
import { Eyebrow } from "@/components/ui";

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? []);
    gsap.fromTo("[data-statement-word]", { opacity: 0.42, yPercent: 14 }, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.12,
      duration: 0.5,
      ease: "none",
      scrollTrigger: {
        id: "experience-word-reveal",
        trigger: headingRef.current,
        start: "top 85%",
        end: "bottom 52%",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    horizontalDrift(trackRef.current, trackRef.current?.parentElement, { amount: mobile ? 0.55 : 1.2 });
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-48 lg:px-14">
        <Eyebrow index="08" tone="dark" className="mb-10 md:mb-16">The experience statement</Eyebrow>
        <h2 ref={headingRef} className="font-display text-[clamp(2.6rem,6.4vw,6.2rem)] font-medium uppercase leading-[1.06]">
          <span className="block">
            <span className="text-wintergreen">15+</span>{" "}
            {["years", "of", "knowledge."].map((word, index) => (
              <span key={word}>{index > 0 && " "}<span data-statement-word className="inline-block">{word}</span></span>
            ))}
          </span>
          <span className="block">
            {["A", "new", "standard", "of", "service."].map((word, index) => (
              <span key={word}>{index > 0 && " "}<span data-statement-word className={`inline-block ${index > 2 ? "italic" : ""}`}>{word}</span></span>
            ))}
          </span>
        </h2>
        <p data-fade className="mt-10 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
          WinterGreen Realty may be a new company, but its foundation is built on years of real-world exposure to the property market.
        </p>
        <ul className="sr-only">{statementWords.map((word) => <li key={word}>{word}</li>)}</ul>
        <div aria-hidden="true" className="mt-20 overflow-hidden border-y border-white/10 py-8 md:mt-28 md:py-10">
          <div ref={trackRef} className="scroll-type-track flex w-max">
            {[...statementWords, ...statementWords].map((word, index) => (
              <span key={`${word}-${index}`} className="inline-flex items-center">
                <span className="font-display text-3xl font-medium uppercase tracking-[0.14em] text-white/90 md:text-5xl">{word}</span>
                <span className="font-display mx-8 text-3xl font-light italic text-wintergreen md:mx-12 md:text-5xl">+</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
