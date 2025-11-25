// components/marketplace/NameFilters.tsx
export default function NameFilters() {
  return (
    <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/70 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <label className="block text-[11px] uppercase tracking-[0.2em] text-[#f3e2b4]/70">
          Search
        </label>
        <input
          type="text"
          placeholder="Search @names…"
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-yellow-300/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#f3e2b4]/70">
            Rarity
          </span>
          <button className="rounded-full border border-yellow-300/60 bg-yellow-300/20 px-3 py-1 text-[11px] text-yellow-100">
            All
          </button>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            Common
          </button>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            Rare
          </button>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            Legendary
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#f3e2b4]/70">
            Sort
          </span>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            Floor price
          </button>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            Trending
          </button>
          <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]/90">
            New
          </button>
        </div>
      </div>
    </section>
  );
}
