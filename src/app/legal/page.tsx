import { VideoHero } from '../../components/VideoHero';

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
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Legal & Privacy</strong> experience.
        </p>
      </section>
    </div>
  );
}
