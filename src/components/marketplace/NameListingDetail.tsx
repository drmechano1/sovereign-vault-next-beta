// components/marketplace/NameListingDetail.tsx
import Image from "next/image";

export default function NameListingDetail() {
  return (
    <aside className="rounded-2xl border border-white/5 bg-black/75 p-5 backdrop-blur">
      <h2 className="text-sm font-semibold text-white">
        Selected name: <span className="text-[#f5d27a]">@vaulted</span>
      </h2>
      <p className="mt-2 text-xs text-[#f3e2b4]/90">
        Rare, short, and chain-agnostic. Ideal for vault products, custody, or a
        high-end crypto brand.
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-yellow-200/30 bg-black/70">
        <div className="relative h-52 w-full">
          <Image
            src="/images/sections/atname-card-vaulted.png"
            alt="@vaulted listing detail card"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#f3e2b4]/90">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[#f3e2b4]/70">
            Rarity
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white">Rare</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[#f3e2b4]/70">
            Floor
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white">9.50</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[#f3e2b4]/70">
            Chains supported
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white">BTC · ETH · SOL</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[#f3e2b4]/70">
            Verification
          </dt>
          <dd className="mt-1 text-sm font-semibold text-emerald-300">
            Eligible for social proof
          </dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-2 text-xs text-[#f3e2b4]/90">
        <li>• AI can verify ownership when the buyer posts a short social message.</li>
        <li>• SafeSend and the vault automatically map to the new owner.</li>
        <li>• Future: leasing and co-branded licensing rails for enterprises.</li>
      </ul>

      <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] py-2.5 text-xs font-semibold text-black shadow-[0_0_40px_rgba(245,210,122,0.7)]">
        Buy @vaulted
      </button>
    </aside>
  );
}
