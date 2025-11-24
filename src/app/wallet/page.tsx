import { VideoHero } from '../../components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="Unified Wallet"
        title="Unified Wallet"
        subtitle="Connect your existing wallets and let Sovereign Vault sit in front of them as a secure, policy-aware shield."
        videoSrc="/videos/wallet-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This page is wired into the premium Sovereign Vault layout. Replace this copy with
          your final product UI, logic, and content for the <strong>Unified Wallet</strong> experience.
        </p>
      </section>
    </div>
  );
}
