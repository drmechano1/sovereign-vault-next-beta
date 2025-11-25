import Image from "next/image";

const features = [
  {
    title: "@Name System",
    icon: "/images/icons/name-icon.png",
    description:
      "One sovereign @name mapped to all your wallets and chains.",
  },
  {
    title: "NFT Vault Protection",
    icon: "/images/icons/nft-vault-icon.png",
    description:
      "Fort-Knox NFT storage with real security, not vibes.",
  },
  {
    title: "SafeSend",
    icon: "/images/icons/safesend-icon.png",
    description:
      "Delayed sends, guardian approvals, and AI checks before funds move.",
  },
  {
    title: "Cross-Chain Payments",
    icon: "/images/icons/crosschain-icon.png",
    description:
      "Send like a human. Settle like a machine, across chains.",
  },
];

export default function Level2CoreFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Core Vault Features
      </h2>
      <p className="mt-3 max-w-2xl text-sm md:text-base text-[#f3e2b4]/90">
        A hardware-grade vault for coins, NFTs, and your @name identity.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 backdrop-blur shadow-[0_0_45px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(245,210,122,0.6)] transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-11 w-11 rounded-2xl bg-black/50 p-2 ring-1 ring-yellow-400/40">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
            </div>
            <p className="mt-4 text-sm md:text-base text-[#f3e2b4]/90">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
