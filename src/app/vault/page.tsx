import { VideoHero } from '@/components/VideoHero';

export default function Page() {
  return (
    <div className="space-y-12">
      <VideoHero
        badge="NFT & Asset Vault"
        title="NFT & Asset Vault"
        subtitle="Lock down high-value assets behind guardians, SafeSend, and hardware-backed approvals."
        videoSrc="/videos/vault-hero.mp4"
      />
      <section className="section-max pb-12 text-sm text-foreground/70">
        <p>
          This is where you’ll visualize locked assets, vault policies, and guardian requirements.
        </p>
      </section>
    </div>
  );
}
