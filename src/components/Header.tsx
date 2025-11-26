// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "@Name Marketplace" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[radial-gradient(circle_at_top,_#1f1c2c_0,_#050606_55%)]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
        {/* Top row: logo + desktop nav + CTA */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo / wordmark */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-8 w-8 md:h-9 md:w-9">
              <Image
                src="/images/sections/logo-sovereign-vault.png"
                alt="Sovereign Vault logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f5d27a]">
              Sovereign Vault
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-xs md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative pb-1 transition-colors",
                    active
                      ? "text-[#f5d27a]"
                      : "text-neutral-200 hover:text-[#f5d27a]",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] px-4 py-1.5 text-[11px] font-semibold text-black shadow-[0_0_24px_rgba(245,210,122,0.9)] hover:shadow-[0_0_36px_rgba(245,210,122,1)]"
          >
            Enter Vault
          </Link>
        </div>

        {/* Mobile nav row: scrollable pills */}
        <nav className="-mx-4 mt-3 flex gap-3 overflow-x-auto pb-2 md:hidden px-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium transition",
                  active
                    ? "border-yellow-300/80 bg-yellow-300/20 text-[#fbe6a4]"
                    : "border-white/15 bg-black/60 text-neutral-200 hover:border-yellow-300/70 hover:text-yellow-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
