"use client";

import type { ReactNode } from "react";
import SiteLoader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollExperience from "@/components/ScrollExperience";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <SiteLoader>
      <ScrollExperience />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.25em] focus:text-white"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[90]" />
      {children}
    </SiteLoader>
  );
}
