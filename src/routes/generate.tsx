import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { CoinPill } from "@/components/CoinPill";
import { Sparkles, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/generate")({
  head: () => ({ meta: [{ title: "Generate — Z Desires" }] }),
  component: Generate,
});

const STYLES = ["Anime", "Realistic", "Cyberpunk", "Noir", "Pastel", "Y2K"];

function Generate() {
  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-display italic font-bold leading-none">Generate</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">AI IMAGE STUDIO</p>
          </div>
          <CoinPill />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          <div className="relative aspect-square rounded-[28px] overflow-hidden bg-gradient-to-br from-neon-purple/20 via-neon-pink/10 to-neon-blue/20 border border-white/10 grid place-items-center">
            <div className="text-center">
              <div className="size-16 mx-auto rounded-full bg-white/5 grid place-items-center mb-3">
                <ImageIcon className="size-7 text-neon-pink" />
              </div>
              <p className="text-sm text-slate-400 font-light">Your generation will appear here</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">PROMPT</p>
            <textarea
              placeholder="Describe your dream companion…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-sm placeholder:text-slate-600 resize-none h-24 focus:outline-none focus:border-neon-pink/50"
            />
          </div>

          <div>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">STYLE</p>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s, i) => (
                <button
                  key={s}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    i === 0
                      ? "bg-neon-pink/20 border-neon-pink text-neon-pink"
                      : "bg-white/[0.04] border-white/10 text-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,45,146,0.4)] active:scale-[0.98] transition-transform">
            <Sparkles className="size-4" />
            Generate · 25 Coins
          </button>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
