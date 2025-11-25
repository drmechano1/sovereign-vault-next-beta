// components/dashboard/ActivityTimeline.tsx
const events = [
  {
    label: "SafeSend initiated",
    time: "2 min ago",
    detail: "8.0 ETH → @alice",
  },
  {
    label: "Wallet linked",
    time: "1 hour ago",
    detail: "Trading SOL (So...7j3n)",
  },
  {
    label: "NFT vaulted",
    time: "3 hours ago",
    detail: "Bored Ape #4821",
  },
  {
    label: "Risk scan complete",
    time: "5 hours ago",
    detail: "Overall score: AA+",
  },
];

export default function ActivityTimeline() {
  return (
    <section className="rounded-2xl border border-white/5 bg-black/70 p-5 backdrop-blur">
      <h2 className="text-sm font-semibold text-white">Recent activity</h2>

      <div className="mt-4 space-y-3">
        {events.map((event, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-xs"
          >
            <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-300" />
            <div className="flex-1">
              <div className="font-semibold text-white">{event.label}</div>
              <div className="text-[11px] text-[#f3e2b4]/70">
                {event.detail}
              </div>
            </div>
            <div className="text-[11px] text-[#f3e2b4]/60">{event.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
