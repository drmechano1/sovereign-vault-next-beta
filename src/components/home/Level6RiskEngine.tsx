import Image from "next/image";

export default function Level6RiskEngine() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            AI watching your back 24/7
            <br />
            <span className="text-[#DAA520]">so you don't get rugged.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#f3e2b4]/90">
            Our AI risk engine monitors every transaction, wallet interaction, and contract call
            in real-time. Get alerts before you lose funds.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Real-time risk scores for every transaction
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Anomaly detection for suspicious wallet activity
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DAA520] text-xl">✓</span>
              <span className="text-sm md:text-base text-[#f3e2b4]/90">
                Exportable reports for compliance and audits
              </span>
            </li>
          </ul>

          {/* Alert Card */}
          <div className="mt-8 rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 p-4 backdrop-blur">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-2xl">⚠</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Anomaly Detected</h4>
                <p className="mt-1 text-xs text-[#f3e2b4]/80">
                  Unusual transaction pattern detected on your ETH wallet. Review recommended.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dashboard Image */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 backdrop-blur overflow-hidden">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
            <Image
              src="/images/sections/dashboard-sovereign-vault.png"
              alt="Sovereign Vault AI Risk Dashboard"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
