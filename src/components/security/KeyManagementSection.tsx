// components/security/KeyManagementSection.tsx
import Image from "next/image";

export default function KeyManagementSection() {
  return (
    <section className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          NFC + biometric: elegant front door, boring keys.
        </h2>
        <p className="mt-3 text-sm text-[#f3e2b4]/90">
          Sovereign Vault is built so that day-to-day access feels like tapping a premium card, but under the hood it behaves like a hardened military facility.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[#f3e2b4]/90">
          <li>
            • The NFC card uses an EAL6+ secure element. Keys are generated on-card, stay on-card, and never touch the internet.
          </li>
          <li>
            • Taps from the card initiate signing flows, but the mobile app and biometrics have to agree before anything is approved. The app is the gatekeeper; it never sees the raw private keys.
          </li>
          <li>
            • Steal the card without the phone and biometrics? You can't move funds. Steal the phone without the card? You still can't sign. Both factors are required.
          </li>
          <li>
            • Backup, recovery, and any multi-party key schemes are intentionally not described in detail here. They exist, but their design is treated as a trade secret and only shared with auditors and partners under NDA.
          </li>
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-yellow-300/25 via-orange-500/20 to-amber-400/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-yellow-200/25 bg-black/80">
          <div className="relative h-64 w-full">
            <Image
              src="/images/sections/secure-hardware-wallet.png"
              alt="Secure hardware wallet in golden orbit"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
