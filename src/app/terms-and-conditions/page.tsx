import type { Metadata } from "next";
import Link from "next/link";

import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | WinterGreen Realty",
  description: "Terms and conditions governing the use of the WinterGreen Realty website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-4xl px-6 pb-28 pt-10 md:px-10 md:pt-14">
        <Link href="/" className="inline-block">
         
        </Link>

        <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.34em] text-black/45">
          Legal · Terms
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium md:text-6xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
          {company.name}
        </p>

        <div className="mt-16 space-y-12 border-t border-black/10 pt-12">
          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              1. Website Usage
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              This website is operated by {company.name}. By accessing or using this website, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you should refrain from using the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              2. Property Information &amp; Disclaimer
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              The property listings, descriptions, categories, images, and asset representations displayed on this website are provided as curated illustrative examples for general informational purposes. They do not constitute a formal offer, legal warranty, or binding contractual representation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              3. Availability &amp; Pricing Disclaimer
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Property availability, commercial valuations, land acreage, and pricing are subject to change without prior notice. Specific property details, documentation, and pricing are disclosed exclusively through private, confidential communication with verified parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              4. Enquiries &amp; Communication
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Submitting an enquiry via our contact form does not establish an exclusive brokerage agreement, legal agency, or fiduciary relationship. All communications remain subject to mutual verification and formal definitive documentation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              5. Intellectual Property
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              The brand name WinterGreen, WinterGreen Realty, the logo, original website design, typography layout, image curation, and content assets are the exclusive intellectual property of {company.name}. Reproduction or distribution without prior written consent is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              6. Third-Party Links
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Our website may contain references or links to third-party resources or external sites. WinterGreen Realty is not responsible for the content, privacy practices, or availability of any third-party services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              7. Limitation of Liability
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              To the fullest extent permitted by applicable law, WinterGreen Realty shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your access to, reliance on, or inability to use the information provided on this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              8. Privacy Reference
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Your use of this website is also governed by our <Link href="/privacy-policy" className="text-wintergreen underline underline-offset-4">Privacy Policy</Link>, which details how we collect, store, and protect your enquiry information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              9. Website &amp; Content Changes
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We reserve the right to modify, suspend, or update any part of this website, including these Terms &amp; Conditions, at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              10. Governing Law &amp; Jurisdiction
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
