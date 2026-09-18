"use client";

import { useRef } from "react";
import { fadeUp, horizontalDrift, maskReveal } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { clientWords } from "@/data/site";
import { Eyebrow, Mask } from "@/components/ui";

export default function Clients() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    maskReveal(headingRef.current);
    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? []);
    horizontalDrift(trackRef.current, trackRef.current?.parentElement, {
      reverse: true,
      amount: mobile ? 0.45 : 1.1,
    });
  });

  return (
    <section ref={root} className="bg-white text-ink">
      <div aria-hidden="true" className="overflow-hidden border-y border-ink/10 py-6 md:py-8">
        <div ref={trackRef} className="scroll-type-track flex w-max">
          {[...clientWords, ...clientWords, ...clientWords].map((word, index) => (
            <span key={`${word}-${index}`} className="inline-flex items-center">
              <span className="font-display text-2xl font-medium uppercase tracking-[0.18em] md:text-4xl" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)", color: "transparent" }}>{word}</span>
              <span className="mx-8 h-1.5 w-1.5 rotate-45 bg-wintergreen" />
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-44 lg:px-14">
        <Eyebrow index="06" className="mb-10 md:mb-16">Client positioning</Eyebrow>
        <div className="grid gap-14 lg:grid-cols-12">
          <div ref={headingRef} className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.6rem,6.2vw,5.8rem)] font-medium uppercase leading-[1.02]">
              <Mask>For clients</Mask><Mask>who expect more</Mask><Mask>from <em className="italic">real estate.</em></Mask>
            </h2>
          </div>
          <div className="self-end lg:col-span-4">
            <p data-fade className="text-base leading-relaxed text-black/60 md:text-lg">
              We work with a select network of buyers, investors, business owners and property stakeholders seeking thoughtfully considered real-estate opportunities. Our approach is deliberately selective, built around discerning clients and meaningful opportunities.
            </p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {clientWords.map((word, index) => (
            <div key={word} data-fade>
              <span className="font-display text-lg font-medium italic text-wintergreen">{String(index + 1).padStart(2, "0")}</span>
              <p className="font-display mt-3 text-2xl font-medium uppercase tracking-wide md:text-3xl">{word}<span className="text-wintergreen">.</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
