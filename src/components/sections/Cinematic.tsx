"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, fadeUp, maskReveal, parallax } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { IMAGES } from "@/data/images";
import { Action, Mask } from "@/components/ui";

export default function Cinematic() {
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    maskReveal(headingRef.current);
    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? []);
    parallax(imgRef.current, { trigger: root.current, y: mobile ? 5 : 12, scale: 1.12, scrub: 0.9 });
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "conversation-parallax",
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: mobile ? 0.4 : 0.85,
        invalidateOnRefresh: true,
      },
    })
      .fromTo("[data-cinematic-copy]", { y: mobile ? 12 : 48 }, { y: mobile ? -12 : -48, duration: 1 }, 0)
      .fromTo("[data-cinematic-shade]", { opacity: 0 }, { opacity: 0.7, duration: 1 }, 0);
  });

  return (
    <section ref={root} aria-labelledby="conversation-heading" className="relative flex min-h-[105svh] items-center justify-center overflow-hidden bg-ink text-white">
      <div ref={imgRef} className="parallax-layer absolute -inset-y-[20%] inset-x-0">
        <Image src={IMAGES.cta} alt="Aerial view of an empty highway crossing a vast landscape at dusk" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />
      <div data-cinematic-shade className="absolute inset-0 bg-ink/40 opacity-0" aria-hidden="true" />
      <div data-cinematic-copy className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:px-10">
        <p data-fade className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/70">A private conversation</p>
        <div ref={headingRef} className="mt-8">
          <h2 id="conversation-heading" className="font-display text-[clamp(2.6rem,6.6vw,6.2rem)] font-medium uppercase leading-[1.02]">
            <Mask>Have a property</Mask><Mask><em className="italic">in mind?</em></Mask>
          </h2>
        </div>
        <p data-fade className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">Let&apos;s discuss the opportunity privately.</p>
        <div data-fade className="mt-12 flex justify-center"><Action href="#contact" tone="light">Start a Conversation</Action></div>
      </div>
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.42em] text-white/50 md:block">Buying · Selling · Investing</div>
    </section>
  );
}
