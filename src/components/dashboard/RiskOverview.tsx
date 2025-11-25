// components/dashboard/RiskOverview.tsx
export default function RiskOverview() {
  return (
    <section className="rounded-2xl border border-yellow-300/25 bg-black/70 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            AI Risk Engine
          </h2>
          <p className="mt-1 text-xs text-[#f3e2b4]/85">
            Live scoring on every wallet, counterparty, and contract.
          </p>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#f3e2b4]/70">
            Overall score
          </span>
          <span className="mt-1 text-2xl font-bold text-emerald-300">
            AA+
          </span>
          <span className="mt-1 text-[11px] text-emerald-200/80">
            Low systemic risk
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-xs text-[#f3e2b4]/90">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
          <div>
            <div className="font-semibold text-white">
              New contract interaction
            </div>
            <div className="text-[11px] text-[#f3e2b4]/70">
              Unseen DeFi contract on ETH. Score: B.
            </div>
          </div>
          <button className="rounded-full border border-yellow-300/50 px-3 py-1 text-[11px] text-yellow-200">
            Review
          </button>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
          <div>
            <div className="font-semibold text-white">
              Guardian approval triggered
            </div>
            <div className="text-[11px] text-[#f3e2b4]/70">
              8.0 ETH SafeSend queued for guardian check.
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
            In review
          </span>
        </div>
      </div>
    </section>
  );
}
