import Image from "next/image";

export default function Level4NameIdentity() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            One handle. All wallets. All chains.
            <br />
            <span className="text-[#DAA520]">Your sovereign identity.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#f3e2b4]/90">
            Your @name is your universal identity across Bitcoin, Ethereum, Solana, and beyond.
            No more copying 0x addresses. No more mistakes.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Map BTC, ETH, SOL, and all your wallets to one @name
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                AI verification ensures your @name is truly yours
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Send and receive like a human, not a machine
              </span>
            </li>
          </ul>
        </div>

        {/* Right: Dashboard Image */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
            <Image
              src="/images/sections/dashboard-sovereign-vault.png"
              alt="Sovereign Vault Dashboard showing profile and linked wallets"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
