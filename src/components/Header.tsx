'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: '@Name Marketplace' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/vault', label: 'Vault' },
  { href: '/security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-borderSoft/60 bg-background/80 backdrop-blur-xl">
      <div className="section-max flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-gold to-accent shadow-gold-glow" />
          <span className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            Sovereign Vault
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm text-foreground/80 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-gold ${active ? 'text-gold' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/onboarding"
          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-background shadow-gold-glow hover:bg-goldSoft transition-colors"
        >
          Enter Vault
        </Link>
      </div>
    </header>
  );
}
