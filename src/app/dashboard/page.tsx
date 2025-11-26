// app/dashboard/page.tsx
import Image from "next/image";
import ConnectWalletButton from "@/components/web3/ConnectWalletButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050606] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        {/* Page header */}
        <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-yellow-300/30 bg-yellow-300/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
              Vault dashboard
            </div>
            <h1 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              @sovereignvault command center.
            </h1>
            <p className="mt-2 max-w-xl text-xs md:text-sm text-[#f3e2b4]/90">
              One place to see your @name identity, linked wallets, SafeSend
              queue, and risk engine — across BTC, ETH, SOL, and L2s.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 text-[11px] md:text-xs">
            <ConnectWalletButton />
            <div className="flex gap-2">
              <div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                Overall score: <span className="font-semibold">AA+</span>
              </div>
              <div className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[#f3e2b4]/80">
                Early access · simulated data
              </div>
            </div>
          </div>
        </section>

        {/* Main layout */}
        <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
          {/* Left column: Identity + balances + activity */}
          <div className="space-y-6">
            {/* Identity panel */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
                    Sovereign identity
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white md:text-2xl">
                    @sovereignvault
                  </div>
                  <p className="mt-2 max-w-md text-xs md:text-sm text-[#f3e2b4]/90">
                    One handle mapped to all your wallets and chains. This is
                    the name people actually send to, not a 0x string.
                  </p>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-3 text-right text-[11px] md:text-xs">
                  <div>
                    <div className="text-[#f3e2b4]/70">Total value secured</div>
                    <div className="text-lg font-semibold text-white">
                      $1,324,200
                    </div>
                  </div>
                  <div>
                    <div className="text-[#f3e2b4]/70">Chains linked</div>
                    <div className="text-lg font-semibold text-white">5</div>
                  </div>
                  <div>
                    <div className="text-[#f3e2b4]/70">Wallets linked</div>
                    <div className="text-lg font-semibold text-white">9</div>
                  </div>
                  <div>
                    <div className="text-[#f3e2b4]/70">NFTs protected</div>
                    <div className="text-lg font-semibold text-white">64</div>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full rounded-full bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_40px_rgba(245,210,122,0.9)] hover:shadow-[0_0_55px_rgba(245,210,122,1)]">
                View full vault
              </button>
            </div>

            {/* Primary balance snapshot */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
                    Primary balance
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    32.4 BTC
                  </div>
                  <p className="mt-1 text-[11px] text-[#f3e2b4]/80">
                    Spread across BTC, ETH, SOL and L2s, normalized to BTC
                    equivalent.
                  </p>
                </div>
                <div className="hidden h-20 w-32 md:block">
                  {/* Mini placeholder sparkline area */}
                  <div className="h-full w-full rounded-xl bg-gradient-to-tr from-yellow-300/20 via-emerald-400/10 to-cyan-400/20" />
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
                  Recent activity
                </div>
                <div className="text-[11px] text-[#f3e2b4]/75">
                  Simulated for preview
                </div>
              </div>
              <div className="mt-3 space-y-2 text-xs text-[#f3e2b4]/90">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <div className="font-semibold text-white">
                      SafeSend scheduled
                    </div>
                    <div className="text-[11px]">
                      1.2 BTC to @dan.sov — reversible for 30 minutes.
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#f3e2b4]/75">
                    2 min ago
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <div className="font-semibold text-white">
                      New guardian added
                    </div>
                    <div className="text-[11px]">
                      @vaultguardian added as recovery contact.
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#f3e2b4]/75">
                    1 hr ago
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">
                      Risk alert cleared
                    </div>
                    <div className="text-[11px]">
                      Contract exposure on DeFi position reviewed and
                      acknowledged.
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#f3e2b4]/75">
                    3 hrs ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: visual dashboard + SafeSend + risk engine */}
          <div className="space-y-6">
            {/* Visual dashboard mock */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/90">
              <div className="absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(245,210,122,0.45)_0,_transparent_55%)] opacity-70" />
              <div className="relative h-56 w-full">
                <Image
                  src="/images/sections/cosmic-safesend-card-design.png"
                  alt="Unified Sovereign Vault dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* SafeSend status */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
                  SafeSend
                </div>
                <div className="text-[11px] text-[#f3e2b4]/80">
                  1 transfer in delay window
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr,1fr]">
                <div className="rounded-xl border border-white/10 bg-black/80 p-3 text-[11px] text-[#f3e2b4]/90">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      1.2 BTC → @dan.sov
                    </span>
                    <span className="rounded-full bg-yellow-300/20 px-2 py-0.5 text-[10px] font-semibold text-[#fbe6a4]">
                      27 min left
                    </span>
                  </div>
                  <p className="mt-2">
                    In SafeSend delay window. Cancel or let it proceed. Guardians
                    will be notified if risk score changes.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-full border border-white/30 px-3 py-1.5 text-[11px] font-semibold text-[#f3e2b4]/90 hover:border-red-400 hover:text-red-200">
                      Cancel send
                    </button>
                    <button className="flex-1 rounded-full border border-yellow-300/70 bg-yellow-300/20 px-3 py-1.5 text-[11px] font-semibold text-[#fbe6a4] hover:bg-yellow-300/30">
                      Let it proceed
                    </button>
                  </div>
                </div>

                <div className="relative h-28 w-full overflow-hidden rounded-xl border border-yellow-300/40 bg-black/90">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/sections/safesend-delay-window.png"
                      alt="SafeSend delay window visual"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Risk engine */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
                  AI risk engine
                </div>
                <div className="text-[11px] text-emerald-300">
                  Overall score: <span className="font-semibold">AA+</span>
                </div>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr,1fr]">
                <div className="space-y-2 text-[11px] text-[#f3e2b4]/90">
                  <p>
                    Continuous scoring on every wallet, counterparty, contract,
                    and route touching your vault.
                  </p>
                  <p>
                    High-risk routes are automatically flagged into the
                    SafeSend flow, where delays and guardian approvals can stop
                    a bad transfer before it settles.
                  </p>
                  <p className="text-[10px] text-[#f3e2b4]/70">
                    Scores and alerts shown here are simulated. Real scores will
                    be generated by the live engine once connected.
                  </p>
                </div>
                <div className="relative h-28 w-full overflow-hidden rounded-xl border border-white/15 bg-black/90">
                  <Image
                    src="/images/sections/safesend-emblem.png"
                    alt="AI risk engine dashboard preview with AA+ rating and alerts"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
