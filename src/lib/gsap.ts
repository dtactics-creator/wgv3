import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealOptions = {
  start?: string;
  stagger?: number;
  duration?: number;
  y?: number;
};

/** Masked headings reveal when the heading itself reaches the viewport. */
export function maskReveal(
  scope: Element | null | undefined,
  trigger?: Element | null,
  opts: RevealOptions = {}
) {
  if (!scope || prefersReducedMotion()) return;
  const targets = scope.querySelectorAll("[data-mask]");
  if (!targets.length) return;
  return gsap.fromTo(targets, { yPercent: opts.y ?? 108 }, {
    yPercent: 0,
    duration: opts.duration ?? 1.2,
    stagger: opts.stagger ?? 0.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: trigger ?? scope,
      start: opts.start ?? "clamp(top 87%)",
      once: true,
      fastScrollEnd: true,
    },
  });
}

/**
 * Each paragraph/card gets its own viewport trigger. Passing group: true
 * explicitly opts into a shared trigger for a short, visible group.
 * Opacity (not visibility) keeps off-screen controls keyboard-accessible.
 */
export function fadeUp(
  targets: Element[] | NodeListOf<Element>,
  trigger?: Element | null,
  opts: RevealOptions & { group?: boolean } = {}
) {
  if (!targets.length || prefersReducedMotion()) return;
  return Array.from(targets).map((target, i) => gsap.fromTo(
    target,
    { y: opts.y ?? 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: opts.duration ?? 0.95,
      delay: (i % 4) * (opts.stagger ?? 0.06),
      ease: "power3.out",
      scrollTrigger: {
        trigger: opts.group ? trigger ?? targets[0] : target,
        start: opts.start ?? "clamp(top 91%)",
        once: true,
        fastScrollEnd: true,
      },
    }
  ));
}

/** An architectural crop opens as the visitor scrolls towards the image. */
export function clipReveal(
  el: Element | null | undefined,
  trigger?: Element | null,
  opts: { start?: string; end?: string; duration?: number; scrub?: boolean } = {}
) {
  if (!el || prefersReducedMotion()) return;
  return gsap.fromTo(el, {
    clipPath: opts.scrub ? "inset(12% 5% 12% 5%)" : "inset(0% 0% 100% 0%)",
  }, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: opts.duration ?? 1.35,
    ease: opts.scrub ? "none" : "power4.inOut",
    scrollTrigger: {
      trigger: trigger ?? el,
      start: opts.start ?? "clamp(top 94%)",
      end: opts.end ?? "clamp(top 42%)",
      scrub: opts.scrub ? 0.7 : false,
      once: !opts.scrub,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * Parallax always measures an untransformed frame, not the animated image.
 * Media layers need vertical overscan (16% for a 10% drift) to avoid gaps.
 */
export function parallax(
  el: Element | null | undefined,
  opts: { trigger?: Element | null; y?: number; scale?: number; scrub?: number } = {}
) {
  if (!el || prefersReducedMotion()) return;
  const y = opts.y ?? 8;
  return gsap.fromTo(el, {
    yPercent: -y,
    scale: opts.scale ?? 1.07,
  }, {
    yPercent: y,
    scale: 1.01,
    ease: "none",
    scrollTrigger: {
      trigger: opts.trigger ?? el.parentElement ?? el,
      start: "clamp(top bottom)",
      end: "clamp(bottom top)",
      scrub: opts.scrub ?? 0.8,
      invalidateOnRefresh: true,
    },
  });
}

/** Horizontal editorial type is driven by scroll, never an idle animation loop. */
export function horizontalDrift(
  el: HTMLElement | null | undefined,
  trigger: Element | null | undefined,
  opts: { reverse?: boolean; amount?: number } = {}
) {
  if (!el || !trigger || prefersReducedMotion()) return;
  const distance = () => Math.max(0, Math.min(
    el.scrollWidth - (el.parentElement?.clientWidth ?? window.innerWidth),
    window.innerWidth * (opts.amount ?? 0.9)
  ));
  return gsap.fromTo(el, {
    x: () => opts.reverse ? -distance() : 0,
  }, {
    x: () => opts.reverse ? 0 : -distance(),
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "clamp(top bottom)",
      end: "clamp(bottom top)",
      scrub: 0.85,
      invalidateOnRefresh: true,
    },
  });
}

export function drawRules(scope: Element) {
  if (prefersReducedMotion()) return;
  scope.querySelectorAll("[data-section-rule]").forEach((rule) => {
    gsap.fromTo(rule, { scaleX: 0, transformOrigin: "left center" }, {
      scaleX: 1,
      duration: 1.1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: rule.parentElement,
        start: "clamp(top 88%)",
        once: true,
      },
    });
  });
}

/** Real statistics only; the server-rendered value remains the accessible fallback. */
export function counter(
  el: Element | null | undefined,
  trigger: Element | null | undefined,
  value: number,
  opts: { duration?: number; start?: string } = {}
) {
  if (!el) return;
  if (prefersReducedMotion()) {
    el.textContent = String(value);
    return;
  }
  const state = { value: 0 };
  return gsap.to(state, {
    value,
    duration: opts.duration ?? 1.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: trigger ?? el,
      start: opts.start ?? "clamp(top 86%)",
      once: true,
    },
    onUpdate: () => { el.textContent = String(Math.round(state.value)); },
    onComplete: () => { el.textContent = String(value); },
  });
}

export { gsap, ScrollTrigger };
