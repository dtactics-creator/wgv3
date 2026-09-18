"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, clipReveal, fadeUp, maskReveal, parallax } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { expertise } from "@/data/expertise";
import { Arrow, Eyebrow, Mask } from "@/components/ui";

export default function Expertise() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useScrollScene(root, ({ desktop, mobile }) => {
    const scope = root.current;
    if (!scope) return;
    maskReveal(headingRef.current);
    fadeUp(scope.querySelectorAll("[data-fade]"));
    const blocks = Array.from(scope.querySelectorAll<HTMLElement>("[data-xp-block]"));
    blocks.forEach((block) => maskReveal(block.querySelector("h3")));

    if (!desktop) {
      blocks.forEach((block) => {
        const frame = block.querySelector<HTMLElement>("[data-xp-mobile-frame]");
        const image = block.querySelector<HTMLElement>("[data-xp-mobile-image]");
        clipReveal(frame, frame, { scrub: true });
        parallax(image, { trigger: frame, y: mobile ? 4 : 7 });
      });
      return;
    }

    const panels = Array.from(scope.querySelectorAll<HTMLElement>("[data-xp-panel]"));
    const setChapter = (index: number) => {
      if (counterRef.current) counterRef.current.textContent = expertise[index].num;
      if (labelRef.current) labelRef.current.textContent = expertise[index].title;
    };

    blocks.forEach((block, index) => {
      const panel = panels[index];
      if (!panel) return;
      // Reveals are scrubbed in both directions, not timer-based crossfades.
      if (index > 0) {
        gsap.fromTo(panel, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            id: `expertise-wipe-${index}`,
            trigger: block,
            start: "top 80%",
            end: "top 26%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }
      parallax(panel.querySelector("[data-xp-media]"), { trigger: block, y: 9, scale: 1.08 });
      ScrollTrigger.create({
        trigger: block,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setChapter(index),
        onEnterBack: () => setChapter(index),
        onLeaveBack: () => setChapter(Math.max(0, index - 1)),
        onRefresh: (self) => { if (self.isActive) setChapter(index); },
      });
    });
    gsap.fromTo("[data-xp-progress]", { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });
    return () => setChapter(0);
  });

  return (
    <section id="expertise" ref={root} className="bg-mist text-ink">
      <div className="mx-auto max-w-[1500px] px-6 pt-28 md:px-10 md:pt-44 lg:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="03" className="mb-10 md:mb-14">Expertise</Eyebrow>
            <div ref={headingRef}>
              <h2 className="font-display text-[clamp(2.6rem,6.2vw,5.8rem)] font-medium uppercase leading-[1.02]">
                <Mask>Property,</Mask>
                <Mask>beyond the <em className="italic">ordinary.</em></Mask>
              </h2>
            </div>
          </div>
          <p data-fade className="max-w-xs pb-2 text-sm leading-relaxed text-black/55 md:text-right">
            Five asset classes. One standard — every opportunity considered for what it truly is worth.
          </p>
        </div>
      </div>

      <div data-xp-story-grid className="mt-16 md:mt-24 lg:grid lg:grid-cols-2">
        <div data-xp-sticky-column className="relative hidden lg:block" aria-hidden="true">
          <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-ink">
            {expertise.map((item) => (
              <div key={item.num} data-xp-panel className="absolute inset-0">
                <div data-xp-media className="parallax-layer absolute -inset-y-[16%] inset-x-0">
                  <Image src={item.image} alt="" fill sizes="50vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" />
              </div>
            ))}
            <div className="absolute inset-x-10 bottom-10">
              <div className="flex items-end justify-between gap-6 text-white">
                <div className="flex items-baseline gap-3">
                  <span ref={counterRef} className="font-display text-5xl font-medium italic tabular-nums">01</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/60">/ 05</span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-white/60">Our expertise</p>
                  <p ref={labelRef} className="font-display mt-2 text-xl font-medium">Industrial Property</p>
                </div>
              </div>
              <div className="mt-7 h-px overflow-hidden bg-white/25">
                <div data-xp-progress className="h-full w-full origin-left bg-wintergreen" />
              </div>
            </div>
          </div>
        </div>

        <div ref={storyRef}>
          {expertise.map((item) => (
            <article key={item.num} data-xp-block className="flex flex-col justify-center border-b border-ink/10 py-20 lg:min-h-[92vh] lg:py-28">
              <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 lg:px-14">
                <div data-xp-mobile-frame className="relative mb-12 aspect-[4/3] overflow-hidden lg:hidden">
                  <div data-xp-mobile-image className="parallax-layer absolute -inset-y-[16%] inset-x-0">
                    <Image src={item.image} alt={item.alt} fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
                </div>
                <div data-fade className="flex items-baseline gap-6">
                  <span className="font-display text-6xl font-medium italic leading-none text-wintergreen">{item.num}</span>
                  <span className="text-[9px] font-semibold uppercase leading-loose tracking-[0.3em] text-black/45">{item.note.replaceAll(" ", "").replaceAll("·", " · ")}</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2rem,4vw,3.8rem)] font-medium uppercase leading-[1.05]"><Mask>{item.title}</Mask></h3>
                <p data-fade className="mt-6 max-w-md text-base leading-relaxed text-black/60">{item.description}</p>
                <div data-fade className="mt-10">
                  <a href="#properties" className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink">
                    <span aria-hidden="true" className="relative block h-px w-10 shrink-0 overflow-hidden bg-ink/25"><span className="absolute inset-0 -translate-x-full bg-wintergreen transition-transform duration-500 ease-out group-hover:translate-x-0" /></span>
                    View related opportunities
                    <Arrow className="h-3.5 w-3.5 shrink-0 text-wintergreen transition-transform duration-500 group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
