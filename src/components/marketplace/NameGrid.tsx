// components/marketplace/NameGrid.tsx
const names = [
  {
    handle: "@vaulted",
    rarity: "Rare",
    floor: "9.50",
    chains: 4,
    trend: "+12%",
    featured: true,
  },
  {
    handle: "@dan.sov",
    rarity: "Legendary",
    floor: "14.2",
    chains: 5,
    trend: "+21%",
  },
  {
    handle: "@coldstorage",
    rarity: "Rare",
    floor: "7.8",
    chains: 3,
    trend: "+5%",
  },
  {
    handle: "@airdrop",
    rarity: "Common",
    floor: "1.2",
    chains: 2,
    trend: "+3%",
  },
  {
    handle: "@oracle",
    rarity: "Legendary",
    floor: "18.9",
    chains: 4,
    trend: "+32%",
  },
  {
    handle: "@safewhale",
    rarity: "Rare",
    floor: "6.4",
    chains: 3,
    trend: "+9%",
  },
];

export default function NameGrid() {
  return (
    <section className="rounded-2xl border border-white/5 bg-black/70 p-4 backdrop-blur">
      <div className="flex items-center justify-between px-1 pb-3">
        <h2 className="text-sm font-semibold text-white">@Name marketplace</h2>
        <span className="text-[11px] text-[#f3e2b4]/80">
          {names.length} featured handles
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {names.map((n) => (
          <article
            key={n.handle}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-black to-black px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-yellow-300/60 hover:shadow-[0_0_65px_rgba(245,210,122,0.6)] transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {n.handle}
                </h3>
                <span className="rounded-full border border-yellow-300/60 bg-yellow-300/20 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-yellow-100">
                  {n.rarity}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#f3e2b4]/85">
                <span>Floor</span>
                <span className="text-sm font-semibold text-white">
                  {n.floor}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-[#f3e2b4]/80">
                <span>{n.chains} chains linked</span>
                <span className="text-emerald-300">{n.trend}</span>
              </div>
            </div>

            <button className="mt-3 w-full rounded-2xl bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] py-2 text-xs font-semibold text-black shadow-[0_0_30px_rgba(245,210,122,0.7)] group-hover:shadow-[0_0_45px_rgba(245,210,122,0.9)]">
              Buy
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
