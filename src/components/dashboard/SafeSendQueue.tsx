// components/dashboard/SafeSendQueue.tsx
import Image from "next/image";

const items = [
  {
    to: "@alice",
    amount: "8.0 ETH",
    status: "Guardian review",
    color: "amber",
  },
  {
    to: "@bob",
    amount: "0.5 BTC",
    status: "Delay window",
    color: "emerald",
  },
];

export default function SafeSendQueue() {
  return (
    <section className="rounded-2xl border border-white/5 bg-black/70 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">SafeSend queue</h2>
          <p className="mt-1 text-xs text-[#f3e2b4]/85">
            Pending transactions with reversible delay window.
          </p>
        </div>
        <div className="relative h-10 w-10">
          <Image
            src="/images/sections/safesend-emblem.png"
            alt="SafeSend emblem"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs"
          >
            <div>
              <div className="font-semibold text-white">
                Send to {item.to}
              </div>
              <div className="text-[11px] text-[#f3e2b4]/70">
                {item.amount}
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] ${
                item.color === "amber"
                  ? "bg-amber-500/20 text-amber-200"
                  : "bg-emerald-500/20 text-emerald-200"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
