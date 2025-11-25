// app/marketplace/page.tsx
import MarketplaceTopSection from "@/components/marketplace/MarketplaceTopSection";
import NameFilters from "@/components/marketplace/NameFilters";
import NameGrid from "@/components/marketplace/NameGrid";
import NameListingDetail from "@/components/marketplace/NameListingDetail";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#050606] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 md:px-6 lg:px-8">
        <MarketplaceTopSection />
        <NameFilters />
        <div className="mt-8 grid gap-8 lg:grid-cols-[3fr,2fr]">
          <NameGrid />
          <NameListingDetail />
        </div>
      </div>
    </main>
  );
}
