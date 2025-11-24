'use client';

import { ReactNode, useRef } from 'react';
import { useFadeInOnScroll } from '@/lib/gsapClient';

interface VideoHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  videoSrc?: string;
  children?: ReactNode;
}

export function VideoHero({
  title,
  subtitle,
  badge,
  videoSrc = '/videos/hero.mp4',
  children,
}: VideoHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useFadeInOnScroll(ref);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-borderSoft/80 bg-gradient-to-b from-background to-black"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      </div>

      <div className="section-max relative z-10 flex min-h-[70vh] flex-col justify-center py-20">
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {badge}
          </div>
        )}
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-foreground/70 sm:text-base">
          {subtitle}
        </p>
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}
