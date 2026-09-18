"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, fadeUp, maskReveal, parallax } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { IMAGES } from "@/data/images";
import { Arrow, Eyebrow, Mask } from "@/components/ui";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    maskReveal(headingRef.current);
    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? []);
    
    parallax(imgRef.current, { trigger: clipRef.current, y: mobile ? 5 : 12, scale: 1.12, scrub: 0.9 });
    
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: clipRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: mobile ? 0.4 : 0.85,
        invalidateOnRefresh: true,
      },
    }).fromTo(root.current?.querySelector("[data-shade]") ?? [], { opacity: 0 }, { opacity: 0.7, duration: 1 }, 0);
  });

  return (
    <section id="intro" ref={root} className="bg-paper text-ink">
      <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-44 lg:px-14">
        <Eyebrow index="01" className="mb-10 md:mb-16">Introduction</Eyebrow>
        <div className="grid gap-12 lg:grid-cols-12">
          <div ref={headingRef} className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.6rem,6.4vw,6rem)] font-medium uppercase leading-[1.02]">
              <Mask>Real estate,</Mask>
              <Mask>with a different</Mask>
              <Mask><em className="italic">perspective.</em></Mask>
            </h2>
          </div>
          <div className="self-end lg:col-span-4">
            <p data-fade className="text-base leading-relaxed text-black/60 md:text-lg">
              WinterGreen brings a refined approach to real estate, connecting discerning clients with carefully considered industrial, commercial, agriculture, luxury living and estate opportunities.
            </p>
            <div data-fade className="mt-8 flex items-center gap-4">
              <Arrow className="h-4 w-4 shrink-0 text-wintergreen" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/45">Clients come to us when the property matters</p>
            </div>
          </div>
        </div>
        <div data-fade className="mt-20 border border-ink/10 bg-white md:mt-28">
          <div className="grid gap-10 p-8 md:grid-cols-12 md:p-14">
            <div className="md:col-span-4">
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-black/50">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-wintergreen" />The experience positioning
              </p>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-display text-2xl font-medium uppercase leading-tight md:text-4xl">
                A new name in real estate.<br />Backed by <span className="italic text-wintergreen">15+ years</span> of industry knowledge.
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60">
                While WinterGreen Realty is newly established, its foundation is built upon more than 15 years of real-world understanding of the property market — including market knowledge, property evaluation, negotiations and client relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
      <figure className="pb-24 md:pb-36">
        <div ref={clipRef} className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
          <div ref={imgRef} className="parallax-layer absolute -inset-y-[16%] inset-x-0">
            <Image src={IMAGES.intro} alt="Modern commercial architecture rising against a dusk sky" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-ink/15" aria-hidden="true" />
          <div data-shade className="absolute inset-0 bg-ink/40 opacity-0" aria-hidden="true" />
        </div>
        <figcaption data-fade className="mx-auto mt-5 flex max-w-[1500px] items-center justify-between gap-6 px-6 text-[9px] font-medium uppercase tracking-[0.32em] text-black/40 md:px-10 md:text-[10px] lg:px-14">
          <span>Modern commercial architecture — at dusk</span>
        </figcaption>
      </figure>
    </section>
  );
}
