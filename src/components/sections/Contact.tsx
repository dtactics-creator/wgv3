"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";

import { useScrollScene } from "@/hooks/use-scroll-scene";
import { fadeUp, maskReveal } from "@/lib/gsap";
import { company, interests } from "@/data/site";
import { Arrow, Eyebrow, Mask } from "@/components/ui";

function Field({
  label,
  name,
  required = false,
  full = false,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="block text-[9px] font-semibold uppercase tracking-[0.32em] text-black/50"
      >
        {label}
        {required && (
          <span className="text-wintergreen" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

const fieldClass =
  "w-full border-0 border-b border-ink/15 bg-transparent py-3.5 text-base text-ink placeholder:text-black/30 transition-colors duration-300 focus:border-wintergreen focus:outline-none";

function ContactForm() {
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  const [selectedInterest, setSelectedInterest] = useState("");

  const [otherInterest, setOtherInterest] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const selectedValue = String(fd.get("interest") ?? "");

    const finalInterest =
      selectedValue === "Others"
        ? otherInterest.trim()
        : selectedValue;

    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      location: String(fd.get("location") ?? ""),
      interest: finalInterest,
      message: String(fd.get("message") ?? ""),
    };

    console.log("Enquiry payload:", payload);

    setState("sending");
    setError("");

    try {
      // Simulate network request for static demo
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setState("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-start justify-center rounded-3xl border border-wintergreen/30 bg-paper p-10 md:p-14"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-wintergreen text-wintergreen">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M4 12.5l5 5L20 6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <p className="font-display mt-8 text-3xl font-medium md:text-4xl">
          Thank you.
        </p>

        <p className="mt-4 max-w-md text-base leading-relaxed text-black/60">
          Your enquiry has been received. Our team will respond privately — we
          aim to reply within one business day.
        </p>

        <button
          type="button"
          onClick={() => {
            setState("idle");
            setSelectedInterest("");
            setOtherInterest("");
          }}
          className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-wintergreen underline-offset-4 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="grid gap-x-10 gap-y-11 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClass}
          />
        </Field>

        <Field label="Company" name="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company / organisation (optional)"
            className={fieldClass}
          />
        </Field>

        <Field label="Phone" name="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91"
            className={fieldClass}
          />
        </Field>

        <Field label="Email" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </Field>

        <Field label="Location" name="location" full>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="City / Region (e.g. Chennai, Tamil Nadu)"
            className={fieldClass}
          />
        </Field>

        <Field label="Interested In" name="interest" required full>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              required
              value={selectedInterest}
              onChange={(e) => {
                const value = e.target.value;

                setSelectedInterest(value);

                if (value !== "Others") {
                  setOtherInterest("");
                }
              }}
              className={`${fieldClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select an area of interest
              </option>

              {interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {selectedInterest === "Others" && (
            <input
              id="otherInterest"
              name="otherInterest"
              type="text"
              value={otherInterest}
              onChange={(e) => setOtherInterest(e.target.value)}
              placeholder="Please specify your requirement"
              required
              autoComplete="off"
              className={`${fieldClass} mt-4`}
            />
          )}
        </Field>

        <Field label="Message" name="message" full>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us briefly about your requirement (optional)"
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white transition-colors duration-300 hover:bg-wintergreen disabled:cursor-wait disabled:opacity-60"
        >
          <span>
            {state === "sending" ? "Submitting…" : "Submit Enquiry"}
          </span>

          <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
        </button>

        <p className="max-w-xs text-xs leading-relaxed text-black/45">
          Enquiries are handled privately and confidentially. No obligation, no
          follow-up unless you wish.
        </p>
      </div>

      <div aria-live="polite" className="mt-6 min-h-6">
        {state === "error" && (
          <p role="alert" className="text-sm text-[#A03A2A]">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useScrollScene(root, () => {
    maskReveal(headingRef.current);

    fadeUp(root.current?.querySelectorAll("[data-fade]") ?? [], null, {
      start: "clamp(top 93%)",
      stagger: 0.08,
    });
  });

  return (
    <section id="contact" ref={root} className="bg-white text-ink">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-44 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow index="09" className="mb-10 md:mb-14">
              Contact
            </Eyebrow>

            <div ref={headingRef}>
              <h2 className="font-display text-[clamp(2.6rem,5.8vw,5.4rem)] font-medium uppercase leading-[1.02]">
                <Mask>Let's talk</Mask>

                <Mask>
                  <em className="italic">real estate.</em>
                </Mask>
              </h2>
            </div>

            <p
              data-fade
              className="mt-8 max-w-md text-base leading-relaxed text-black/60 md:text-lg"
            >
              Whether you're looking to acquire, sell or explore a premium
              property opportunity, we're here to start the conversation.
            </p>

            <div className="mt-12">
              <a
                data-fade
                data-cursor="CALL"
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="group flex items-center justify-between border-t border-ink/10 py-2 transition-colors duration-300 hover:border-wintergreen/50"
              >
                <span className="font-display text-xl font-medium transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">
                  {company.phone}
                </span>
              </a>

              <a
                data-fade
                data-cursor="MAIL"
                href={`mailto:${company.email}`}
                className="group flex items-center justify-between py-2 transition-colors duration-300"
              >
                <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-black/50">
                  Email us
                </span>

                <span className="font-display text-base font-medium transition-transform duration-500 group-hover:translate-x-1 md:text-lg">
                  {company.email}
                </span>
              </a>

              <div
                data-fade
                className="flex items-center justify-between border-t border-b border-ink/10 py-6"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-black/50">
                  Send an enquiry
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-wintergreen">
                  Use the form →
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div data-fade>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}