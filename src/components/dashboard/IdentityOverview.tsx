// components/dashboard/IdentityOverview.tsx
import Image from "next/image";

export default function IdentityOverview() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-black/70 p-5 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="/images/sections/dashboard-sovereign-vault.png"
          alt="Sovereign Vault dashboard accent"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#f3e2b4]/80">
            Sovereign identity
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
            @sovereignvault
          </h1>
          <p className="mt-2 text-xs md:text-sm text-[#f3e2b4]/90">
            One handle mapped to all your wallets and chains. This is the name
            people actually send to.
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <dt className="text-[#f3e2b4]/70">Total value secured</dt>
              <dd className="mt-1 text-lg font-semibold text-white">
                $1,324,200
              </dd>
            </div>
            <div>
              <dt className="text-[#f3e2b4]/70">Chains linked</dt>
              <dd className="mt-1 text-lg font-semibold text-white">5</dd>
            </div>
            <div>
              <dt className="text-[#f3e2b4]/70">Wallets linked</dt>
              <dd className="mt-1 text-lg font-semibold text-white">9</dd>
            </div>
            <div>
              <dt className="text-[#f3e2b4]/70">NFTs protected</dt>
              <dd className="mt-1 text-lg font-semibold text-white">64</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-between gap-4 md:w-52">
          <div className="rounded-2xl border border-yellow-300/30 bg-black/70 p-4 text-xs text-[#f3e2b4]/90">
            <div className="text-[11px] uppercase tracking-[0.2em] text-yellow-300/80">
              Primary balance
            </div>
            <div className="mt-2 text-xl font-semibold text-white">
              32.4 BTC
            </div>
            <div className="mt-1 text-[11px] text-[#f3e2b4]/70">
              Across BTC, ETH, SOL and L2s
            </div>
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_40px_rgba(245,210,122,0.7)]">
            View full vault
          </button>
        </div>
      </div>
    </section>
  );
}
