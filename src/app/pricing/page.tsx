import { VideoHero } from '@/components/VideoHero';

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
          Map your Standard and Business tiers here, including limits, support, and roadmap access.
        </p>
      </section>
    </div>
  );
}
