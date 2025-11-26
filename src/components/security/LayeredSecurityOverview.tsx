// components/security/LayeredSecurityOverview.tsx
export default function LayeredSecurityOverview() {
  const layers = [
    {
      label: "Identity layer",
      title: "@name security",
      description:
        "Human-readable @names mapped to your wallets and chains. People send to the name, not raw addresses. The @name NFT lives inside the vault and its smart contract checks that the caller really owns that @name before it lets assets move.",
    },
    {
      label: "Access layer",
      title: "NFC + biometric gate",
      description:
        "An EAL6+ secure-element card and the mobile app work together as a front door. Keys are generated and stored on the card; they never leave or touch the internet. NFC taps trigger signing flows, but biometrics in the app are the gatekeeper for approvals.",
    },
    {
      label: "Transaction layer",
      title: "SafeSend guardrails",
      description:
        "Time-delayed transfers, guardian approvals, and AI checks before big moves settle. If risk spikes or something looks off, transfers are held in the SafeSend lane instead of going straight to chain.",
    },
    {
      label: "Intelligence layer",
      title: "AI risk engine",
      description:
        "Continuous scoring of wallets, contracts, routes, and counterparties. Anomaly alerts push suspicious flows into SafeSend so you can step in before funds move.",
    },
    {
      label: "Asset layer",
      title: "Vault + RWA support",
      description:
        "Hardware-grade key security with a dedicated vault for high-value assets: large crypto balances, RWAs, governance tokens, and premium NFTs. Guardian policies and recovery rules sit here, not on a public web wallet.",
    },
  ];

  return (
    <section className="mt-10 rounded-2xl border border-white/5 bg-black/75 p-5 backdrop-blur">
      <h2 className="text-sm font-semibold text-white">
        A layered security model for a full command center.
      </h2>
      <p className="mt-2 text-xs md:text-sm text-[#f3e2b4]/90">
        Sovereign Vault is built as an ultimate crypto command center: identity,
        access, transactions, intelligence, and assets all live in separate
        layers that reinforce each other. If one layer is attacked, the others
        still stand.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5 text-xs md:text-sm">
        {layers.map((layer) => (
          <div
            key={layer.title}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#f3e2b4]/70">
              {layer.label}
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              {layer.title}
            </div>
            <p className="mt-2 text-[11px] md:text-xs text-[#f3e2b4]/85">
              {layer.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
