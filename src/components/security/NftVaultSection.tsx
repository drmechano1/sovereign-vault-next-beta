// components/security/NftVaultSection.tsx
import Image from "next/image";

export default function NftVaultSection() {
  return (
    <section className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Vault zone for your highest-value assets.
        </h2>
        <p className="mt-3 text-sm text-[#f3e2b4]/90">
          The vault is where your @name, large crypto balances, RWAs, and grail
          NFTs live under the most conservative policies we offer. SafeSend,
          guardians, and AI risk controls all converge here so that anything
          inside the vault is significantly harder to move, even if a day-to-day
          wallet is compromised.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[#f3e2b4]/90">
          <li>
            • Dedicated vault policies for high-value coins, NFTs, and
            real-world assets brought on-chain.
          </li>
          <li>
            • Your @name itself can be held in the vault for maximum protection,
            so the credential that controls your vault is also guarded by vault
            rules.
          </li>
          <li>
            • Vault-bound wallets are name-locked: the control check happens
            against the @name NFT, not just any address that happens to know a
            key.
          </li>
          <li>
            • Withdrawals and policy changes can be wrapped in SafeSend delays,
            guardian approvals, and AI checks.
          </li>
          <li>
            • Precise policy logic, upgrade mechanisms, and internal vault
            layouts are intentionally not published; they are documented for
            auditors, not for attackers.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-yellow-300/30 bg-black/80">
          <div className="relative h-40 w-full">
            <Image
              src="/images/sections/vault-nft-open.png"
              alt="Open digital vault with high-value assets"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-yellow-300/30 bg-black/80">
          <div className="relative h-36 w-full">
            <Image
              src="/images/sections/vault-emblem-padlock.png"
              alt="Golden vault emblem"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
