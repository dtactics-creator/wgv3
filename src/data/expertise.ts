import { IMAGES } from "@/data/images";

export interface ExpertiseItem {
  num: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  note: string;
}

export const expertise: ExpertiseItem[] = [
  {
    num: "01",
    title: "Industrial Property",
    description:
      "Factories, Manufacturing Units and Medium, Small Industries, creating opportunities for businesses and investors.",
    image: IMAGES.expertise.industrial,
    alt: "Sunlight streaming into a large industrial steel warehouse",
    note: "B I G · B O X · A S S E T S",
  },
  {
    num: "02",
    title: "Industrial Plots",
    description:
      "Strategically located industrial land for development, expansion and long-term investment.",
    image: IMAGES.expertise.plots,
    alt: "Aerial view of an industrial site beside railway lines",
    note: "L A N D · W I T H · P U R P O S E",
  },
  {
    num: "03",
    title: "Commercial Buildings",
    description:
      "Commercial assets selected for business use, investment and long-term value.",
    image: IMAGES.expertise.commercial,
    alt: "Curved glass commercial facade at twilight",
    note: "A S S E T S · T H A T · W O R K",
  },
  {
    num: "04",
    title: "Agricultural Lands",
    description:
      "Large-scale agricultural land opportunities for buyers seeking substantial high yield farm land assets",
    image: IMAGES.expertise.agricultural,
    alt: "Aerial view of vast green farmland at sunset",
    note: "S C A L E · A N D · S T A Y I N G · P O W E R",
  },
  {
    num: "05",
    title: "Estates",
    description:
      "Distinctive estates and expansive properties curated for discerning buyers",
    image: IMAGES.expertise.estate,
    alt: "Aerial view of a large estate set within autumn woodland",
    note: "R A R E · A N D · D I S T I N C T",
  },
];
