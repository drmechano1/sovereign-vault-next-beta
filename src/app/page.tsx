import PremiumHero from '../components/PremiumHero';
import Image from "next/image";

const coreFeatures = [
  {
    title: '@Name System',
    body: 'Claim your permanent @name once and route all wallets, chains, and contacts through a single human-readable identity.',
  },
  {
    title: 'NFT Vault Protection',
    body: "Lock blue-chip NFTs behind multi-guardian approvals and SafeSend rules so a single mistake can't cost everything.",
  },
  {
    title: 'SafeSend',
    body: 'Send with a reversible delay window, guardian approvals, and AI-powered risk checks before anything leaves your vault.',
  },
  {
    title: 'Cross-Chain Payments',
    body: 'Pay anyone on any supported chain using only their @name — Sovereign Vault handles the routing behind the scenes.',
  },
];

export default function HomePage() {
  return (
    <div>
      <PremiumHero />
      
      <section className="section-shell py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Level 2 – Core Features
            </p>
            <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
              Everything your current wallet should have shipped with.
            </h2>
          </div>
          <div className="hidden text-right text-xs text-amber-100/60 sm:block">
            <p>Security Depth: 26%</p>
            <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-amber-300/20">
              <div className="h-full w-[26%] bg-gradient-to-r from-amber-300 to-amber-200" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {coreFeatures.map((f) => (
            <div
              key={f.title}
              className="glass-card relative overflow-hidden rounded-2xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-300/35 via-amber-200/25 to-transparent blur-2xl" />
              </div>

              <h3 className="relative text-sm font-semibold text-amber-50">
                {f.title}
              </h3>
              <p className="relative mt-2 text-xs text-amber-100/70">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
<section className="section-shell pb-20">
  <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
        Live Product View
      </p>
      <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
        See exactly what you&apos;re getting when you enter the Vault.
      </h2>
      <p className="mt-3 text-xs text-amber-100/75 sm:text-sm">
        From the Elite Access card to the @name dashboard, everything in Sovereign Vault
        is designed to feel like a luxury watch, a supercar delivery, and a private vault
        appointment – not another flimsy browser wallet.
      </p>
      <ul className="mt-5 space-y-2 text-xs text-amber-100/80 sm:text-sm">
        <li>• Elite Access card visuals that match your on-chain @name identity.</li>
        <li>• Vault dashboard for BTC, ETH, NFTs, and cross-chain flows in one glass panel.</li>
        <li>• Visual confirmation of SafeSend, cross-chain payments, and NFT Fort Knox protection.</li>
      </ul>
    </div>

    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/40 bg-black/60 p-2 shadow-[0_0_40px_rgba(255,214,134,0.45)]">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/sections/sovereign-vault-digital-interface-designs.png"
            alt="Sovereign Vault interface preview"
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 pb-1 text-[11px] text-amber-100/80">
          <span className="rounded-full bg-black/60 px-3 py-1">
            Unified Vault Dashboard
          </span>
          <span className="rounded-full bg-black/60 px-3 py-1">
            Rolex • Lambo • Private Vault Energy
          </span>
        </div>
      </div>

      {/* Floating product cards */}
      <div className="pointer-events-none absolute -bottom-6 -right-4 w-40 sm:w-48">
        <div className="overflow-hidden rounded-2xl border border-amber-200/50 bg-black/80 shadow-[0_0_30px_rgba(255,214,134,0.7)]">
          <Image
            src="/images/sections/sovereign-vault-cryptocurrency-wallet-card.png"
            alt="Sovereign Vault premium wallet card"
            width={600}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -left-3 -bottom-10 hidden w-40 sm:block">
        <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-black/80 shadow-[0_0_26px_rgba(255,214,134,0.55)]">
          <Image
            src="/images/sections/nft-vault-protection-fort-knox-for-digital-assets.png"
            alt="NFT vault Fort Knox style protection"
            width={600}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}