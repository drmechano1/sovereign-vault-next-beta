// components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-white/5 bg-black/95">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: brand + legal line */}
          <div className="space-y-1 text-[11px] md:text-xs text-[#f3e2b4]/80">
            <div className="uppercase tracking-[0.25em] text-[#f5d27a]/90">
              Sovereign Vault
            </div>
            <div>
              © {year} Sovereign Vault. All rights reserved. Patent pending.
            </div>
            <div className="text-[10px] md:text-[11px] text-[#f3e2b4]/70">
              This site describes an early-access version of the Sovereign Vault
              system. Architecture, pricing, and availability may change before
              full mainnet launch.
            </div>
          </div>

          {/* Right: links */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs">
            <Link
              href="/legal"
              className="text-[#f3e2b4]/85 hover:text-[#f5d27a]"
            >
              Legal &amp; Privacy
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link
              href="/support"
              className="text-[#f3e2b4]/85 hover:text-[#f5d27a]"
            >
              Support
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link
              href="https://x.com"
              target="_blank"
              className="text-[#f3e2b4]/85 hover:text-[#f5d27a]"
            >
              Updates on X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
