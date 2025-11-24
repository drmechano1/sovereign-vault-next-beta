import { VideoHero } from '@/components/VideoHero';

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
          Explain your SafeSend logic, timeout windows, and supported chains in a way normal humans can understand.
        </p>
      </section>
    </div>
  );
}
