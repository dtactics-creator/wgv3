"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { company, navLinks } from "@/data/site";
import Logo from "@/components/Logo";
import { Arrow } from "@/components/ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const hrefFor = (hash: string) => pathname === "/" ? hash : `/${hash}`;
  const solid = scrolled || open || pathname !== "/";

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: "-38% 0px -58% 0px" });
    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.classList.add("overflow-hidden");
    } else {
      lenis?.start();
      document.documentElement.classList.remove("overflow-hidden");
    }

    const media = gsap.matchMedia(overlay);
    media.add({ reduced: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (context.conditions?.reduced) {
        gsap.set(overlay, { clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", pointerEvents: open ? "auto" : "none" });
        gsap.set("[data-mobile-link], [data-mobile-meta]", { yPercent: 0, y: 0, opacity: 1 });
        return;
      }
      if (open) {
        gsap.set(overlay, { pointerEvents: "auto" });
        gsap.timeline()
          .fromTo(overlay, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" }, 0)
          .fromTo("[data-mobile-link]", { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.045, ease: "power4.out" }, 0.15)
          .fromTo("[data-mobile-meta]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, 0.4);
      } else {
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power4.inOut",
          onComplete: () => { overlay.style.pointerEvents = "none"; },
        });
      }
    });
    return () => {
      media.revert();
      document.documentElement.classList.remove("overflow-hidden");
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const before = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => overlayRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true }));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const links = Array.from(overlayRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
      const first = toggleRef.current;
      const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first && last) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last && first) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKey);
      if (before instanceof HTMLElement && before.isConnected) before.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      desktop.removeEventListener("change", onResize);
      if (navigateTimer.current) clearTimeout(navigateTimer.current);
    };
  }, []);

  const closeAndGo = (href: string) => {
    setOpen(false);
    if (navigateTimer.current) clearTimeout(navigateTimer.current);
    navigateTimer.current = setTimeout(() => scrollToTarget(href), prefersReducedMotion() ? 0 : 400);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-white backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
          }`}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-black/5">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-wintergreen" />
        </div>
        <div className={`mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 transition-all duration-500 md:px-10 lg:px-14 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          <a href={hrefFor("#home")} aria-label="WinterGreen Realty — home" className="relative z-50 flex shrink-0 items-center">
            <Logo tone="dark" size="sm" layout="row" />
          </a>
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6 2xl:gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={hrefFor(link.href)}
                    aria-current={active === link.href && pathname === "/" ? "location" : undefined}
                    className={`group relative whitespace-nowrap text-[10.5px] font-semibold tracking-[0.22em] transition-colors duration-300 ${active === link.href && pathname === "/"
                      ? "text-wintergreen font-bold"
                      : "text-[#111111]/80 hover:text-[#111111]"
                      }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-wintergreen transition-transform duration-500 ease-out ${active === link.href && pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={hrefFor("#contact")}
            data-cursor="ENQUIRE"
            className="group hidden shrink-0 items-center gap-2.5 rounded-full border border-[#111111]/25 bg-black/[0.03] backdrop-blur-sm px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#111111] transition-all duration-300 hover:border-wintergreen hover:bg-wintergreen hover:text-white xl:inline-flex"
          >
            Enquire
            <Arrow className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center xl:hidden"
          >
            <span aria-hidden="true" className={`absolute h-px w-6 bg-[#111111] transition-all duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span aria-hidden="true" className={`absolute h-px w-6 bg-[#111111] transition-all duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </header>
      <div id="mobile-menu" ref={overlayRef} role="dialog" aria-label="Site navigation" aria-modal={open ? true : undefined} aria-hidden={!open} inert={!open} data-lenis-prevent className={`fixed inset-0 z-40 flex flex-col gap-10 overflow-y-auto overscroll-contain px-6 pb-10 pt-28 md:px-12 transition-colors duration-500 ${solid ? "bg-white" : "bg-ink"}`} style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}>
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((link, index) => (
              <li key={link.href} className={`overflow-hidden border-b transition-colors duration-500 ${solid ? "border-ink/10" : "border-white/10"}`}>
                <a href={hrefFor(link.href)} onClick={(event) => { if (pathname === "/") { event.preventDefault(); closeAndGo(link.href); } else { setOpen(false); } }} className="group flex items-baseline justify-between gap-4 py-4">
                  <span data-mobile-link className={`font-display block text-3xl font-medium tracking-wide transition-colors duration-300 group-hover:text-wintergreen sm:text-4xl ${solid ? "text-ink" : "text-white"}`}>{link.label}</span>
                  <span aria-hidden="true" className={`text-[10px] tracking-[0.3em] transition-colors duration-500 ${solid ? "text-ink/40" : "text-white/40"}`}>0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div data-mobile-meta className={`mt-auto flex flex-wrap items-end justify-between gap-6 text-[10px] uppercase leading-loose tracking-[0.2em] transition-colors duration-500 ${solid ? "text-ink/50" : "text-white/50"}`}>
          <div>Chennai · Tamil Nadu<br />India</div>
          <a href={`mailto:${company.email}`} className={`transition-colors duration-300 hover:text-wintergreen ${solid ? "text-ink/75" : "text-white/75"}`}>{company.email}</a>
        </div>
      </div>
    </>
  );
}
