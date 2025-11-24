import { VideoHero } from '@/components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Sovereign AI Assistant"
        title="Sovereign AI Assistant"
        subtitle="An embedded AI that understands your wallets, policies, and positions—without ever holding your keys."
        videoSrc="/videos/ai-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          Use this to position AI as an analyst and co-pilot, not a custodian.
        </p>
      </section>
    </div>
  );
}
