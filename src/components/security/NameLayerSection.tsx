// components/security/NameLayerSection.tsx

export default function NameLayerSection() {
  return (
    <section className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          The @name layer: security you can actually read.
        </h2>
        <p className="mt-3 text-sm text-[#f3e2b4]/90">
          Sovereign Vault turns your fragmented wallet stack into a single,
          sovereign @name. Instead of sharing raw addresses, you share a handle
          that can route to multiple chains and wallets behind the scenes.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[#f3e2b4]/90">
          <li>• Map BTC, ETH, SOL and more into one @name.</li>
          <li>
            • Your @name lives on-chain as a scarce NFT. The vault checks that
            the address trying to move assets also owns the @name NFT. If it
            doesn&apos;t, the @name contract simply won&apos;t allow the
            transfer.
          </li>
          <li>
            • AI helps verify that a public persona really controls an @name,
            using social proof and external signals.
          </li>
          <li>
            • If you rotate wallets, your @name stays the same. People always
            send to the right place, even as the underlying routing changes.
          </li>
          <li>
            • Exact registry structure, guardian rules, and contract wiring are
            kept internal to reduce the attack surface; auditors and partners
            get deeper documentation under NDA, not on a public web page.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/80 p-4 text-xs text-[#f3e2b4]/85">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#f3e2b4]/70">
          IP & trade secrets
        </div>
        <p className="mt-2">
          We intentionally omit details like how the @name registry is
          implemented, how often mappings rotate, and exactly how the vault
          enforces @name-based controls. Attackers can&apos;t exploit what they
          can&apos;t see; auditors and partners receive deeper documentation
          under NDA.
        </p>
      </div>
    </section>
  );
}
