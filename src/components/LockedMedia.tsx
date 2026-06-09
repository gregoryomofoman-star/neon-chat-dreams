import { Lock } from "lucide-react";
import { useStore } from "@/lib/store";

export function LockedMedia({ id, src, cost }: { id: string; src: string; cost: number }) {
  const unlocked = useStore((s) => s.unlocked.has(id));
  const unlock = useStore((s) => s.unlock);

  return (
    <div className="relative rounded-[28px] overflow-hidden group max-w-[280px]">
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`w-full aspect-[4/5] object-cover transition-all duration-700 ${
          unlocked ? "" : "blur-2xl scale-110 opacity-60"
        }`}
      />
      {!unlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-xl animate-fade-in">
          <div className="size-14 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
            <Lock className="size-5 text-neon-pink" />
          </div>
          <p className="text-center font-semibold text-sm mb-1">Premium Media</p>
          <p className="text-center text-xs text-slate-400 mb-5 font-light">High-quality exclusive content</p>
          <button
            onClick={() => unlock(id, cost)}
            className="px-6 py-3 bg-neon-pink rounded-full font-bold text-xs tracking-widest animate-glow text-white"
          >
            UNLOCK FOR {cost} COINS
          </button>
        </div>
      )}
    </div>
  );
}
