import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { CoinPill } from "@/components/CoinPill";
import { useStore } from "@/lib/store";
import { Gem, Check, Infinity as InfinityIcon, Lock, Zap } from "lucide-react";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [{ title: "Premium — Z Desires" }] }),
  component: Premium,
});

const PERKS = [
  { icon: InfinityIcon, text: "Unlimited messages with all companions" },
  { icon: Lock, text: "Unlock all media without spending coins" },
  { icon: Zap, text: "Priority generation · 4K quality" },
  { icon: Gem, text: "2,500 bonus coins every month" },
];

const PLANS = [
  { id: "month", label: "Monthly", price: "$12.99", per: "/mo" },
  { id: "year", label: "Yearly", price: "$79.99", per: "/yr", best: true, save: "Save 48%" },
];

function Premium() {
  const openCoinSheet = useStore((s) => s.openCoinSheet);
  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-display italic font-bold leading-none">Premium</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">UNLOCK EVERYTHING</p>
          </div>
          <CoinPill />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue p-7 text-center">
            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-3xl" />
            <div className="size-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md grid place-items-center mb-4 border border-white/30">
              <Gem className="size-7 text-white" />
            </div>
            <h3 className="text-white text-3xl font-display italic font-bold">Z Pro</h3>
            <p className="text-white/85 text-sm mt-1 max-w-[240px] mx-auto">
              Step into the VIP wing of the void.
            </p>
          </div>

          <div className="space-y-2.5">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                <div className="size-9 rounded-full bg-neon-pink/20 grid place-items-center">
                  <Icon className="size-4 text-neon-pink" />
                </div>
                <p className="text-sm flex-1">{text}</p>
                <Check className="size-4 text-neon-blue" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {PLANS.map((p) => (
              <button
                key={p.id}
                className={`p-4 rounded-3xl text-left transition-all relative overflow-hidden active:scale-[0.98] ${
                  p.best
                    ? "bg-neon-pink/10 border-2 border-neon-pink shadow-[0_0_25px_rgba(255,45,146,0.25)]"
                    : "bg-zinc-900/60 border border-white/5"
                }`}
              >
                {p.best && (
                  <div className="absolute -top-px right-3 bg-neon-pink text-white text-[9px] font-black px-2 py-0.5 rounded-b-md tracking-widest">
                    BEST
                  </div>
                )}
                <p className={`text-[10px] font-bold tracking-[0.2em] ${p.best ? "text-neon-pink" : "text-slate-500"}`}>
                  {p.label.toUpperCase()}
                </p>
                <p className="text-2xl font-bold mt-2">
                  {p.price}
                  <span className="text-xs text-slate-400 font-normal">{p.per}</span>
                </p>
                {p.save && <p className="text-[10px] text-neon-blue font-bold mt-1">{p.save}</p>}
              </button>
            ))}
          </div>

          <button
            onClick={openCoinSheet}
            className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-black rounded-2xl tracking-widest text-sm shadow-[0_10px_30px_rgba(255,45,146,0.4)] active:scale-[0.98] transition-transform"
          >
            UPGRADE TO PRO
          </button>
          <p className="text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            Cancel anytime · Secured by Telegram
          </p>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
