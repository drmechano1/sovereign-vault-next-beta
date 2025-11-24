import { VideoHero } from '@/components/VideoHero';

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
          Use this page to show connected wallets, balances, chain support, and routing rules for your @name.
        </p>
      </section>
    </div>
  );
}
