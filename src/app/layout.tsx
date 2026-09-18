import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { IMAGES } from "@/data/images";
import { company } from "@/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

const title = "WinterGreen Realty Private Limited | Premium Real Estate";
const description =
  "WinterGreen Realty Private Limited offers premium real-estate opportunities across industrial, commercial, agricultural, luxury living and estate properties, backed by 15+ years of industry knowledge.";
const siteUrl = "https://wintergreenrealty.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | WinterGreen Realty",
  },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "WinterGreen Realty",
    "WinterGreen",
    "premium real estate",
    "industrial property",
    "commercial property",
    "agricultural land",
    "luxury living",
    "estates",
    "real estate advisory",
    "Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.name,
    title,
    description,
    locale: "en_IN",
    images: [
      {
        url: IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "WinterGreen Realty — Timeless Properties. Evergreen Value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [IMAGES.hero],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.name,
              url: siteUrl,
              slogan: company.tagline,
              email: company.email,
              telephone: company.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              identifier: {
                "@type": "PropertyValue",
                propertyID: "CIN",
                value: company.cin,
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
