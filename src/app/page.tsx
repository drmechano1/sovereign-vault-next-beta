import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';

const coreFeatures = [
  {
    title: '@Name System',
    body: 'Claim your permanent @name once and route all wallets, chains, and contacts through a single human-readable identity.',
  },
  {
    title: 'NFT Vault Protection',
    body: 'Lock blue-chip NFTs behind multi-guardian approvals and SafeSend rules so a single mistake can’t cost everything.',
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
    <div className="space-y-16">
      <VideoHero
        badge="Level 1 – Core Access"
        title="Fort Knox for your digital identity & crypto wealth."
        subtitle="Sovereign Vault unifies your wallets, @name handle, guardians, and SafeSend protections into a single cinematic control center."
      >
        <Link
          href="/onboarding"
          className="rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-background shadow-gold-glow hover:bg-goldSoft transition-colors"
        >
          Enter Beta Vault
        </Link>
        <Link
          href="/security"
          className="rounded-full border border-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-gold hover:border-gold hover:bg-gold/5 transition-colors"
        >
          View 8-Layer Security
        </Link>
      </VideoHero>

      <section className="section-max">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Level 2 – Core Features
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
              Everything your current wallet should have shipped with.
            </h2>
          </div>
          <div className="hidden text-right text-xs text-foreground/60 sm:block">
            <p>Security Depth: 26%</p>
            <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-borderSoft">
              <div className="h-full w-[26%] bg-gradient-to-r from-gold to-accent" />
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {coreFeatures.map((f) => (
            <div
              key={f.title}
              className="relative overflow-hidden rounded-2xl border border-borderSoft bg-card/90 p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-gold/40 via-accent/30 to-transparent blur-2xl" />
              </div>
              <h3 className="relative text-sm font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="relative mt-2 text-xs text-foreground/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-max">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Level 3 – Premium Services
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
              Turn your crypto from vulnerable to sovereign.
            </h2>
          </div>
          <p className="max-w-md text-xs text-foreground/70">
            Standard is perfect for individuals securing their long-term stack.
            Business gives you up to 5 Guardians and advanced policies across
            teams, treasuries, and multisig groups.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-card to-black p-6 shadow-gold-glow">
            <h3 className="text-sm font-semibold text-gold">Standard</h3>
            <p className="mt-1 text-xs text-foreground/70">
              Up to <span className="font-semibold text-foreground">3 Guardians</span>,
              SafeSend, @name routing, and NFT Vault protection for your
              personal stack.
            </p>
            <p className="mt-4 text-3xl font-semibold text-foreground">$14</p>
            <p className="text-[0.7rem] text-foreground/60">per month</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-b from-card to-black p-6">
            <h3 className="text-sm font-semibold text-accent">Business</h3>
            <p className="mt-1 text-xs text-foreground/70">
              Up to <span className="font-semibold text-foreground">5 Guardians</span>,
              policy engine, team roles, and programmatic rules for desks,
              treasuries, and protocols.
            </p>
            <p className="mt-4 text-3xl font-semibold text-foreground">$49</p>
            <p className="text-[0.7rem] text-foreground/60">per month</p>
          </div>
        </div>
      </section>
    </div>
  );
}
