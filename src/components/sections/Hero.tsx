"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useReady } from "@/components/Preloader";
import { Action, Mask } from "@/components/ui";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ready } = useReady();
  const entered = useRef(false);

  useScrollScene(root, ({ mobile }) => {
    if (!ready) return;

    // Entrance and scroll use separate nested layers, so they never fight.
    if (!entered.current && window.scrollY < window.innerHeight * 0.6) {
      entered.current = true;
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo("[data-hero-image]", { scale: 1.14 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .fromTo("[data-mask]", { yPercent: 110 }, { yPercent: 0, duration: 1.25, stagger: 0.14 }, 0.08)
        .fromTo("[data-hero-fade]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, stagger: 0.09 }, 0.45)
        .fromTo("[data-hero-accent]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0.2);
    }

    const scroll = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "hero-depth",
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: mobile ? 0.4 : 0.85,
        invalidateOnRefresh: true,
      },
    });
    scroll
      .fromTo(bgRef.current, { yPercent: 0, scale: 1 }, { yPercent: mobile ? 6 : 12, scale: 1.035, duration: 1 }, 0)
      .fromTo("[data-hero-title]", { y: 0 }, { y: mobile ? -35 : -100, duration: 1 }, 0)
      .fromTo(contentRef.current, { y: 0 }, { y: mobile ? -10 : -32, duration: 1 }, 0)
      .fromTo(contentRef.current, { opacity: 1 }, { opacity: 0, duration: 0.58 }, 0.42)
      .fromTo("[data-hero-shade]", { opacity: 0 }, { opacity: 0.42, duration: 1 }, 0)
      .fromTo("[data-hero-meta]", { opacity: 1, y: 0 }, { opacity: 0, y: -18, duration: 0.24 }, 0);
  }, [ready]);

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink text-white">
      <div ref={bgRef} className="parallax-layer absolute -inset-y-[18%] inset-x-0">
        <div data-hero-image className="absolute inset-0">
          <video
            src="/Realestate.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85" />
      <div data-hero-shade aria-hidden="true" className="absolute inset-0 bg-ink opacity-0" />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-36 pt-40 md:px-10 md:pt-44 lg:px-14">
        <div className="max-w-5xl">
          <div data-hero-fade className="mb-8 flex items-center gap-3 md:mb-12">
            <span data-hero-accent aria-hidden="true" className="h-px w-8 shrink-0 origin-left bg-wintergreen" />
            <p className="text-[10px] font-semibold tracking-[0.42em] text-white/70 md:text-[11px]">WinterGreen</p>
          </div>
          <div data-hero-title>
            <h1 className="font-display text-[clamp(2rem,9vw,8rem)] font-medium uppercase leading-[0.98] tracking-[-0.01em]">
              <Mask>Exceptional</Mask>
              <Mask>Properties.</Mask>
              <Mask><em className="italic text-white/95">Enduring <span className="text-white">Value.</span></em></Mask>
            </h1>
          </div>
          <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p data-hero-fade className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Premium real-estate advisory for discerning buyers, investors and property owners.
            </p>
            <div data-hero-fade className="flex flex-wrap items-center gap-4">
              <Action href="#properties" tone="light">Explore Opportunities</Action>
              <Action href="#contact" tone="light" variant="outline">Start a Conversation</Action>
            </div>
          </div>
        </div>
      </div>

      <div data-hero-meta className="absolute inset-x-6 bottom-8 z-10 flex items-end justify-between gap-8 md:inset-x-10 lg:inset-x-14">
        <a href="#intro" data-hero-fade className="group flex items-center gap-4" aria-label="Scroll to explore WinterGreen Realty">
          <span className="text-[9px] font-medium uppercase tracking-[0.42em] text-white/65 transition-colors group-hover:text-white">Scroll to explore</span>
          <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-white/20"><span className="scrollline absolute inset-0 block bg-wintergreen" /></span>
        </a>
        <p data-hero-fade className="hidden text-[9px] font-medium uppercase tracking-[0.4em] text-white/50 md:block">Industrial · Commercial · Agricultural · Estate</p>
      </div>
    </section>
  );
}
