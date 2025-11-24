import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Command Dashboard"
        title="Command Dashboard"
        subtitle="See your net worth, policies, guardians, pending SafeSend windows, and cross-chain flows in one view."
        videoSrc="/videos/dashboard-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Command Dashboard</strong> experience.
        </p>
      </section>
    </div>
  );
}
