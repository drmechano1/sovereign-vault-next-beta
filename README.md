# Sovereign Vault – Premium Next.js Build

This is a premium-styled Next.js 14 + TypeScript + Tailwind + GSAP project
for the Sovereign Vault marketing & product experience.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- GSAP (with a reusable scroll animation hook)
- Lottie-ready (via `lottie-react`, not yet wired to specific animations)
- HTML5 video backgrounds

## Structure

- `src/app` – App Router pages and root layout
- `src/components` – Header, Footer, VideoHero, AnimatedBackground, etc.
- `src/styles/globals.css` – Global styling, grid, noise, glow
- `src/lib/gsapClient.ts` – Scroll-triggered fade/slide hook
- `public/videos` – Place your MP4 hero and section loops here
- `public/images` – Reserved for future static imagery
- `public/lottie` – Reserved for Lottie JSON files

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

## Notes

- The project is configured with `output: 'standalone'` in `next.config.js`.
- All routes use the same premium hero pattern and can be wired to your
  existing smart contracts, wallet connect logic, and APIs.
