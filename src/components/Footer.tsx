import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-borderSoft/80 bg-background/90 mt-16">
      <div className="section-max flex flex-col gap-4 py-8 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-neutral-500">© {new Date().getFullYear()} Sovereign Vault. Patent-pending security architecture.</p>
        <div className="flex gap-4">
          <Link href="/legal" className="hover:text-gold transition-colors">
            Legal &amp; Privacy
          </Link>
          <Link href="/support" className="hover:text-gold transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
