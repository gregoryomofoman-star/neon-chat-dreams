import { useStore, COIN_PACKAGES } from "@/lib/store";
import { Coins, X } from "lucide-react";

export function CoinSheet() {
  const open = useStore((s) => s.coinSheetOpen);
  const close = useStore((s) => s.closeCoinSheet);
  const purchase = useStore((s) => s.purchase);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full glass rounded-t-[40px] border-t border-white/10 p-7 pt-5 space-y-5 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto" />
          <button onClick={close} className="absolute right-6 top-5 size-8 rounded-full bg-white/5 grid place-items-center">
            <X className="size-4 text-slate-400" />
          </button>
        </div>

        <div className="text-center">
          <h4 className="text-3xl italic font-display leading-none">Refill Coins</h4>
          <p className="text-slate-400 text-xs mt-2 font-light tracking-wide">
            Unlock premium content & send gifts
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {COIN_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => purchase(pkg.coins)}
              className={`p-4 rounded-3xl text-left transition-all relative overflow-hidden active:scale-[0.98] ${
                pkg.best
                  ? "bg-neon-pink/10 border-2 border-neon-pink shadow-[0_0_20px_rgba(255,45,146,0.2)]"
                  : "bg-zinc-900/60 border border-white/5 hover:border-white/20"
              }`}
            >
              {pkg.best && (
                <div className="absolute -top-px right-3 bg-neon-pink text-white text-[9px] font-black px-2 py-0.5 rounded-b-md tracking-widest">
                  BEST
                </div>
              )}
              <p className={`text-[10px] font-bold tracking-[0.2em] ${pkg.best ? "text-neon-pink" : "text-slate-500"}`}>
                {pkg.label}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Coins className={`size-4 ${pkg.best ? "text-neon-pink" : "text-neon-blue"}`} />
                <p className="text-xl font-semibold">{pkg.coins.toLocaleString()}</p>
              </div>
              <div className={`mt-3 text-sm font-bold ${pkg.best ? "text-neon-pink" : "text-neon-blue"}`}>
                {pkg.price}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => purchase(COIN_PACKAGES[1].coins)}
          className="w-full py-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-black rounded-2xl tracking-widest text-sm shadow-[0_10px_30px_rgba(139,92,246,0.4)] active:scale-[0.98] transition-transform"
        >
          PAY WITH TELEGRAM STARS
        </button>

        <p className="text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
          Secured · Encrypted · Anonymous
        </p>
      </div>
    </div>
  );
}
