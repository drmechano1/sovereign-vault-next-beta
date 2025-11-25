// app/dashboard/page.tsx
import TopBar from "@/components/dashboard/TopBar";
import IdentityOverview from "@/components/dashboard/IdentityOverview";
import RiskOverview from "@/components/dashboard/RiskOverview";
import LinkedWallets from "@/components/dashboard/LinkedWallets";
import SafeSendQueue from "@/components/dashboard/SafeSendQueue";
import NftVaultSnapshot from "@/components/dashboard/NftVaultSnapshot";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0B0B11] to-[#0E0E18]">
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        <TopBar />
        
        <IdentityOverview />

        <div className="grid gap-6 md:grid-cols-2">
          <RiskOverview />
          <LinkedWallets />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SafeSendQueue />
          <NftVaultSnapshot />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
