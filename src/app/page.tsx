// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#050606] text-neutral-100">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            // NOTE: Update this path if the actual hero video has a different filename.
            src="/hero/sv-hero.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#050606]/95" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16 md:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
            Early access · UI &amp; architecture preview
          </div>

          <h1 className="mt-5 max-w-2xl text-3xl font-bold text-white md:text-5xl">
            The elite crypto vault for people who refuse to get rugged.
          </h1>

          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#f3e2b4]/90">
            An EAL6+ NFC card, @name identity, SafeSend guardian layer, and AI
            risk engine — fused into one command center for serious holders,
            funds, and builders.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-[11px] md:text-xs">
            <Link
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] px-5 py-2 font-semibold text-black shadow-[0_0_40px_rgba(245,210,122,0.95)] hover:shadow-[0_0_55px_rgba(245,210,122,1)]"
            >
              Enter the Vault
            </Link>
            <Link
              href="/security"
              className="rounded-full border border-yellow-300/60 bg-black/70 px-5 py-2 font-semibold text-[#fbe6a4] hover:border-yellow-300/90"
            >
              Secure your wealth
            </Link>
          </div>

          <p className="mt-3 text-[11px] text-[#f3e2b4]/75 max-w-md">
            Basic Sovereign Wallet is free for life. Early access users can
            claim one @name at gas-only pricing before the mainnet shard
            upgrade.
          </p>
        </div>
      </section>

      {/* LEVEL 2 – CORE FEATURES */}
      <section className="border-b border-white/5 bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                One vault. Four pillars of protection.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#f3e2b4]/90">
                Hardware-grade keys, human-readable @names, guarded sends, and
                cross-chain routing — all wrapped in a single premium interface.
              </p>
            </div>
            <div className="text-[11px] text-[#f3e2b4]/75">
              Every plan taps into the same security architecture. The only
              difference is how far you want to go.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* @Name System */}
            <article className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition hover:border-yellow-300/70 hover:bg-white/[0.04]">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-xl border border-yellow-300/60 bg-black/80">
                <Image
                  src="/images/icons/vault-icon.png"
                  alt="Vault emblem icon"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  @Name System
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#f3e2b4]/90">
                  Map all your wallets and chains under a single @name. People
                  send to <span className="font-mono">@you</span>, not a 0x
                  string.
                </p>
              </div>
            </article>

            {/* NFT Vault Protection */}
            <article className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition hover:border-yellow-300/70 hover:bg-white/[0.04]">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-xl border border-yellow-300/60 bg-black/80">
                <Image
                  src="/images/icons/vault-icon.png"
                  alt="Vault protection icon"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  NFT Vault Protection
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#f3e2b4]/90">
                  Park high-value NFTs, RWAs, and long-term holdings behind
                  guardian policies and SafeSend-style protections.
                </p>
              </div>
            </article>

            {/* SafeSend */}
            <article className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition hover:border-yellow-300/70 hover:bg-white/[0.04]">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-xl border border-yellow-300/60 bg-black/80">
                <Image
                  src="/images/icons/safesend-icon.png"
                  alt="SafeSend emblem"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  SafeSend Guardian Layer
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#f3e2b4]/90">
                  Add delays, guardian approvals, and AI checks to large
                  transfers. Stop fat fingers and phishing before they settle.
                </p>
              </div>
            </article>

            {/* Cross-Chain Payments */}
            <article className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition hover:border-yellow-300/70 hover:bg-white/[0.04]">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-xl border border-yellow-300/60 bg-black/80">
                <Image
                  src="/images/sections/unified-vault-dashboard.png"
                  alt="Cross-chain routing visual"
                  fill
                  className="object-cover p-0.5"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Cross-Chain Payments
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#f3e2b4]/90">
                  Send like a human, settle like a machine. Vault logic handles
                  routing so your counterparties just see @you and &ldquo;paid.&rdquo;
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* LEVEL 3 – LIVE PRODUCT VIEW */}
      <section className="border-b border-white/5 bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Your whole vault, in one unified command center.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#f3e2b4]/90">
                Balances, NFTs, RWAs, SafeSend queue, and risk scores — not
                scattered across 10 tabs. Just one, serious-grade dashboard.
              </p>
            </div>
            <div className="text-[11px] text-[#f3e2b4]/75">
              UI shown here is simulated. Live data will be driven directly from
              on-chain contracts and the AI engine.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80">
              <div className="relative h-52 w-full md:h-64">
                <Image
                  src="/images/sections/unified-vault-dashboard.png"
                  alt="Unified Sovereign Vault dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80">
                <div className="relative h-24 w-full md:h-32">
                  <Image
                    src="/images/sections/elite-access-card.png"
                    alt="Sovereign Vault hardware wallet card"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-xs text-[#f3e2b4]/90">
                  Elite-grade NFC card with EAL6+ secure element. Keys are
                  generated and stored on-card and never exported.
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80">
                <div className="relative h-24 w-full md:h-32">
                  <Image
                    src="/images/sections/fort-knox-nft-vault.png"
                    alt="Fort Knox style NFT vault visual"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-xs text-[#f3e2b4]/90">
                  Fort Knox-style NFT vault for high-value assets, governance
                  tokens, and RWAs — guarded by your @name and policies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 4 – @NAME IDENTITY */}
      <section className="border-b border-white/5 bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.3fr,1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                One handle. All wallets. All chains. Your sovereign identity.
              </h2>
              <p className="mt-3 text-sm text-[#f3e2b4]/90">
                Stop copying 0x addresses. Your @name is a smart-contract backed
                identity that knows which wallets and chains are really you.
              </p>
              <ul className="mt-4 space-y-2 text-xs md:text-sm text-[#f3e2b4]/90">
                <li>• Map BTC, ETH, SOL, and L2s under a single @name.</li>
                <li>• AI-assisted verification to reduce imposters and spoofed handles.</li>
                <li>• Smart contract gate checks ownership of the @name before it lets assets move.</li>
                <li>• Your @name NFT lives inside the vault for maximum protection.</li>
              </ul>
              <p className="mt-3 text-[11px] text-[#f3e2b4]/75">
                Early access: claim one @name at gas-only pricing. After the
                shard upgrade, all new @names will be purchased or traded through
                the marketplace.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-yellow-300/40 bg-black/90">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/sections/unified-vault-dashboard.png"
                  alt="@name identity and profile preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 5 – SAFESEND & CROSS-CHAIN */}
      <section className="border-b border-white/5 bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Send like a human. Settle like a machine. Cross-chain by design.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#f3e2b4]/90">
                SafeSend wraps your transfers in delays, guardian approvals, and
                AI checks. Cross-chain routing then handles the messy part under
                the hood.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* SafeSend column */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/85">
                <div className="relative h-40 w-full">
                  <Image
                    src="/images/sections/safesend-guarded-transfers.png"
                    alt="SafeSend guarded transfers visual"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-xs text-[#f3e2b4]/90">
                  Guarded transfers with human-readable recipients, SafeSend
                  delays, and guardian notifications for large moves.
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/85">
                <div className="relative h-40 w-full">
                  <Image
                    src="/images/sections/safesend-delay-cancel.png"
                    alt="SafeSend delay and cancel window"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-xs text-[#f3e2b4]/90">
                  Delay windows let you cancel or adjust high-value transfers
                  before they hit the chain. If risk spikes, guardians can step in.
                </div>
              </div>
            </div>

            {/* Cross-chain column */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/85">
                <div className="relative h-40 w-full">
                  <Image
                    src="/images/sections/cross-chain-routing.png"
                    alt="Cross-chain routing diagram"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-xs text-[#f3e2b4]/90">
                  Your counterparty just sees @you and a settled balance. Behind
                  the scenes, cross-chain logic chooses the safest route.
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/60 p-3 text-xs text-[#f3e2b4]/80">
                Future modules plug into this same lane: automated DCA vaults,
                RWA settlement rails, institutional policy engines and more —
                without breaking your @name mental model.
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-[#f3e2b4]/75">
            Under the hood, SafeSend and cross-chain logic are driven by smart
            contracts and off-chain policy engines. Full technical docs and
            audits are available to partners under NDA.
          </div>
        </div>
      </section>

      {/* LEVEL 6A – AI RISK ENGINE */}
      <section className="border-b border-white/5 bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.3fr,1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                AI watching your back 24/7 so you don&apos;t get rugged.
              </h2>
              <p className="mt-3 text-sm text-[#f3e2b4]/90">
                The AI risk engine scores counterparties, contracts, and routes
                in real time, then pushes risky flows into SafeSend where you
                can step in.
              </p>
              <ul className="mt-4 space-y-2 text-xs md:text-sm text-[#f3e2b4]/90">
                <li>• Per-asset and per-route risk scores (AA+ down to high risk).</li>
                <li>• Live anomaly alerts for unusual movements or exposure spikes.</li>
                <li>• Exportable reports for funds, family offices, and auditors.</li>
              </ul>
              <p className="mt-3 text-[11px] text-[#f3e2b4]/75">
                Scores shown here are simulated. The live engine will be tuned
                with real data, pen tests, and external audits before mainnet GA.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/90">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/sections/ai-risk-engine-dashboard.png"
                  alt="AI risk engine dashboard with AA+ score and alerts"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 6B – @NAME MARKETPLACE PREVIEW */}
      <section className="bg-[#050606]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.3fr,1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Own the flex. Own the name. Own the upside.
              </h2>
              <p className="mt-3 text-sm text-[#f3e2b4]/90">
                Premium @names are scarce digital real estate: identity,
                inbound router, and signal — all in one. As the ecosystem
                grows, the best names don&apos;t come back on the market often.
              </p>
              <ul className="mt-4 space-y-2 text-xs md:text-sm text-[#f3e2b4]/90">
                <li>• AI-ranked @names by demand, scarcity, and social signal.</li>
                <li>• Signed social proof so people can verify the real you.</li>
                <li>• Marketplace rails for buying, selling, and leasing @names.</li>
              </ul>
              <p className="mt-3 text-[11px] text-[#f3e2b4]/75">
                During early access, some @names can be claimed at gas-only
                pricing. After the shard upgrade, all new @names will be bought
                or traded through the marketplace.
              </p>
              <Link
                href="/marketplace"
                className="mt-4 inline-flex items-center text-[11px] font-semibold text-[#f5d27a] hover:text-yellow-100"
              >
                Explore @Name marketplace →
              </Link>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/90">
                <div className="relative h-40 w-full">
                  <Image
                    src="/images/sections/unified-vault-dashboard.png"
                    alt="Grid of premium @name listings"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-yellow-300/40 bg-black/95">
                <div className="relative h-40 w-full">
                  <Image
                    src="/images/sections/at-name-listing-detail.png"
                    alt="Detail view of a single @name listing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}