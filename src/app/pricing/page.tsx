import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Pricing & Plans"
        title="Pricing & Plans"
        subtitle="Choose the access level that matches how much value you’re protecting and how many Guardians you need."
        videoSrc="/videos/pricing-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Pricing & Plans</strong> experience.
        </p>
      </section>
    </div>
  );
}
