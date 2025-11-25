// components/dashboard/LinkedWallets.tsx
const rows = [
  {
    label: "ColdVault BTC",
    chain: "BTC",
    last4: "x...9kf2",
    value: "$932,000",
    risk: "AA",
  },
  {
    label: "Primary ETH",
    chain: "ETH",
    last4: "0x...e4b1",
    value: "$241,200",
    risk: "AA-",
  },
  {
    label: "Trading SOL",
    chain: "SOL",
    last4: "So...7j3n",
    value: "$83,400",
    risk: "A",
  },
];

export default function LinkedWallets() {
  return (
    <section className="rounded-2xl border border-white/5 bg-black/70 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-white">Linked wallets</h2>
        <button className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#f3e2b4]">
          Manage
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/60">
        <table className="w-full border-collapse text-xs">
          <thead className="bg-white/[0.03] text-[#f3e2b4]/80">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Wallet</th>
              <th className="px-3 py-2 text-left font-medium">Chain</th>
              <th className="px-3 py-2 text-left font-medium">Address</th>
              <th className="px-3 py-2 text-right font-medium">Value</th>
              <th className="px-3 py-2 text-right font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={i % 2 ? "bg-white/[0.02]" : undefined}
              >
                <td className="px-3 py-2 text-sm text-neutral-50">
                  {row.label}
                </td>
                <td className="px-3 py-2 text-[11px] text-[#f3e2b4]/85">
                  {row.chain}
                </td>
                <td className="px-3 py-2 text-[11px] text-[#f3e2b4]/70">
                  {row.last4}
                </td>
                <td className="px-3 py-2 text-right text-sm text-neutral-50">
                  {row.value}
                </td>
                <td className="px-3 py-2 text-right text-[11px]">
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-200">
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
