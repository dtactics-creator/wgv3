import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((item) => item.id === slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: `${property.title} | WinterGreen Realty`,
    description: property.overview,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((item) => item.id === slug);

  if (!property) {
    notFound();
  }

  const isCommercialAsset = property.id === "commercial-asset-chennai";

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-6 md:px-8 md:pt-10 lg:px-12">

        {/* Top Navigation */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-black/10 pb-6 md:mb-10 md:pb-7">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/55 transition-colors duration-300 hover:text-wintergreen md:text-[11px]"
          >
            <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>

          <Link
            href="/#properties"
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/55 transition-colors duration-300 hover:text-wintergreen md:text-[11px]"
          >
            View Opportunities
          </Link>
        </div>

        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/45 md:text-[11px]">
          <Link href="/" className="transition-colors duration-300 hover:text-wintergreen">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#properties" className="transition-colors duration-300 hover:text-wintergreen">
            Properties
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-black/70">{property.title}</span>
        </nav>

        {/* =========================================================
            LARGE PROPERTY IMAGE
        ========================================================== */}
        <section className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)] md:rounded-[2.5rem]">

          <div className="relative aspect-[16/9] min-h-[320px] w-full overflow-hidden md:aspect-[2/1] lg:aspect-[2.15/1]">
            {isCommercialAsset ? (
              <video
                src="/img/vido2.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label={`${property.title} video`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={property.image}
                alt={property.alt}
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
                sizes="100vw"
              />
            )}

            {/* Bottom Image Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            {/* Image Category */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-white/80 md:text-[11px]">
                {property.category}
              </p>
            </div>
          </div>

        </section>

        {/* =========================================================
            PROPERTY DETAILS BELOW IMAGE
        ========================================================== */}
        <article className="mt-8 rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.06)] md:mt-10 md:rounded-[2rem] md:p-10 lg:p-14">

          {/* Header */}
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              {/* Category */}
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-wintergreen md:text-[11px]">
                {property.category}
              </p>

              {/* Title */}
              <h1 className="font-display mt-4 max-w-5xl text-4xl font-medium uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-[5.5rem]">
                {property.title}
              </h1>

              {/* Location */}
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-wintergreen" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50 md:text-sm">
                  {property.location}
                </p>
              </div>
            </div>

            {/* Property Label */}
            <div className="hidden lg:block lg:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/30">
                WinterGreen Realty
              </p>

              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40">
                Exceptional Properties
              </p>
            </div>

          </div>

          {/* Divider */}
          <div className="my-9 h-px bg-black/10 md:my-12" />

          {/* Overview */}
          <div className="max-w-5xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40 md:text-[11px]">
              Property Overview
            </p>

            <p className="mt-5 text-base leading-[1.8] text-black/70 md:text-xl md:leading-[1.75] lg:text-2xl">
              {property.overview}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-12 border-t border-black/10 pt-9 md:mt-14 md:pt-11">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40 md:text-[11px]">
              Key Highlights
            </p>

            <div className="mt-7 grid gap-x-12 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
              {property.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-4 border-b border-black/[0.07] pb-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 flex h-2.5 w-2.5 shrink-0 rounded-full bg-wintergreen"
                  />

                  <span className="text-sm leading-relaxed text-black/70 md:text-base">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-9 sm:flex-row md:mt-14">

            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-wintergreen md:text-[11px]"
            >
              Enquire Now

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/#properties"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:border-wintergreen hover:text-wintergreen md:text-[11px]"
            >
              Explore Other Assets
            </Link>

          </div>

        </article>

        {/* Bottom Label */}
        <div className="mt-12 border-t border-black/10 pt-7 md:mt-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-black/35">
              WinterGreen Realty
            </p>

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-black/35">
              Exceptional Properties. Enduring Value.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}