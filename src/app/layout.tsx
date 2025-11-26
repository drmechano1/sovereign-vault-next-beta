import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Web3Providers } from '../components/providers/Web3Providers';

export const metadata: Metadata = {
  title: 'Sovereign Vault – Fort Knox for Your Digital Identity & Wealth',
  description:
    'Sovereign Vault unifies your wallets, @name identity, guardians, and SafeSend protections into one fortress-grade experience.',
  openGraph: {
    title: 'Sovereign Vault',
    description: 'Fort Knox for your digital identity and crypto wealth.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div className="vault-grid" />
        <div className="vault-noise" />

        <Web3Providers>
          <Header />
          <main className="pb-10">{children}</main>
          <Footer />
        </Web3Providers>
      </body>
    </html>
  );
}
