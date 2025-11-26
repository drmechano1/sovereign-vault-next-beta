// app/pricing/page.tsx

export default function PricingPage() {
  const tiers = [
    {
      name: "Vault Kit",
      price: "$249",
      cadence: "one-time",
      tagline: "Your first step into a hardware-grade vault.",
      featured: false,
      highlight: "Includes hardware and your first @name so you can actually use the system.",
      features: [
        "1 EAL6+ NFC card with on-card key generation",
        "1 base @name with smart-contract vault protection included",
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
        "Discounts on additional premium @names",
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
            Pricing
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Simple pricing for serious wealth.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-[#f3e2b4]/90">
            One command center for your @names, NFC cards, SafeSend policies,
            and AI risk engine. Choose how deep into the vault you want to go.
          </p>
          <p className="mt-2 text-[11px] text-[#f3e2b4]/70">
            Pricing and features may evolve during early access.
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
              <h2 className="text-sm font-semibold text-white">
                {tier.name}
              </h2>
              <p className="mt-1 text-xs text-[#f3e2b4]/85">
                {tier.tagline}
              </p>

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

        {/* FAQ */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur">
          <h2 className="text-sm font-semibold text-white">Pricing FAQ</h2>
          <div className="mt-4 space-y-4 text-xs md:text-sm text-[#f3e2b4]/90">
            <div>
              <div className="font-semibold text-white">
                Are these prices final?
              </div>
              <p className="mt-1">
                No. During early access we reserve the right to adjust pricing
                and limits as we learn. Early users will be treated fairly if
                plans change.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">
                What&apos;s included in hardware?
              </div>
              <p className="mt-1">
                Plans that include hardware ship an NFC card with an EAL6+
                secure element. Keys are generated and stored on-card and are
                never exported to your phone or our servers.
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
