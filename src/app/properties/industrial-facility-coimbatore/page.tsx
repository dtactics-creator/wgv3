"use client";

import Image from "next/image";
import Link from "next/link";
import PropertyActions from "@/components/PropertyActions";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Flag,
  Leaf,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function PropertyDetailPage() {
  const title = "Industrial Property";
  const category = "Industrial";
  const location = "Coimbatore, Tamil Nadu";

  const overview =
    "Built for businesses that need scale, logistics access and long-term operational freedom, this industrial opportunity supports high-efficiency production and expansion planning.";

  const highlights = [
    "Large-format production or warehousing footprint",
    "Suitable for manufacturing and strategic operations",
    "Logistics-friendly access and expansion potential",
  ];

  const image = "/img/Industrial Spaces.webp?v=2";

  const alt =
    "Aerial view of an industrial township with factories and water bodies";

  const video = undefined;

  /* SAFE VALUES */
  const safeCategory = category || "Property";
  const safeLocation = location || "Tamil Nadu";
  const safeHighlights = Array.isArray(highlights) ? highlights : [];

  const categoryLower = safeCategory.toLowerCase();

  const isIndustrial = categoryLower.includes("industrial");
  const isAgricultural = categoryLower.includes("agricultural");

  const propertyType = isIndustrial
    ? "Industrial"
    : isAgricultural
      ? "Agricultural Land"
      : safeCategory;

  const setting = isIndustrial
    ? "Business & Industrial"
    : isAgricultural
      ? "Private & Low-Density"
      : "Prime Location";

  const potential = isIndustrial
    ? "Expansion Potential"
    : isAgricultural
      ? "Long-Term Potential"
      : "Investment Potential";

  const city = safeLocation.split(",")[0].trim();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-3 pb-10 pt-[105px] text-black md:px-6 md:pt-[115px]">

      {/* =====================================================
          LIGHT GREEN BACKGROUND GLOW
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-emerald-200/40 blur-[120px]" />

        <div className="absolute -right-32 top-[35%] h-[500px] w-[500px] rounded-full bg-green-100/60 blur-[140px]" />

        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-teal-100/50 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1250px]">

        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 border-b border-emerald-900/10 pb-3 text-[11px] text-black md:text-[12px]"
        >
          <Link
            href="/"
            className="transition hover:text-emerald-700"
          >
            Home
          </Link>

          <span className="text-emerald-700/40">/</span>

          <Link
            href="/#properties"
            className="transition hover:text-emerald-700"
          >
            Properties
          </Link>

          <span className="text-emerald-700/40">/</span>

          <span className="font-medium text-emerald-700">
            {title}
          </span>
        </nav>

        {/* =====================================================
            BACK
        ====================================================== */}
        <div className="mb-4">

          

        </div>

        {/* =====================================================
            MAIN LIGHT GREEN GLASS CARD
        ====================================================== */}
        <section className="overflow-hidden rounded-[24px] border border-emerald-300/40 bg-emerald-50/65 text-black shadow-[0_25px_80px_rgba(16,100,60,0.12)] backdrop-blur-2xl">

          {/* =================================================
              HEADER
          ================================================== */}
          <div className="border-b border-emerald-900/10 bg-white/35 px-5 py-5 backdrop-blur-xl md:px-7">

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />

                  <h1 className="text-lg font-semibold tracking-tight text-black md:text-xl">
                    {title}
                  </h1>

                  <ArrowUpRight
                    size={15}
                    className="text-emerald-600"
                  />

                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-black md:text-[12px]">

                  <span>{safeCategory}</span>

                  <span className="text-emerald-600/50">
                    •
                  </span>

                  <span>{safeLocation}</span>

                </div>

              </div>

              {/* HEADER ACTIONS */}
              <div className="flex shrink-0 items-center gap-2">
                <PropertyActions
                  propertyId="industrial-facility-coimbatore"
                  title={title}
                />
              </div>

            </div>

          </div>

          {/* =================================================
              TOP STATS
          ================================================== */}
          <div className="grid grid-cols-3 border-b border-emerald-900/10 bg-emerald-100/45">

            {/* TYPE */}
            <div className="px-3 py-5 text-center">

              <div className="text-sm font-semibold text-black md:text-base">
                {propertyType}
              </div>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-black">
                Property Type
              </p>

            </div>

            {/* LOCATION */}
            <div className="border-l border-emerald-900/10 px-3 py-5 text-center">

              <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-black md:text-base">

                <MapPin
                  size={14}
                  className="text-emerald-600"
                />

                {city}

              </div>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-black">
                Location
              </p>

            </div>

            {/* POTENTIAL */}
            <div className="border-l border-emerald-900/10 px-3 py-5 text-center">

              <div className="text-sm font-semibold text-black md:text-base">
                Long-Term
              </div>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-black">
                Value Potential
              </p>

            </div>

          </div>

          {/* =================================================
              IMAGE + RIGHT DETAILS
          ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%]">

            {/* =================================================
                IMAGE
            ================================================== */}
            <div className="border-b border-emerald-900/10 bg-emerald-100/30 lg:border-b-0 lg:border-r">

              <div className="relative h-[280px] w-full overflow-hidden md:h-[360px] lg:h-[430px]">

                {video ? (
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={image}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                )}

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                <div className="absolute inset-0 bg-emerald-950/5" />

                {/* CATEGORY */}
                <div className="absolute bottom-5 left-5">

                  <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-4 py-2 text-black shadow-lg backdrop-blur-xl">

                    {isAgricultural ? (
                      <Leaf
                        size={14}
                        className="text-emerald-600"
                      />
                    ) : (
                      <Building2
                        size={14}
                        className="text-emerald-600"
                      />
                    )}

                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black">
                      {safeCategory}
                    </span>

                  </div>

                </div>

                {/* IMAGE NUMBER */}
                <div className="absolute bottom-5 right-5">

                  <span className="rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[9px] font-medium text-black shadow-lg backdrop-blur-xl">
                    01 / 01
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT LIGHT GLASS DETAILS
            ================================================== */}
            <div className="bg-white/20">

              {/* 2 X 2 DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2">

                {/* ITEM 1 */}
                <div className="flex items-center gap-3 border-b border-emerald-900/10 px-5 py-5 sm:border-r">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">

                    <Building2
                      size={18}
                      strokeWidth={1.5}
                    />

                  </div>

                  <div>

                    <p className="text-[13px] font-medium text-black">
                      {propertyType}
                    </p>

                    <p className="mt-1 text-[10px] text-black">
                      Property Type
                    </p>

                  </div>

                </div>

                {/* ITEM 2 */}
                <div className="flex items-center gap-3 border-b border-emerald-900/10 px-5 py-5">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">

                    <Sparkles
                      size={18}
                      strokeWidth={1.5}
                    />

                  </div>

                  <div>

                    <p className="text-[13px] font-medium text-black">
                      {setting}
                    </p>

                    <p className="mt-1 text-[10px] text-black">
                      Property Setting
                    </p>

                  </div>

                </div>

                {/* ITEM 3 */}
                <div className="flex items-center gap-3 border-b border-emerald-900/10 px-5 py-5 sm:border-b-0 sm:border-r">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">

                    <CheckCircle2
                      size={18}
                      strokeWidth={1.5}
                    />

                  </div>

                  <div>

                    <p className="text-[13px] font-medium text-black">
                      {potential}
                    </p>

                    <p className="mt-1 text-[10px] text-black">
                      Investment Profile
                    </p>

                  </div>

                </div>

                {/* ITEM 4 */}
                <div className="flex items-center gap-3 px-5 py-5">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">

                    <MapPin
                      size={18}
                      strokeWidth={1.5}
                    />

                  </div>

                  <div>

                    <p className="text-[13px] font-medium text-black">
                      {safeLocation}
                    </p>

                    <p className="mt-1 text-[10px] text-black">
                      Location
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  GREEN STATUS TAGS
              ================================================== */}
              <div className="border-t border-emerald-900/10 px-5 py-4">

                <div className="flex flex-wrap gap-2">

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[10px] font-medium text-emerald-800 backdrop-blur-xl">
                    <CheckCircle2 size={12} />
                    {safeCategory}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[10px] font-medium text-emerald-800 backdrop-blur-xl">
                    <CheckCircle2 size={12} />
                    Strategic Location
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[10px] font-medium text-emerald-800 backdrop-blur-xl">
                    <CheckCircle2 size={12} />
                    {potential}
                  </span>

                </div>

              </div>

              {/* =================================================
                  OVERVIEW
              ================================================== */}
              <div className="border-t border-emerald-900/10 px-5 py-5">

                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Property Overview
                </p>

                <p className="text-[11px] leading-5 text-black">
                  {overview}
                </p>

              </div>

              {/* =================================================
                  HIGHLIGHTS
              ================================================== */}
              <div className="border-t border-emerald-900/10 px-5 py-5">

                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Key Highlights
                </p>

                <div className="grid gap-3 sm:grid-cols-2">

                  {safeHighlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="flex items-start gap-2.5"
                    >

                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

                        <CheckCircle2
                          size={12}
                          strokeWidth={1.8}
                        />

                      </div>

                      <p className="text-[10px] leading-4 text-black">
                        {highlight}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              {/* =================================================
                  CTA
              ================================================== */}
              <div className="border-t border-emerald-900/10 bg-emerald-100/40 px-5 py-4">

                <div className="flex gap-2">

                  <Link
                    href="/#contact"
                    className="flex h-11 flex-1 items-center justify-center rounded-xl border border-emerald-600/20 bg-emerald-600 px-5 text-[12px] font-semibold text-white shadow-[0_0_25px_rgba(16,185,129,0.15)] transition hover:bg-emerald-500"
                  >
                    Get Property Details
                  </Link>

                  
                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              BOTTOM HIGHLIGHTS
          ================================================== */}
          <div className="border-t border-emerald-900/10 bg-emerald-100/40 px-5 py-4">

            <div className="flex flex-wrap items-center gap-2">

              <span className="mr-1 text-[10px] uppercase tracking-wider text-black">
                Highlights
              </span>

              {safeHighlights.map((highlight, index) => (
                <span
                  key={`${highlight}-tag-${index}`}
                  className="rounded-full border border-emerald-700/15 bg-white/55 px-3 py-1.5 text-[10px] text-black backdrop-blur-xl"
                >
                  {highlight}
                </span>
              ))}

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <div className="py-5 text-center text-[9px] uppercase tracking-[0.3em] text-emerald-700">
          WinterGreen Realty
        </div>

      </div>

    </main>
  );
}