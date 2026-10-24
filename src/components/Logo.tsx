type Tone = "dark" | "light";
type Size = "sm" | "md" | "lg";
type Layout = "stacked" | "row";
type Align = "left" | "center" | "right";

const SIZES = {
  sm: {
    width: 156,
    height: 66,
  },
  md: {
    width: 252,
    height: 105,
  },
  lg: {
    width: 372,
    height: 150,
  },
} as const;

export default function Logo({
  tone = "dark",
  size = "md",
  layout = "stacked",
  align = "center",
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  layout?: Layout;
  align?: Align;
  className?: string;
}) {
  const s = SIZES[size];

  const justify =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  const objectPosition =
    align === "left"
      ? "left center"
      : align === "right"
        ? "right center"
        : "center center";

  return (
    <div
      className={`relative z-[50] flex shrink-0 items-center ${justify} overflow-visible ${className}`}
      style={{
        width: `${s.width}px`,
        height: `${s.height}px`,
        maxWidth: "100%",
      }}
    >
      <img
        src="/img/logo4.png"
        alt="WinterGreen Realty"
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition,
        }}
        className={tone === "light" ? "mix-blend-screen" : ""}
      />
    </div>
  );
}