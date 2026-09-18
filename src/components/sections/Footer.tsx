"use client";

import { company, navLinks } from "@/data/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#123D2A] text-white">
      <div className="mx-auto max-w-[1500px] px-6 pb-10 pt-20 md:px-10 md:pt-28 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" size="md" layout="row" />
            <p className="font-display mt-10 text-2xl font-medium italic leading-snug text-white/85 md:ltext-3xl">
              Exceptional Properties.
              <br />
              Enduring <span className="text-white">Value.</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
              {company.positioning}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Explore
            </p>
            <ul className="mt-7 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-wintergreen transition-all duration-500 group-hover:w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Contact
            </p>
            <ul className="mt-7 space-y-3.5 text-sm text-white/60">
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors duration-300 hover:text-wintergreen">
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-300 hover:text-wintergreen"
                >
                  {company.phone}
                </a>
              </li>
              <li>{company.location}</li>
            </ul>

            <p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Legal
            </p>
            <ul className="mt-7 flex gap-8 text-sm">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-white/60 transition-colors duration-300 hover:text-wintergreen"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-white/60 transition-colors duration-300 hover:text-wintergreen"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-[9px] font-medium tracking-[0.24em] text-white/35">
            © 2026 WinterGreen Realty Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
