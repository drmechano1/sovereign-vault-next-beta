# Sovereign Vault – Next.js Deployment

This project is a premium Next.js 14 + TypeScript + Tailwind CSS + GSAP build
for the Sovereign Vault marketing & product experience.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lottie (via `lottie-react`)
- HTML5 video backgrounds

## File Structure

- `public/videos` – MP4 hero and background videos
- `public/images` – PNG/JPG/WEBP image assets
- `public/lottie` – Lottie JSON files
- `src/app` – App Router pages and root layout
- `src/components` – Reusable UI components
- `src/styles` – Global styles (Tailwind entry)
- `src/lib` – Animation hooks and helpers

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

The project is configured with `output: 'standalone'` in `next.config.js` for
Node.js deployment as described in your deployment guide.
