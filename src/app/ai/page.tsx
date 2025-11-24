import { VideoHero } from '../../components/VideoHero';

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
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Sovereign AI Assistant</strong> experience.
        </p>
      </section>
    </div>
  );
}
