import Hero from "@/components/home/Hero";
import Level2CoreFeatures from "@/components/home/Level2CoreFeatures";
import Level3LiveProduct from "@/components/home/Level3LiveProduct";
import Level4NameIdentity from "@/components/home/Level4NameIdentity";
import Level5SafeSendCrossChain from "@/components/home/Level5SafeSendCrossChain";
import Level6RiskEngine from "@/components/home/Level6RiskEngine";
import Level6NameMarketplace from "@/components/home/Level6NameMarketplace";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050606] text-neutral-100">
      <Hero />
      <Level2CoreFeatures />
      <Level3LiveProduct />
      <Level4NameIdentity />
      <Level5SafeSendCrossChain />
      <Level6RiskEngine />
      <Level6NameMarketplace />
    </main>
  );
}
