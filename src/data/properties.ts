import { IMAGES } from "@/data/images";

export interface Property {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  overview: string;
  highlights: string[];
  image: string;
  alt: string;
  featured: boolean;
  status: string;
}

/**
 * Representative example opportunities.
 * These are illustrative placeholders — replace with verified listings,
 * a headless CMS or an API later without touching the presentation layer.
 */
export const properties: Property[] = [
  {
    id: "industrial-facility-coimbatore",
    title: "Industrial Property",
    category: "Industrial",
    location: "Coimbatore, Tamil Nadu",
    description:
      "A substantial industrial facility suited to manufacturing, warehousing or strategic operations.",
    overview:
      "Built for businesses that need scale, logistics access and long-term operational freedom, this industrial opportunity supports high-efficiency production and expansion planning.",
    highlights: [
      "Large-format production or warehousing footprint",
      "Suitable for manufacturing and strategic operations",
      "Logistics-friendly access and expansion potential",
    ],
    image: IMAGES.properties.facility,
    alt: "Aerial view of an industrial township with factories and water bodies",
    featured: true,
    status: "Curated example",
  },
  {
    id: "commercial-asset-chennai",
    title: "Commercial Asset",
    category: "Commercial",
    location: "Chennai, Tamil Nadu",
    description:
      "A commercial asset considered for business use, investment and long-term value.",
    overview:
      "A well-positioned commercial asset for businesses seeking visibility, accessibility and a sustainable long-term investment profile in a high-demand urban corridor.",
    highlights: [
      "Strong commercial profile in a prime location",
      "Suitable for business use or investment strategy",
      "Flexible positioning for long-term value creation",
    ],
    image: IMAGES.properties.commercial,
    alt: "Modern glass commercial building facade at sunset",
    featured: false,
    status: "Curated example",
  },
  {
    id: "industrial-land-tamilnadu",
    title: "Industrial Land",
    category: "Industrial Land",
    location: "Tamil Nadu",
    description:
      "Strategically located industrial land for development, expansion or long-term investment.",
    overview:
      "This industrial land opportunity is ideal for clients looking to secure a flexible site for future expansion, strategic development or long-horizon capital growth.",
    highlights: [
      "Large footprint for future industrial development",
      "Strategic location for growth-focused planning",
      "Valuable long-term investment profile",
    ],
    image: IMAGES.properties.land,
    alt: "Aerial view of an industrial complex surrounded by greenery",
    featured: false,
    status: "Curated example",
  },
  {
    id: "agricultural-estate-tamilnadu",
    title: "Agricultural Estate",
    category: "Agricultural Land",
    location: "Tamil Nadu",
    description:
      "Large-format agricultural land offering scale, privacy and long-term potential.",
    overview:
      "A distinctive agricultural estate suited to clients seeking land-backed potential, countryside privacy and a strong long-term value proposition.",
    highlights: [
      "Expansive agricultural footprint",
      "Private, low-density setting with long-term potential",
      "Natural investment and lifestyle value",
    ],
    image: IMAGES.properties.agriculturalEstate,
    alt: "Aerial view of lush farmland and a countryside estate",
    featured: false,
    status: "Curated example",
  },
];
