import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Guardians"
        title="Guardians"
        subtitle="Add, remove, and configure Guardians who can co-sign or recover your vault when you need them."
        videoSrc="/videos/guardians-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Guardians</strong> experience.
        </p>
      </section>
    </div>
  );
}
