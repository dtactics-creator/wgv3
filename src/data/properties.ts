import { IMAGES } from "@/data/images";

export interface Property {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
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
    image: IMAGES.properties.agriculturalEstate,
    alt: "Aerial view of lush farmland and a countryside estate",
    featured: false,
    status: "Curated example",
  },
];
