"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useReady } from "@/components/Preloader";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis, scrollToTarget } from "@/lib/lenis";

/** One animation clock; native touch scrolling; no forced snapping or scroll locks. */
export default function ScrollExperience() {
  const { ready } = useReady();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    let disposed = false;
    let refreshTimer = 0;
    let scroller: Lenis | null = null;
    const media = gsap.matchMedia();

    // Touch keeps its native momentum. OS motion changes destroy smoothing live.
    media.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      });
      scroller = lenis;
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
        scroller = null;
      };
    });

    // Re-measure after fonts, lazy images, form state changes and route changes.
    const scheduleRefresh = () => {
      if (disposed) return;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (disposed) return;
        scroller?.resize();
        ScrollTrigger.refresh(true);
      }, 120);
    };
    const assetLoaded = (event: Event) => {
      if (event.target instanceof HTMLImageElement) scheduleRefresh();
    };
    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);
    document.fonts.ready.then(scheduleRefresh);
    document.addEventListener("load", assetLoaded, true);
    window.addEventListener("pageshow", scheduleRefresh);
    scheduleRefresh();

    return () => {
      disposed = true;
      window.clearTimeout(refreshTimer);
      observer.disconnect();
      document.removeEventListener("load", assetLoaded, true);
      window.removeEventListener("pageshow", scheduleRefresh);
      media.revert();
    };
  }, [ready, pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
        : null;
      if (!anchor || anchor.hasAttribute("download")) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2 || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      scrollToTarget(hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
