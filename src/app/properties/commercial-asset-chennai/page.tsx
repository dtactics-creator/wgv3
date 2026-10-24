"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PropertyActions from "@/components/PropertyActions";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
  Play,
  Ruler,
  X,
  Maximize2,
} from "lucide-react";

export default function PropertyDetailPage() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const title = "Commercial Asset";
  const category = "Commercial";
  const location = "Chennai, Tamil Nadu";

  const overview =
    "A well-positioned commercial asset for businesses seeking visibility, accessibility and a sustainable long-term investment profile in a high-demand urban corridor.";

  const highlights = [
    "Strong commercial profile in a prime location",
    "Suitable for business use or investment strategy",
    "Flexible positioning for long-term value creation",
  ];

  const image = "/img/Commercial architecture1.webp";
  const propertyImage = "/img/img.jpeg";
  const alt = "Modern glass commercial building facade at sunset";
  const video = "/img/vido2.mp4";

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-white px-3 pb-10 pt-[105px] text-black md:px-6 md:pt-[115px]">
        {/* =====================================================
            BACKGROUND GREEN GLOW
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-emerald-200/35 blur-[120px]" />

          <div className="absolute -right-32 top-[35%] h-[500px] w-[500px] rounded-full bg-green-100/50 blur-[140px]" />

          <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-teal-100/40 blur-[120px]" />
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

          

          {/* =====================================================
              MAIN GLASS CARD
          ====================================================== */}

          <section className="overflow-hidden rounded-[24px] border border-emerald-300/40 bg-emerald-50/65 text-black shadow-[0_25px_80px_rgba(16,100,60,0.12)] backdrop-blur-2xl">
            {/* =================================================
                HEADER
            ================================================== */}

            <div className="border-b border-emerald-900/10 bg-white/40 px-4 py-4 backdrop-blur-xl md:px-5">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]" />

                    <h1 className="truncate text-lg font-semibold leading-tight text-black md:text-xl">
                      {title}
                    </h1>

                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-emerald-700"
                    />
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-black">
                    <span>{category}</span>

                    <span className="text-emerald-600/50">
                      •
                    </span>

                    <span>{location}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <PropertyActions
                    propertyId="commercial-asset-chennai"
                    title={title}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                PROPERTY STATS
            ================================================== */}

            <div className="grid grid-cols-1 border-b border-emerald-900/10 bg-emerald-100/45 sm:grid-cols-3">
              <div className="border-b border-emerald-900/10 px-4 py-4 text-center sm:border-b-0 sm:border-r">
                <div className="text-base font-semibold text-black">
                  1,792 Sq.ft
                </div>

                <p className="mt-0.5 text-[11px] text-black/60">
                  Land Area
                </p>
              </div>

              <div className="border-b border-emerald-900/10 px-4 py-4 text-center sm:border-b-0 sm:border-r">
                <div className="text-base font-semibold text-black">
                  678.4 Sq.ft
                </div>

                <p className="mt-0.5 text-[11px] text-black/60">
                  UDS
                </p>
              </div>

              <div className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-base font-semibold text-black">
                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="text-emerald-600"
                  />
                  Chennai
                </div>

                <p className="mt-0.5 text-[11px] text-black/60">
                  Location
                </p>
              </div>
            </div>

            {/* =================================================
                VIDEO + DETAILS
            ================================================== */}

            <div className="grid lg:grid-cols-[45%_55%]">
              {/* =================================================
                  LEFT VIDEO
              ================================================== */}

              <div className="border-b border-emerald-900/10 bg-emerald-950 lg:border-b-0 lg:border-r">
                <div className="relative h-full min-h-[250px] overflow-hidden md:min-h-[320px] lg:min-h-[400px]">
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
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {video && (
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-white backdrop-blur-md">
                      <Play size={11} fill="currentColor" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.2em]">
                        Property Film
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1.5 text-white">
                      <MapPin size={13} />

                      <span className="text-xs">
                        Cathedral Road, Chennai
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT DETAILS
              ================================================== */}

              <div className="bg-white/25">
                {/* DETAIL GRID */}

                <div className="grid grid-cols-1 border-b border-emerald-900/10 sm:grid-cols-2">
                  {/* LAND AREA */}

                  <div className="flex items-center gap-3 border-b border-emerald-900/10 px-4 py-4 sm:border-r">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">
                      <Ruler
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        1,792 Sq.ft
                      </p>

                      <p className="mt-0.5 text-[11px] text-black/60">
                        Land Area
                      </p>
                    </div>
                  </div>

                  {/* UDS */}

                  <div className="flex items-center gap-3 border-b border-emerald-900/10 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">
                      <Building2
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        678.4 Sq.ft
                      </p>

                      <p className="mt-0.5 text-[11px] text-black/60">
                        UDS
                      </p>
                    </div>
                  </div>

                  {/* PROPERTY TYPE */}

                  <div className="flex items-center gap-3 border-b border-emerald-900/10 px-4 py-4 sm:border-b-0 sm:border-r">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">
                      <Building2
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        Commercial
                      </p>

                      <p className="mt-0.5 text-[11px] text-black/60">
                        Property Type
                      </p>
                    </div>
                  </div>

                  {/* TITLE */}

                  <div className="flex items-center gap-3 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700 backdrop-blur-xl">
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        Clear Title
                      </p>

                      <p className="mt-0.5 text-[11px] text-black/60">
                        Legal Status
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    SMALL IMAGE PREVIEW
                ================================================== */}

                <div className="border-b border-emerald-900/10 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                        Property Image
                      </p>

                      <p className="mt-1 text-[11px] text-black/50">
                        Click image to view larger
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsImageOpen(true)}
                      className="group relative h-[70px] w-[105px] shrink-0 overflow-hidden rounded-lg border border-emerald-500/20 bg-white shadow-sm transition hover:scale-[1.03] hover:border-emerald-500/50"
                      aria-label="Open property image"
                    >
                      <Image
                        src={propertyImage}
                        alt="Property"
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="105px"
                      />

                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                        <Maximize2
                          size={16}
                          className="text-white opacity-0 drop-shadow-lg transition group-hover:opacity-100"
                        />
                      </span>
                    </button>
                  </div>
                </div>

                {/* =================================================
                    LOCATION / LANDMARK
                ================================================== */}

                <div className="border-b border-emerald-900/10 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-100/70 text-emerald-700">
                      <MapPin
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        Cathedral Road, Chennai
                      </p>

                      <p className="mt-0.5 text-[11px] text-black/60">
                        Landmark: Next to Stella Mary’s College
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    DOCUMENT STATUS
                ================================================== */}

                <div className="border-b border-emerald-900/10 px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[11px] font-medium text-emerald-800 backdrop-blur-xl">
                      <CheckCircle2 size={13} />
                      Clear Title
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[11px] font-medium text-emerald-800 backdrop-blur-xl">
                      <CheckCircle2 size={13} />
                      EB Live
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/70 px-3 py-1.5 text-[11px] font-medium text-emerald-800 backdrop-blur-xl">
                      <CheckCircle2 size={13} />
                      P.Tax Live
                    </span>
                  </div>
                </div>

                {/* =================================================
                    OVERVIEW
                ================================================== */}

                <div className="border-b border-emerald-900/10 px-4 py-4">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    Property Overview
                  </p>

                  <p className="text-xs leading-5 text-black">
                    {overview}
                  </p>
                </div>

                {/* =================================================
                    HIGHLIGHTS
                ================================================== */}

                <div className="px-4 py-4">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    Key Highlights
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {highlights.map((highlight, index) => (
                      <div
                        key={`${highlight}-${index}`}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2
                          size={13}
                          strokeWidth={1.7}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <p className="text-[11px] leading-4 text-black">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    CTA
                ================================================== */}

                <div className="border-t border-emerald-900/10 bg-emerald-100/40 px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href="/#contact"
                      className="flex h-11 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-semibold text-white shadow-[0_8px_25px_rgba(16,185,129,0.18)] transition hover:bg-emerald-500"
                    >
                      Get Property Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                BOTTOM LANDMARK BAR
            ================================================== */}

            <div className="border-t border-emerald-900/10 bg-emerald-100/40 px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-medium text-black">
                  Landmark:
                </span>

                <span className="rounded-full border border-emerald-700/15 bg-white/60 px-3 py-1.5 text-[11px] text-black backdrop-blur-xl">
                  Next to Stella Mary’s College
                </span>

                <span className="rounded-full border border-emerald-700/15 bg-white/60 px-3 py-1.5 text-[11px] text-black backdrop-blur-xl">
                  Cathedral Road
                </span>

                <span className="rounded-full border border-emerald-700/15 bg-white/60 px-3 py-1.5 text-[11px] text-black backdrop-blur-xl">
                  Chennai
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <div className="py-5 text-center text-[9px] uppercase tracking-[0.25em] text-emerald-700">
            WinterGreen Realty
          </div>
        </div>
      </main>

      {/* =========================================================
          IMAGE LIGHTBOX / FULL IMAGE
      ========================================================== */}

      {isImageOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
              aria-label="Close image"
            >
              <X size={20} />
            </button>

            {/* FULL IMAGE */}

            <div className="relative mx-auto max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
              <Image
                src={propertyImage}
                alt="Property"
                width={1600}
                height={1200}
                priority
                className="mx-auto max-h-[88vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}