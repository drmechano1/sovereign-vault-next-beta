// components/marketplace/MarketplaceTopSection.tsx
import Image from "next/image";

export default function MarketplaceTopSection() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Own the flex. Own the name.
          <span className="block text-[#f5d27a]">Own the upside.</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm md:text-base text-[#f3e2b4]/90">
          Premium @names are scarce digital real estate. Claim the ones that
          matter before they become someone else's brand, identity, or signal.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[#f3e2b4]/90">
          <li>• AI-ranked handles based on culture, relevance, and demand.</li>
          <li>• Social proof verification flow for celebs and enterprises.</li>
          <li>• Built-in rails for SafeSend and the vault from day one.</li>
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-yellow-300/25 via-purple-500/20 to-cyan-400/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-yellow-200/30 bg-black/70 backdrop-blur">
          <div className="relative h-64 w-full">
            <Image
              src="/images/sections/atname-card-vaulted.png"
              alt="@vaulted listing preview card"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
