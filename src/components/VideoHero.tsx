'use client';

import { ReactNode, useRef } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { useFadeInOnScroll } from '../lib/gsapClient';

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useFadeInOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
      </div>

      <AnimatedBackground />

      <div className="section-max relative z-10 flex min-h-[70vh] flex-col justify-center py-20">
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold shadow-gold-glow/30">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-gold-glow" />
            {badge}
          </div>
        )}

        <div className="max-w-3xl space-y-4">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm text-foreground/75 sm:text-base">
            {subtitle}
          </p>
        </div>

        {children && (
          <div className="mt-10 flex flex-wrap gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
