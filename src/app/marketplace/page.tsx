import { VideoHero } from '../../components/VideoHero';

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
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>@Name Marketplace</strong> experience.
        </p>
      </section>
    </div>
  );
}
