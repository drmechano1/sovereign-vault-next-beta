'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AnimatedBackground() {
  const haloRef = useRef<HTMLDivElement | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!haloRef.current || !sweepRef.current) return;

    gsap.to(haloRef.current, {
      scale: 1.08,
      opacity: 0.9,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    gsap.to(sweepRef.current, {
      xPercent: 40,
      yPercent: -40,
      duration: 8,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={haloRef}
        className="glow-ring left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-70"
      />
      <div
        ref={sweepRef}
        className="absolute -left-1/2 top-0 h-full w-[140%] bg-gradient-to-tr from-transparent via-white/6 to-transparent"
      />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
