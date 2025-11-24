import { VideoHero } from '@/components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Legal & Privacy"
        title="Legal & Privacy"
        subtitle="Terms of use, disclosures, jurisdiction, and how we think about your data and sovereignty."
        videoSrc="/videos/legal-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          Drop in your real terms, risk disclosures, and privacy posture here.
        </p>
      </section>
    </div>
  );
}
