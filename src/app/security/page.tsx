import { VideoHero } from '@/components/VideoHero';

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
          Use this page to break down your layered security design in a way that builds user and investor confidence.
        </p>
      </section>
    </div>
  );
}
