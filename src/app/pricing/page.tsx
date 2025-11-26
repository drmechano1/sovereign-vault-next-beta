// app/pricing/page.tsx

export default function PricingPage() {
  const tiers = [
    {
      name: "Vault Kit",
      price: "$249",
      cadence: "one-time",
      tagline: "Your first step into a hardware-grade vault.",
      featured: false,
      highlight:
        "Includes hardware and your first @name so you can actually use the system.",
      features: [
        "1 EAL6+ NFC card with on-card key generation",
        "Early access: claim 1 @name with vault protection included (just pay network gas to mint)",
        "Basic SafeSend delays on outbound transfers",
        "AI risk scores on counterparties inside the dashboard",
        "Access to the Sovereign Vault mobile app with biometric gate",
      ],
    },
    {
      name: "Command Center",
      price: "$29",
      cadence: "per month",
      tagline: "Full-stack control for serious holders.",
      featured: true,
      highlight: "Recommended once you move real size into the vault.",
      features: [
        "Up to 5 @names with vault-level enforcement",
        "2 NFC cards + multi-device access with biometrics",
        "Advanced SafeSend policies & guardian approvals",
        "AI risk engine with real-time alerts and reports",
        "Priority support and onboarding call",
        "Discounts on additional premium @names during early access",
      ],
    },
    {
      name: "Vault Institutional",
      price: "Talk to us",
      cadence: "",
      tagline: "Custom policies, controls, and reporting for teams.",
      featured: false,
      highlight: "For funds, family offices, and enterprises.",
      features: [
        "Custom @name and vault policy architectures",
        "Multi-user access controls and approval workflows",
        "Compliance-aware reporting and export options",
        "Dedicated account manager and SLA",
        "Bespoke integrations and documentation under NDA",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#050606] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center rounded-full border border-yellow-300/30 bg-yellow-300/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[#f5d27a]/90">
            Early access pricing
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Simple pricing for serious wealth.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-[#f3e2b4]/90">
            Start with a hardware-grade vault kit, then upgrade to a full
            command center when you&apos;re ready. Your basic Sovereign Wallet
            stays free for life.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-[11px] text-[#f3e2b4]/75">
            During early access, you can claim one @name at a deep discount
            (gas-only mint). After mainnet and our shard upgrade, all new
            @names will be bought and traded through the marketplace at standard
            pricing.
          </p>
        </section>

        {/* Tiers */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={[
                "relative flex flex-col rounded-2xl border bg-black/80 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.75)]",
                tier.featured
                  ? "border-yellow-300/70 shadow-[0_0_70px_rgba(245,210,122,0.8)]"
                  : "border-white/10",
              ].join(" ")}
            >
              {tier.featured && (
                <div className="absolute -top-3 right-4 rounded-full border border-yellow-300/60 bg-yellow-300/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-100">
                  Recommended
                </div>
              )}
              <h2 className="text-sm font-semibold text-white">{tier.name}</h2>
              <p className="mt-1 text-xs text-[#f3e2b4]/85">{tier.tagline}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-white">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span className="text-xs text-[#f3e2b4]/80">
                    {tier.cadence}
                  </span>
                )}
              </div>
              {tier.highlight && (
                <p className="mt-2 text-xs text-[#f3e2b4]/85">
                  {tier.highlight}
                </p>
              )}

              <ul className="mt-4 flex-1 space-y-2 text-xs text-[#f3e2b4]/90">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#f7de8a] to-[#d5a43e]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={[
                  "mt-5 w-full rounded-full px-4 py-2 text-xs font-semibold transition",
                  tier.featured
                    ? "bg-gradient-to-r from-[#f7de8a] via-[#f1c867] to-[#d5a43e] text-black shadow-[0_0_35px_rgba(245,210,122,0.9)]"
                    : "border border-white/20 text-[#f3e2b4]/90 hover:border-yellow-300/70 hover:text-yellow-100",
                ].join(" ")}
              >
                Request invite
              </button>
            </article>
          ))}
        </section>

        {/* Free basic wallet blurb */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-black/80 p-5 text-center backdrop-blur">
          <h2 className="text-sm font-semibold text-white">
            Basic Sovereign Wallet — free for life.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs md:text-sm text-[#f3e2b4]/90">
            Connect a Web3 wallet, see your balances in one place, and use
            basic SafeSend protections without a monthly fee. You only pay for
            hardware, advanced command center features, and premium @names.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur">
          <h2 className="text-sm font-semibold text-white">Pricing FAQ</h2>
          <div className="mt-4 space-y-4 text-xs md:text-sm text-[#f3e2b4]/90">
            <div>
              <div className="font-semibold text-white">
                What is the early access offer?
              </div>
              <p className="mt-1">
                During early access, you can claim one @name at a deep discount.
                You pay network gas to mint it with your Web3 wallet, but we
                waive the name&apos;s standard marketplace price. After
                mainnet and our shard upgrade, all new @names will be bought or
                traded through the marketplace at standard pricing.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">
                Is the basic wallet really free for life?
              </div>
              <p className="mt-1">
                Yes. The basic Sovereign Wallet is free for life for early
                users. You can connect a wallet, see your positions, and use
                basic protections without a subscription. Command Center plans
                and premium @names are optional upgrades.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">
                I&apos;m a fund or an institution. Where do we fit?
              </div>
              <p className="mt-1">
                The Institutional tier is designed for teams that need custom
                policies, reporting, and onboarding under NDA. Use the contact
                options in the app or on the site to start that conversation.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-[#f3e2b4]/70">
            Details of the security architecture, contracts, and policies are
            intentionally simplified here. Full technical documentation is
            available for auditors and partners under NDA.
          </p>
        </section>
      </div>
    </main>
  );
}
