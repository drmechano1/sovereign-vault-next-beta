// components/security/LayeredSecurityOverview.tsx
export default function LayeredSecurityOverview() {
  const layers = [
    {
      label: "Identity layer",
      title: "@name security",
      description:
        "Human-readable @names mapped to your wallets and chains. People send to the name, not raw addresses.",
    },
    {
      label: "Access layer",
      title: "NFC + biometric gate",
      description:
        "Your NFC card and mobile app work together with biometric checks to unlock the vault dashboard. The card is a trigger, the app is the gatekeeper.",
    },
    {
      label: "Transaction layer",
      title: "SafeSend guardrails",
      description:
        "Time-delayed transfers, guardian approvals, and AI checks before funds move.",
    },
    {
      label: "Intelligence layer",
      title: "AI risk engine",
      description:
        "Continuous scoring of wallets, contracts, and counterparties with live anomaly alerts.",
    },
    {
      label: "Asset layer",
      title: "Vault + RWA support",
      description:
        "Hardware-grade key security, a dedicated NFT vault, and rails designed to support RWAs as they come on-chain.",
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
