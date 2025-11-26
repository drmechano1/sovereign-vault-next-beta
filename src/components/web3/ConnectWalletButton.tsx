// components/web3/ConnectWalletButton.tsx
"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWalletButton() {
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[11px] text-[#f3e2b4]/90">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span>Connected: {short}</span>
        <button
          onClick={() => disconnect()}
          className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] text-neutral-200 hover:border-red-400 hover:text-red-200"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isConnecting || isReconnecting}
      className="inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-300/15 px-4 py-1.5 text-[11px] font-semibold text-[#fbe6a4] hover:bg-yellow-300/25 disabled:opacity-60"
    >
      <span className="h-2 w-2 rounded-full bg-yellow-300" />
      {isConnecting || isReconnecting ? "Connecting..." : "Connect wallet"}
    </button>
  );
}
