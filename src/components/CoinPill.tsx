import { useStore } from "@/lib/store";
import { Coins } from "lucide-react";

export function CoinPill() {
  const coins = useStore((s) => s.coins);
  const open = useStore((s) => s.openCoinSheet);
  return (
    <button
      onClick={open}
      className="flex items-center gap-2 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-white/10 active:scale-95 transition-transform"
    >
      <Coins className="size-3.5 text-neon-blue" style={{ filter: "drop-shadow(0 0 6px var(--neon-blue))" }} />
      <span className="text-neon-blue font-bold text-xs font-mono tracking-tight">
        {coins.toLocaleString()}
      </span>
    </button>
  );
}
