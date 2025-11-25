import Image from "next/image";

export default function Level6NameMarketplace() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: @Name Card Image */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40">
            <Image
              src="/images/sections/atname-card-vaulted.png"
              alt="@vaulted listing card - RARE premium @name"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-[#f3e2b4]">
            Premium @name Listing
          </p>
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Own the flex. Own the name.
            <br />
            <span className="text-[#DAA520]">Own the upside.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#f3e2b4]/90">
            Premium @names are scarce digital real estate. Buy, sell, and trade @names
            in the marketplace. AI-ranked rarity. Verified ownership.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                AI-powered rarity scoring for every @name
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Instant verification and transfer
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Floor prices, trending names, and market analytics
              </span>
            </li>
          </ul>

          {/* Supporting Emblems */}
          <div className="mt-8 flex items-center gap-6">
            <div className="relative h-16 w-16 opacity-60 hover:opacity-100 transition-opacity">
              <Image
                src="/images/sections/vault-emblem-padlock.png"
                alt="Vault Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-16 w-16 opacity-60 hover:opacity-100 transition-opacity">
              <Image
                src="/images/sections/safesend-emblem.png"
                alt="SafeSend Emblem"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
