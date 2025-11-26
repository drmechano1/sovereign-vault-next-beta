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
          Sovereign Vault is built so that day-to-day access feels like tapping
          a premium card – but under the hood, it behaves like a hardened
          military facility. Your NFC card, mobile app, and biometrics work
          together as an access layer in front of deeply protected keys.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[#f3e2b4]/90">
          <li>
            • The NFC card contains an EAL6+ secure element where your keys are
            generated and stored. Keys are created on-card and are never
            exported to your phone, our servers, or the open internet.
          </li>
          <li>
            • The mobile app (already ~90% built) verifies NFC requests and
            gates them behind biometric checks before it will let the card be
            used to unlock the vault dashboard or approve sensitive actions.
          </li>
          <li>
            • The card signs carefully scoped challenges; the app and backend
            see signatures and policies, not raw key material.
          </li>
          <li>
            • Backup, recovery, and any multi-party key schemes are
            intentionally not described in detail here. They exist, but their
            design is treated as a trade secret and only shared with auditors
            and partners under NDA.
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
