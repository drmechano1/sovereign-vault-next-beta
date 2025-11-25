import Image from "next/image";

const products = [
  {
    image: "/images/sections/dashboard-sovereign-vault.png",
    alt: "Sovereign Vault Dashboard - Profile, linked wallets, and balances",
    caption: "Your Command Center",
  },
  {
    image: "/images/sections/card-sovereign-vault.png",
    alt: "Sovereign Vault Premium Card - Black & gold payment card",
    caption: "Elite Access Card",
  },
  {
    image: "/images/sections/vault-nft-open.png",
    alt: "NFT Vault - Fort Knox protection for digital assets",
    caption: "Fort Knox NFT Vault",
  },
  {
    image: "/images/sections/mobile-safesend-send.png",
    alt: "SafeSend Mobile - Secure transaction with delay window",
    caption: "SafeSend in Action",
  },
];

export default function Level3LiveProduct() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        Live Product View
      </h2>
      <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-[#f3e2b4]/90 mb-12">
        See the vault in action. Real interfaces, real security, real peace of mind.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden hover:border-[#DAA520]/30 transition-all"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#f3e2b4]">
              {product.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
