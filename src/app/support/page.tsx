import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Support"
        title="Support"
        subtitle="Get help, report an issue, or request access to private beta features."
        videoSrc="/videos/support-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Support</strong> experience.
        </p>
      </section>
    </div>
  );
}
