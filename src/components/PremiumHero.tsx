"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PremiumHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
      );

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.06,
          xPercent: -2,
          duration: 18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

        gsap.to(cardRef.current, {
          y: -10,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 }
        );
      }

      if (badgesRef.current) {
        gsap.fromTo(
          badgesRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.3 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden pt-24 pb-20 sm:pb-24 lg:pb-32"
    >
      <div ref={bgRef} className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/hero-bg-golden-swirls.png"
          alt="Golden fluid energy representing secure, premium crypto flows"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.85),_rgba(2,3,10,0.95))]" />
      </div>

      <div className="hero-overlay pointer-events-none absolute inset-0 -z-10" />

      <div className="relative z-10 section-shell">
        <div
          ref={badgesRef}
          className="mb-4 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-amber-200/90"
        >
          <span className="rounded-full border border-amber-200/40 bg-black/60 px-4 py-1 shadow-[0_0_24px_rgba(255,214,134,0.4)]">
            SovereignVault • Elite Security
          </span>
          <span className="rounded-full border border-amber-200/20 bg-black/40 px-4 py-1 text-amber-100/80">
            Rolex-Level • Lambo-Grade • Tech-Forward
          </span>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold text-amber-50 sm:text-4xl lg:text-[2.9rem] lg:leading-tight">
            The Elite Crypto Vault for{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              People Who Refuse to Get Rugged
            </span>
          </h1>
          <p className="mt-4 text-sm text-amber-100/80 sm:text-base">
            Sovereign Vault locks your entire crypto life behind @name identity,
            hardware-grade security, and an AI risk engine watching every move.
            Day one, you get the same protection the elites do.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-xl rounded-[32px] border border-amber-200/40 bg-black/40 p-[2px] shadow-[0_0_55px_rgba(255,214,134,0.45)] backdrop-blur"
          >
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,214,134,0.26),_transparent_65%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.9),_transparent_65%)]" />
            <div className="relative overflow-hidden rounded-[28px] bg-black">
              <Image
                src="/images/sections/sovereign-vault-elite-security-access.png"
                alt="Sovereign Vault • Elite Security Access"
                width={1200}
                height={800}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="relative flex items-center justify-between gap-3 border-t border-amber-200/25 bg-black/80 px-5 py-3 text-[11px] text-amber-100/80">
              <span className="tracking-[0.25em] uppercase text-amber-200/90">
                Elite Access
              </span>
              <span className="rounded-full border border-amber-200/50 bg-black/50 px-3 py-1 text-[10px] font-semibold text-amber-100 shadow-[0_0_18px_rgba(255,214,134,0.5)]">
                Same Protection as the Vaulted Few
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div
            ref={ctaRef}
            className="mb-6 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-black shadow-[0_0_30px_rgba(255,214,134,0.6)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,214,134,0.8)] transition">
              ENTER THE VAULT
            </button>
            <button className="rounded-full border border-amber-100/40 bg-black/70 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-amber-100 hover:bg-amber-50/5 transition">
              SECURE YOUR WEALTH
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 text-[11px] text-amber-100/80 sm:flex-row sm:gap-6">
            <div className="hero-ring inline-flex items-center gap-2 rounded-full border border-amber-200/50 bg-black/70 px-4 py-2">
              <span className="uppercase tracking-[0.25em] text-amber-200/90">
                Elite Access
              </span>
              <span className="text-[12px] font-semibold text-amber-100">
                $278 • One Time • Lifetime @Name
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-[11px] text-amber-100/80">
              <span className="rounded-full bg-black/60 px-3 py-1">
                Hardware-Grade Security
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1">
                AI Risk Engine 24/7
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1">
                SafeSend &amp; Guardians
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}