"use client";

import { company, navLinks } from "@/data/site";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.2a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V7.3c0-.9.3-1.5 1.6-1.5H17V2.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3.1h2.9v8h2.6Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.9 5.38 1.56 1.56 0 0 1 6.94 8.5ZM5.5 9.8h2.8v9.2H5.5Zm4.8 0h2.7v1.3h.1c.4-.7 1.3-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v5.7h-2.8v-5.3c0-1.2 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v5.4H10.3Z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#1c9045] [&_*]:!text-white">
      <div className="mx-auto max-w-[1500px] px-6 pb-10 pt-20 md:px-10 md:pt-28 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <p className="font-display -mt-6 text-3xl font-medium italic leading-snug text-white/85 md:text-4xl">
              Exceptional Properties.
              <br />
              Enduring <span className="text-white">Value.</span>
            </p>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/45 md:text-lg">
              {company.positioning}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Explore
            </p>

            <ul className="mt-7 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-base text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-wintergreen transition-all duration-500 group-hover:w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Contact
            </p>

            <ul className="mt-7 space-y-4 text-base text-white/60 md:text-lg">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors duration-300 hover:text-wintergreen"
                >
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

            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Follow us
            </p>

            <ul className="mt-7 flex gap-3 text-base">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/75 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center">
            <p className="text-[11px] font-medium tracking-[0.12em] text-white/60">
              © 2026 WinterGreen Realty Private Limited. All Rights Reserved.
            </p>
            <a
              href="/privacy-policy"
              className="text-[11px] font-medium tracking-[0.12em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="text-[11px] font-medium tracking-[0.12em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}