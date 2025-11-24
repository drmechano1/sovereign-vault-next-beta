import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="SafeSend"
        title="SafeSend"
        subtitle="Preview, delay, and reverse eligible transactions before they finalize across chains."
        videoSrc="/videos/safesend-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>SafeSend</strong> experience.
        </p>
      </section>
    </div>
  );
}
