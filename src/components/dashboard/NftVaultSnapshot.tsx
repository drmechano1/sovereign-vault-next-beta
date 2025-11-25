// components/dashboard/NftVaultSnapshot.tsx
import Image from "next/image";

export default function NftVaultSnapshot() {
  return (
    <section className="rounded-2xl border border-white/5 bg-black/70 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">NFT vault</h2>
          <p className="mt-1 text-xs text-[#f3e2b4]/85">
            64 assets protected. Fort Knox level security.
          </p>
        </div>
        <div className="relative h-10 w-10">
          <Image
            src="/images/sections/vault-emblem-padlock.png"
            alt="Vault emblem"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-neutral-800"
          >
            <div className="flex h-full items-center justify-center text-xs text-[#f3e2b4]/50">
              NFT #{i}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl border border-white/15 py-2 text-xs text-[#f3e2b4]">
        View full vault
      </button>
    </section>
  );
}
