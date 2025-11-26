// app/security/page.tsx
import LayeredSecurityOverview from "@/components/security/LayeredSecurityOverview";
import NameLayerSection from "@/components/security/NameLayerSection";
import KeyManagementSection from "@/components/security/KeyManagementSection";
import NftVaultSection from "@/components/security/NftVaultSection";

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#050606] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <section className="py-12 text-center">
          <div className="inline-block rounded-full border border-[#f3e2b4]/30 bg-[#f3e2b4]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#f3e2b4]">
            8-Layer Security System
          </div>
          <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Fort Knox for your digital wealth.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#f3e2b4]/90">
            From hardware roots of trust to guardian-based approvals, every layer is
            designed to fail safe.
          </p>
        </section>
        
        <LayeredSecurityOverview />
        <NameLayerSection />
        <KeyManagementSection />
        <NftVaultSection />
      </div>
    </main>
  );
}
