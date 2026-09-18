import Image from "next/image";

type Tone = "dark" | "light";
type Size = "sm" | "md" | "lg";

const SIZES = {
  sm: { mark: "h-6 md:h-8 w-6 md:w-8", word: "text-[1.1rem] md:text-2xl", sub: "text-[6px] md:text-[7px]" },
  md: { mark: "h-10 md:h-12 w-10 md:w-12", word: "text-2xl md:text-3xl", sub: "text-[8px] md:text-[9px]" },
  lg: { mark: "h-14 md:h-16 w-14 md:w-16", word: "text-4xl md:text-5xl", sub: "text-[10px] md:text-[11px]" },
} as const;

/**
 * WinterGreen Realty logo combining the image mark and Playfair Display typography.
 */
export default function Logo({
  tone = "dark",
  size = "md",
  layout = "stacked",
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  layout?: "stacked" | "row";
  className?: string;
}) {
  const s = SIZES[size];

  const word = (
    <span
      className={`flex items-center whitespace-nowrap font-bold leading-none tracking-tight ${s.word}`}
      style={{ fontFamily: "var(--font-logo)" }}
    >
      <span style={{ color: tone === "light" ? "#FFFFFF" : "#000000" }}>Winter</span>
      <span style={{ color: "var(--color-wintergreen)" }}>Green</span>
    </span>
  );

  const sub = (
    <span
      className={`mt-1 block whitespace-nowrap font-sans font-medium uppercase leading-none ${tone === "light" ? "text-white/60" : "text-black/60"
        } ${s.sub}`}
      style={{ letterSpacing: "0.22em" }}
    >
      Timeless Properties. Evergreen Value
    </span>
  );

  const mark = (
    <div className={`relative shrink-0 ${s.mark}`}>
      <Image
        src="/logo.png"
        alt="WinterGreen Realty"
        fill
        className="object-contain"
        priority
      />
    </div>
  );

  if (layout === "row") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        {mark}
        <span className="text-left flex flex-col justify-center">
          {word}
          {sub}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      {mark}
      <span className="mt-3 text-center flex flex-col items-center">
        {word}
        {sub}
      </span>
    </span>
  );
}
