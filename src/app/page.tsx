import Image from 'next/image';
import PremiumHero from '../components/PremiumHero';
import { Level2FeatureCard } from '../components/Level2FeatureCard';

const coreFeatures = [
  {
    icon: '/assets/icons/level2/name-system.png',
    title: '@Name System',
    body: 'Claim your permanent @name once and route all wallets, chains, and contacts through a single human-readable identity.',
  },
  {
    icon: '/assets/icons/level2/nft-vault-protection.png',
    title: 'NFT Vault Protection',
    body: "Lock blue-chip NFTs behind multi-guardian approvals and SafeSend rules so a single mistake can't cost everything.",
  },
  {
    icon: '/assets/icons/level2/safesend.png',
    title: 'SafeSend',
    body: 'Send with a reversible delay window, guardian approvals, and AI-powered risk checks before anything leaves your vault.',
  },
  {
    icon: '/assets/icons/level2/cross-chain-payments.png',
    title: 'Cross-Chain Payments',
    body: 'Pay anyone on any supported chain using only their @name — Sovereign Vault handles the routing behind the scenes.',
  },
];

export default function HomePage() {
  return (
    <div>
      <PremiumHero />
      
      <section className="section-shell bg-gradient-to-b from-black via-[#0B0B11] to-[#0E0E18] pt-[120px] pb-16">
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

        <div className="mx-auto grid max-w-[720px] gap-4 md:grid-cols-2">
          {coreFeatures.map((f) => (
            <Level2FeatureCard key={f.title} icon={f.icon} title={f.title}>
              {f.body}
            </Level2FeatureCard>
          ))}
        </div>
      </section>

      {/* LEVEL 3 – LIVE PRODUCT VIEW */}
      <section
        id="live-product-view"
        className="border-t border-amber-200/10 bg-black/40 py-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-14">
          {/* TEXT SIDE */}
          <div className="max-w-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Level 3 · Live Product View
            </p>
            <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
              See exactly what you&apos;re getting when you enter the Vault.
            </h2>
            <p className="mt-3 text-xs text-amber-100/80 sm:text-sm">
              Sovereign Vault doesn&apos;t just sound elite – it looks and feels
              like a private vault appointment. Your @name identity, SafeSend,
              cross-chain flows, and NFT vault all live in one glass-panel
              experience built to feel like luxury hardware and cutting-edge
              fintech in one.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-amber-100/85 sm:text-sm">
              <li>• Unified dashboard for BTC, ETH, stables, and NFTs.</li>
              <li>• SafeSend preview so you can see exactly who and where funds go.</li>
              <li>• Fort Knox-style vault view for NFTs and premium @names.</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 text-[11px] text-amber-100/80">
              <span className="rounded-full bg-black/70 px-3 py-1">
                Rolex • Lambo • Private Vault Energy
              </span>
              <span className="rounded-full bg-black/70 px-3 py-1">
                No more flat, boring wallet UIs
              </span>
            </div>
          </div>

          {/* VISUAL SIDE */}
          <div className="relative flex flex-1 flex-col gap-4">
            {/* MAIN INTERFACE */}
            <div className="overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_40px_rgba(255,214,134,0.45)]">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image
                  src="/images/sections/sovereign-vault-digital-interface-designs.png"
                  alt="Sovereign Vault interface preview"
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 pb-1 text-[11px] text-amber-100/80">
                <span className="rounded-full bg-black/70 px-3 py-1">
                  Unified Vault Dashboard
                </span>
                <span className="rounded-full bg-black/70 px-3 py-1">
                  Real-time balances &amp; risk
                </span>
              </div>
            </div>

            {/* LOWER CARDS */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Wallet card */}
              <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_26px_rgba(255,214,134,0.55)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/sovereign-vault-cryptocurrency-wallet-card.png"
                    alt="Sovereign Vault premium wallet card"
                    width={600}
                    height={400}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Elite Access Card • @name bound
                  </span>
                </div>
              </div>

              {/* NFT Fort Knox */}
              <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_26px_rgba(255,214,134,0.55)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/nft-vault-protection-fort-knox-for-digital-assets.png"
                    alt="NFT Fort Knox vault protection"
                    width={600}
                    height={400}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Fort Knox-style NFT vault
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 4 – @NAME IDENTITY */}
      <section
        id="name-identity"
        className="border-t border-amber-200/10 bg-black py-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex-1">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Level 4 · @Name Identity
            </p>
            <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
              One handle. All wallets. All chains. Your sovereign identity.
            </h2>
            <p className="mt-3 text-xs text-amber-100/80 sm:text-sm">
              Your @name becomes more than a cute handle – it&apos;s your map to
              every chain, every vault, every public address you control. Built
              for humans first, machines second, and scanners third.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-amber-100/85 sm:text-sm">
              <li>• Map BTC, ETH, SOL, NFTs, and more under a single @name.</li>
              <li>• AI-assisted verification for celebs, brands, and enterprises.</li>
              <li>• No more copying 0x strings in DMs – just share your @name.</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-amber-100/80">
              <span className="rounded-full bg-black/70 px-3 py-1">
                Human-readable by default
              </span>
              <span className="rounded-full bg-black/70 px-3 py-1">
                AI-verified for the real ones
              </span>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="max-w-md overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_36px_rgba(255,214,134,0.45)]">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image
                  src="/images/sections/sistema-name-en-dorado-y-azul.png"
                  alt="@Name identity system"
                  width={900}
                  height={700}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 pb-1 text-[11px] text-amber-100/80">
                <span className="rounded-full bg-black/70 px-3 py-1">
                  @sovereignvault
                </span>
                <span className="rounded-full bg-black/70 px-3 py-1">
                  Verified • Multi-chain
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 5 – SAFESEND & CROSS-CHAIN */}
      <section
        id="safesend"
        className="border-t border-amber-200/10 bg-black/40 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex-1">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
                Level 5 · SafeSend & Cross-Chain
              </p>
              <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
                Send like a human. Settle like a machine. Cross-chain by design.
              </h2>
              <p className="mt-3 text-xs text-amber-100/80 sm:text-sm">
                SafeSend wraps every transaction in delays, checks, and guardian
                approvals so you don&apos;t wake up drained. Cross-chain routing
                makes &quot;wrong network&quot; a thing of the past.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-amber-100/85 sm:text-sm">
                <li>• Delayed sends with &quot;oh sh*t&quot; cancel windows.</li>
                <li>• Guardian approvals for big transfers and new destinations.</li>
                <li>• AI checks for scam contracts, blacklisted addresses, and honeypots.</li>
                <li>• Cross-chain routing so funds land where they&apos;re expected.</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-amber-100/80">
                <span className="rounded-full bg-black/70 px-3 py-1">
                  No more &quot;wrong address, game over&quot;
                </span>
                <span className="rounded-full bg-black/70 px-3 py-1">
                  Smart delays &amp; approvals
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_32px_rgba(255,214,134,0.5)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/cosmic-safesend-card-design.png"
                    alt="Cosmic SafeSend card design"
                    width={1000}
                    height={700}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    SafeSend • Guarded transfers
                  </span>
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Delay + Cancel windows
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_32px_rgba(255,214,134,0.5)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/cross-chain-payments-concept-design.png"
                    alt="Cross-chain payments concept"
                    width={1000}
                    height={700}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Cross-Chain Routing
                  </span>
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    One flow • Many chains
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 6 – AI RISK & MARKETPLACE */}
      <section
        id="ai-and-market"
        className="border-t border-amber-200/10 bg-black py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* AI RISK ENGINE */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
                Level 6A · AI Risk Engine
              </p>
              <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
                AI watching your back 24/7 so you don&apos;t get rugged.
              </h2>
              <p className="mt-3 text-xs text-amber-100/80 sm:text-sm">
                Sovereign Vault&apos;s AI Risk Engine analyzes every destination,
                contract, and pattern before you sign. It&apos;s like having a
                paranoid on-chain analyst glued to your wallet.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-amber-100/85 sm:text-sm">
                <li>• Risk scores on addresses, contracts, and protocols.</li>
                <li>• Live alerts when something looks off or abnormal.</li>
                <li>• Exportable reports for tax, ops, and insurance.</li>
              </ul>

              <div className="mt-6 overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_32px_rgba(255,214,134,0.5)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/futuristic-cybersecurity-platform-overview.png"
                    alt="Futuristic cybersecurity platform overview"
                    width={1000}
                    height={700}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Shield Score • AA+
                  </span>
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Real-time anomaly alerts
                  </span>
                </div>
              </div>
            </div>

            {/* MARKETPLACE */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
                Level 6B · @Name Marketplace
              </p>
              <h2 className="mt-2 text-xl font-semibold text-amber-50 sm:text-2xl">
                Own the flex. Own the name. Own the upside.
              </h2>
              <p className="mt-3 text-xs text-amber-100/80 sm:text-sm">
                Premium @names aren&apos;t just vanity – they&apos;re scarce
                digital real estate. Verified names become assets, not just
                usernames, with built-in provenance and resale.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-amber-100/85 sm:text-sm">
                <li>• AI-ranked names for celebs, brands, and whales.</li>
                <li>• Verification via signed social proof – not fake blue checks.</li>
                <li>• Marketplace rails for trading @names with on-chain receipts.</li>
              </ul>

              <div className="mt-6 overflow-hidden rounded-3xl border border-amber-200/40 bg-black/80 p-3 shadow-[0_0_32px_rgba(255,214,134,0.5)]">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/sections/glowing-trophy-in-futuristic-marketplace.png"
                    alt="Glowing trophy in futuristic marketplace"
                    width={1000}
                    height={700}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-[11px] text-amber-100/80">
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Scarce @name inventory
                  </span>
                  <span className="rounded-full bg-black/70 px-3 py-1">
                    Flex today • Upside tomorrow
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
