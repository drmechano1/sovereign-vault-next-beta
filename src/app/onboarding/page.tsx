import { VideoHero } from '@/components/VideoHero';

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
          You can later replace this with a multi-step React flow for first-time users.
        </p>
      </section>
    </div>
  );
}
