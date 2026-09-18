"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, fadeUp, maskReveal, parallax } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { IMAGES } from "@/data/images";
import { Eyebrow, Mask } from "@/components/ui";

export default function About() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    maskReveal(headingRef.current);
    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? []);
    
    parallax(imgRef.current, { trigger: frameRef.current, y: mobile ? 5 : 12, scale: 1.12, scrub: 0.9 });
    
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: frameRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: mobile ? 0.4 : 0.85,
        invalidateOnRefresh: true,
      },
    }).fromTo(root.current?.querySelector("[data-shade]") ?? [], { opacity: 0 }, { opacity: 0.7, duration: 1 }, 0);
  });

  return (
    <section id="about" ref={root} className="bg-white text-ink">
      <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 md:px-10 md:pb-32 md:pt-44 lg:px-14">
        <Eyebrow index="02" className="mb-10 md:mb-16">About</Eyebrow>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div ref={headingRef} className="lg:sticky lg:top-36">
              <h2 className="font-display text-[clamp(2.6rem,6vw,5.6rem)] font-medium uppercase leading-[1.02]">
                <Mask>Built on knowledge.</Mask>
                <Mask>Driven by <em className="italic">opportunity.</em></Mask>
              </h2>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-7">
              <p data-fade className="text-base leading-relaxed text-black/65 md:text-lg">
                WinterGreen Realty was created with a simple philosophy: exceptional real estate requires more than a listing. It requires knowledge, judgment, relationships and an understanding of what makes a property valuable.
              </p>
              <p data-fade className="text-base leading-relaxed text-black/65 md:text-lg">
                Our approach combines established industry knowledge with a modern, client-first way of working.
              </p>
            </div>
          </div>
        </div>
      </div>
      <figure className="pb-24 md:pb-36">
        <div ref={frameRef} className="relative aspect-[16/9] overflow-hidden md:aspect-[2.4/1]">
          <div ref={imgRef} className="parallax-layer absolute -inset-y-[16%] inset-x-0">
            <Image src={IMAGES.about} alt="Curved glass commercial architecture at dusk" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-ink/15" aria-hidden="true" />
          <div data-shade className="absolute inset-0 bg-ink/40 opacity-0" aria-hidden="true" />
        </div>
        <figcaption data-fade className="mx-auto mt-5 flex max-w-[1500px] items-center justify-between gap-6 px-6 text-[9px] font-medium uppercase tracking-[0.32em] text-black/40 md:px-10 md:text-[10px] lg:px-14">
          <span>Commercial architecture — considered, not casual</span>
        </figcaption>
      </figure>
    </section>
  );
}
