import PremiumHero from '../components/PremiumHero';

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
    </div>
  );
}
