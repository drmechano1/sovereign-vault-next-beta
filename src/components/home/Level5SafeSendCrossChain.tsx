import Image from "next/image";

export default function Level5SafeSendCrossChain() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        Send like a human. Settle like a machine.
        <br />
        <span className="text-[#DAA520]">Cross-chain by design.</span>
      </h2>
      <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-[#f3e2b4]/90 mb-12">
        SafeSend gives you a delay window and guardian approvals. Cross-chain payments let you send across any blockchain.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: SafeSend */}
        <div className="space-y-6">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/sections/mobile-safesend-send.png"
                alt="SafeSend Mobile - Guarded transfer UI"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#f3e2b4]">
              Guarded Transfer
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/sections/safesend-delay-window.png"
                alt="SafeSend Delay Window - 30-minute confirmation"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#f3e2b4]">
              Delay Confirmation
            </p>
          </div>

          <div className="pl-4 border-l-2 border-[#DAA520]/30">
            <h3 className="text-lg font-semibold text-white mb-2">SafeSend Features</h3>
            <ul className="space-y-2 text-sm text-[#f3e2b4]/90">
              <li>• Reversible delay window (30 min - 24 hrs)</li>
              <li>• Guardian approval for large sends</li>
              <li>• AI-powered risk checks before funds move</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Cross-Chain */}
        <div className="space-y-6">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
              <Image
                src="/images/sections/secure-hardware-wallet.png"
                alt="Secure Hardware Wallet - Cross-chain custody"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#f3e2b4]">
              Cross-Chain Security
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-sm text-[#f3e2b4]/90">
              Seamless cross-chain transfers across Bitcoin, Ethereum, Solana, and more.
              Send to any @name, any chain.
            </p>
          </div>

          <div className="pl-4 border-l-2 border-[#DAA520]/30">
            <h3 className="text-lg font-semibold text-white mb-2">Cross-Chain Features</h3>
            <ul className="space-y-2 text-sm text-[#f3e2b4]/90">
              <li>• Universal @name addressing</li>
              <li>• Atomic swaps and bridges</li>
              <li>• Hardware-grade security across chains</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
