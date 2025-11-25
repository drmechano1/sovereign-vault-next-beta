// components/dashboard/TopBar.tsx
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/40 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9">
          <Image
            src="/images/sections/logo-sovereign-vault.png"
            alt="Sovereign Vault logo"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#f3e2b4]/70">
            Vault Dashboard
          </div>
          <div className="text-sm font-semibold text-white">@sovereignvault</div>
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <button className="rounded-full border border-yellow-300/30 bg-black/60 px-3 py-1 text-xs text-[#f3e2b4]">
          All chains ▾
        </button>
        <button className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-neutral-200">
          BTC
        </button>
        <button className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-neutral-200">
          ETH
        </button>
        <button className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-neutral-200">
          SOL
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative h-8 w-8 rounded-full border border-white/10 bg-black/70 text-xs text-yellow-300">
          ●
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full border border-white/15 bg-neutral-700" />
      </div>
    </header>
  );
}
