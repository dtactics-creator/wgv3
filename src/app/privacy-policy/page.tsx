import type { Metadata } from "next";
import Link from "next/link";

import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | WinterGreen Realty",
  description: "How WinterGreen Realty Private Limited collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-4xl px-6 pb-28 pt-10 md:px-10 md:pt-14">
        <Link href="/" className="inline-block">
          
        </Link>

        <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.34em] text-black/45">
          Legal · Privacy
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
          Effective for {company.name}
        </p>

        <div className="mt-16 space-y-12 border-t border-black/10 pt-12">
          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              1. Information Collected
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              When you interact with WinterGreen Realty or submit an enquiry through our website, we collect information that you voluntarily provide to us. This includes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-black/60">
              <li><strong>Contact &amp; Personal Info:</strong> Your full name, organization or company name, email address, and telephone number.</li>
              <li><strong>Location:</strong> Your specified city, region, or location details relevant to your enquiry.</li>
              <li><strong>Property Enquiry Information:</strong> Preferred asset category (Industrial Property, Commercial Property, Agricultural Land, Luxury Living, Estate), budget ranges, property requirements, and any messaging submitted through our contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              2. How Information is Used
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We utilize the collected information strictly for professional and advisory purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-black/60">
              <li>To respond to your property enquiries and fulfill consultation requests.</li>
              <li>To evaluate and match suitable real-estate opportunities with your requirements.</li>
              <li>To maintain private communication regarding transactions, property visits, and negotiations.</li>
              <li>To satisfy legitimate business, legal, and operational accounting requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              3. Communication &amp; Privacy
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We respect your privacy and handle all communications with discretion. We do not engage in unsolicited promotional mailings or spam. We will only contact you directly regarding your specific property interests or related direct inquiries.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              4. Data Protection &amp; Security
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We implement appropriate physical, technical, and administrative safeguards to protect your personal information against unauthorized access, loss, misuse, or alteration. All client records and enquiry submissions are treated with confidential oversight.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              5. Cookies &amp; Analytics
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              Our website uses basic functional technology to ensure optimal performance, smooth visual transitions, and navigation functionality. We do not use intrusive tracking scripts or trade user profiles with advertising networks.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              6. Third-Party Services
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We do not sell, rent, or trade your personal information to third parties. We may disclose information only to trusted service partners bound by confidentiality agreements, or when mandated by applicable law or governmental authority.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              7. Data Retention
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We retain personal and enquiry data only for as long as necessary to fulfill the purposes for which it was collected, manage ongoing client relationships, or comply with legal and legal-record mandates.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              8. User Rights
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              You have the right to request access to the personal information we hold about you, request corrections to inaccurate records, or request deletion of your contact data, subject to applicable legal obligations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              9. Policy Updates
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              We may update this Privacy Policy periodically to reflect changes in our operational practices or statutory requirements. Updates will be published directly on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              10. Contact Information
            </h2>
            <p className="mt-4 leading-relaxed text-black/60">
              For any questions regarding this Privacy Policy or to exercise your privacy rights, please contact our team:
            </p>
            <p className="mt-3 leading-relaxed text-black/70">
              <strong>{company.name}</strong><br />
              Email: <a href={`mailto:${company.email}`} className="text-wintergreen underline underline-offset-4">{company.email}</a><br />
             
              Location: {company.location}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
