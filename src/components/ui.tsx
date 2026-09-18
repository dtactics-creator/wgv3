"use client";

import type { ReactNode } from "react";

export function Eyebrow({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[10px] font-semibold tracking-[0.32em] md:text-[11px] ${tone === "light" ? "text-black/55" : "text-white/55"
        } ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-wintergreen" />
      <span
        aria-hidden="true"
        data-section-rule
        className={`h-px w-10 origin-left ${tone === "light" ? "bg-black/20" : "bg-white/25"}`}
      />
      {index && <span aria-hidden="true">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export function Arrow({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 12h17" />
      <path d="M14 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Masked typography line — inner span animates upward out of the mask.
 */
export function Mask({ children }: { children: ReactNode }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span data-mask className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export function Action({
  href,
  onClick,
  type,
  tone = "dark",
  variant = "solid",
  children,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "light" | "dark";
  variant?: "solid" | "outline";
  children: ReactNode;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors duration-300";
  const styles =
    tone === "light"
      ? variant === "solid"
        ? "bg-white text-ink hover:bg-wintergreen hover:text-white"
        : "border border-white/30 text-white hover:border-wintergreen hover:text-wintergreen"
      : variant === "solid"
        ? "bg-ink text-white hover:bg-wintergreen"
        : "border border-ink/25 text-ink hover:border-wintergreen hover:text-wintergreen";

  const inner = (
    <>
      <span>{children}</span>
      <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {inner}
    </button>
  );
}
