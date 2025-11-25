"use client";

export default function PremiumHero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero/sv-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/hero/sv-hero-frame.jpg"
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* Optional: second subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-black/40 mix-blend-multiply" />

      {/* Deep bottom fade for seamless transition */}
      <div className="absolute bottom-0 h-64 w-full bg-gradient-to-b from-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
        {/* Brand mark */}
        <div className="flex items-center gap-3">
          {/* If you have an SV logo asset, swap this span for <Image /> */}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-lg font-bold">
            SV
          </span>
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80">
              Sovereign Vault • Elite Security
            </p>
            <p className="text-xs text-amber-200/70">
              Hardware-grade protection for digital wealth
            </p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-tight text-amber-50 md:text-5xl">
          The Elite Crypto Vault for People Who Refuse to Get Rugged.
        </h1>

        {/* Subcopy */}
        <p className="max-w-2xl text-balance text-sm text-amber-100/80 md:text-base">
          Sovereign Vault locks your entire crypto life behind obscene security,
          premium hardware, and an AI risk engine watching every move. From day one,
          you get the same protection the vaulted few take for granted.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/40 transition hover:shadow-amber-400/60">
            Enter the Vault
          </button>
          <button className="rounded-full border border-amber-400/70 bg-black/40 px-8 py-3 text-sm font-semibold text-amber-100 backdrop-blur-md transition hover:bg-amber-400/10">
            Secure Your Wealth
          </button>
        </div>

        {/* Elite access pill */}
        <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-amber-500/40 bg-black/50 px-4 py-2 text-xs text-amber-100/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-semibold">Elite Access</span>
          <span className="text-amber-200/70">One-time • Lifetime @Name</span>
        </div>
      </div>
    </section>
  );
}
