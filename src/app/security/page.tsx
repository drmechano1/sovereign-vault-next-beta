import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="8-Layer Security System"
        title="8-Layer Security System"
        subtitle="From hardware roots of trust to guardian-based approvals, every layer is designed to fail safe."
        videoSrc="/videos/security-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>8-Layer Security System</strong> experience.
        </p>
      </section>
    </div>
  );
}
