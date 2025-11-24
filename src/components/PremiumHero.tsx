"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PremiumHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          }
        );
      }

      if (featureRef.current) {
        gsap.fromTo(
          featureRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.09,
            duration: 0.85,
            delay: 0.6,
            ease: "power3.out",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-black"
    >
      {/* Background hero art */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/sovereign-hero.png"
          alt="Sovereign Vault hero"
          priority
          fill
          className="object-cover"
        />
        {/* Slight darkening so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/80" />
      </div>

      {/* Overlays: only CTAs + feature cards */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-end pb-16 text-center">
        <div className="section-shell max-w-5xl">
          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="mb-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="rounded-full border border-amber-300/60 bg-amber-300/90 px-7 py-2 text-xs font-semibold tracking-wide text-black shadow-[0_0_30px_rgba(255,214,134,0.6)] hover:bg-amber-200 transition">
              ENTER THE VAULT
            </button>
            <button className="rounded-full border border-amber-200/70 bg-black/60 px-7 py-2 text-xs font-semibold tracking-wide text-amber-100 hover:bg-amber-50/5 transition">
              SECURE YOUR WEALTH
            </button>
          </div>

          {/* Elite Access bar */}
          <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-black/70 px-6 py-2 text-[11px] font-medium tracking-[0.25em] text-amber-200/90 uppercase hero-ring">
            ELITE ACCESS: $278+
          </div>

          {/* Feature cards row */}
          <div
            ref={featureRef}
            className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3"
          >
            {[
              "Hardware Security",
              "Biometric Auth",
              "SafeSend",
              "Multi-Party Compute",
              "Social Recovery",
              "NFT Verification",
            ].map((label) => (
              <div
                key={label}
                className="glass-card flex flex-col items-center justify-center rounded-xl px-3 py-4 text-[11px] text-amber-50/90 backdrop-blur"
              >
                <div className="mb-2 h-7 w-7 rounded-full border border-amber-300/70 bg-black/60 shadow-[0_0_24px_rgba(255,214,134,0.6)]" />
                <span className="font-semibold tracking-wide text-amber-100">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
