import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Onboarding"
        title="Onboarding"
        subtitle="Step-by-step flow to connect wallets, claim your @name, add Guardians, and enable SafeSend."
        videoSrc="/videos/onboarding-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Onboarding</strong> experience.
        </p>
      </section>
    </div>
  );
}
