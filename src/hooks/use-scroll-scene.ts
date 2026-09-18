"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { drawRules, gsap } from "@/lib/gsap";

type Scene = {
  desktop: boolean;
  mobile: boolean;
};

/**
 * One scoped, responsive GSAP context per section. Changing a breakpoint or
 * the OS motion preference reverts every transform, clip and ScrollTrigger.
 * The unanimated HTML is always the readable fallback.
 */
export function useScrollScene(
  scope: RefObject<HTMLElement | null>,
  setup: (scene: Scene) => void | (() => void),
  dependencies: unknown[] = []
) {
  useGSAP(() => {
    if (!scope.current) return;
    const media = gsap.matchMedia(scope);
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 767px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      const { desktop, mobile, motion } = context.conditions ?? {};
      if (!motion || !scope.current) return;
      drawRules(scope.current);
      return setup({ desktop: Boolean(desktop), mobile: Boolean(mobile) });
    });
    return () => media.revert();
  }, { scope, dependencies, revertOnUpdate: true });
}
