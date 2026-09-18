"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, clipReveal, fadeUp, maskReveal, parallax } from "@/lib/gsap";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { properties, type Property } from "@/data/properties";
import { Action, Arrow, Eyebrow, Mask } from "@/components/ui";

const LAYOUTS = [
  { column: "md:col-span-7", aspect: "aspect-[4/3]" },
  { column: "md:col-span-5 md:pt-32", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { column: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-[4/5]" },
  { column: "md:col-span-7 md:pt-16", aspect: "aspect-[4/3]" },
];

function PropertyCard({ item, index, aspect }: { item: Property; index: number; aspect: string }) {
  return (
    <a href="#contact" data-cursor="VIEW" aria-label={`${item.title} — ${item.location}. Enquire for details.`} className="group block">
      <div data-property-frame className={`relative overflow-hidden bg-ink ${aspect}`}>
        <div data-property-parallax className="parallax-layer absolute -inset-y-[16%] inset-x-0">
          <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.04]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
        <span className="absolute left-5 top-5 border border-white/25 bg-ink/30 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">{item.status}</span>
        <span data-property-number aria-hidden="true" className="font-display absolute bottom-6 right-6 text-5xl font-medium italic text-white/50 transition-colors duration-700 group-hover:text-wintergreen">{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-wintergreen transition-transform duration-700 ease-out group-hover:scale-x-100" />
      </div>
      <div data-property-detail className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-6">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-wintergreen">{item.category}</p>
          <h3 className="font-display mt-3 text-2xl font-medium uppercase leading-tight md:text-3xl">{item.title}</h3>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.26em] text-black/45">{item.location}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-black/60">{item.description}</p>
        </div>
        <span className="inline-flex items-center gap-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink">
          View Opportunity<Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
        </span>
      </div>
    </a>
  );
}

export default function Properties() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ mobile }) => {
    const scope = root.current;
    if (!scope) return;
    maskReveal(headingRef.current);
    fadeUp(scope.querySelectorAll("[data-fade], [data-property-detail]"));
    scope.querySelectorAll<HTMLElement>("[data-property-story]").forEach((story) => {
      const frame = story.querySelector<HTMLElement>("[data-property-frame]");
      clipReveal(frame, frame, { scrub: true, end: "clamp(top 48%)" });
      parallax(story.querySelector("[data-property-parallax]"), {
        trigger: frame,
        y: mobile ? 4 : 9,
        scale: 1.06,
      });
      gsap.fromTo(story.querySelector("[data-property-number]"), { y: -14 }, {
        y: 10,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.75 },
      });
    });
  });

  return (
    <section id="properties" ref={root} className="bg-paper text-ink">
      <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-28 md:px-10 md:pb-40 md:pt-44 lg:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="04" className="mb-10 md:mb-14">Opportunities</Eyebrow>
            <div ref={headingRef}>
              <h2 className="font-display text-[clamp(2.6rem,6.2vw,5.8rem)] font-medium uppercase leading-[1.02]">
                <Mask>Opportunities</Mask><Mask>worth looking <em className="italic">at.</em></Mask>
              </h2>
            </div>
          </div>
          <p data-fade className="max-w-xs pb-2 text-sm leading-relaxed text-black/55 md:text-right">Thoughtfully curated properties for clients with a clear vision.</p>
        </div>
        {properties.length === 0 ? (
          <div className="mt-20 border border-ink/10 bg-white p-10 text-center md:p-20">
            <p className="font-display text-2xl font-medium md:text-3xl">New opportunities are currently being curated.</p>
            <p className="mx-auto mt-4 max-w-md text-sm text-black/55">Our team is actively evaluating premium assets. Share your requirement and we will be in touch.</p>
            <div className="mt-10 flex justify-center"><Action href="#contact">Contact Us</Action></div>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-y-16 md:mt-28 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {properties.map((item, i) => {
              const layout = LAYOUTS[i % LAYOUTS.length];
              return (
                <div key={item.id} data-property-story className={layout.column}>
                  <PropertyCard item={item} index={i} aspect={layout.aspect} />
                </div>
              );
            })}
          </div>
        )}
        <div data-fade className="mt-20 flex flex-col justify-between gap-6 border-t border-ink/10 pt-8 md:mt-28 md:flex-row md:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-black/50">
            The opportunities shown are curated examples of the asset types we work with. Enquire privately to explore current opportunities — prices, acreage and availability are shared in confidence.
          </p>
          <Action href="#contact" variant="outline">Discuss a Property</Action>
        </div>
      </div>
    </section>
  );
}
