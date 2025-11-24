import { VideoHero } from '@/components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="@Name Marketplace"
        title="@Name Marketplace"
        subtitle="Search, claim, and trade high-signal @names with built-in routing to your Sovereign Vault."
        videoSrc="/videos/marketplace-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the Sovereign Vault layout. Replace this copy with final marketplace UI for discovery, claiming, and trading of @names plugged directly into your contracts and APIs.
        </p>
      </section>
    </div>
  );
}
