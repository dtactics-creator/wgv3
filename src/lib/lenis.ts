import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/gsap";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) { instance = lenis; }
export function getLenis(): Lenis | null { return instance; }

/** Fixed-header-aware navigation with immediate reduced-motion fallback. */
export function scrollToTarget(hash: string) {
  const target = document.getElementById(hash.replace(/^#/, ""));
  if (!target) return;
  const offset = target.id === "home" || target.id === "main" ? 0 : 76;
  const reduced = prefersReducedMotion();
  const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

  // Preserve the URL without causing a second native jump.
  if (window.location.hash !== hash) window.history.pushState(null, "", hash);

  if (instance && !reduced) {
    instance.scrollTo(destination, {
      duration: 1.25,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    window.scrollTo({ top: destination, behavior: reduced ? "instant" : "smooth" });
  }

  // A skip link must move focus as well as the viewport.
  if (target.id === "main") {
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
  }
}
