import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { CoinPill } from "@/components/CoinPill";
import { Wand2 } from "lucide-react";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Create — Z Desires" }] }),
  component: Create,
});

const STEPS = [
  { label: "Personality", value: "Mysterious & playful" },
  { label: "Appearance", value: "Choose a look" },
  { label: "Voice", value: "Sultry whisper" },
  { label: "Backstory", value: "Write her origin" },
];

function Create() {
  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-display italic font-bold leading-none">Create</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">DESIGN YOUR COMPANION</p>
          </div>
          <CoinPill />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          <div className="rounded-[28px] overflow-hidden bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue p-6 relative">
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10">
              <Wand2 className="size-7 text-white mb-3" />
              <h3 className="text-white text-2xl font-display italic font-bold leading-tight">
                Build your perfect AI girlfriend
              </h3>
              <p className="text-white/80 text-sm mt-2">From look to lore — every detail is yours.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-neon-purple/40 transition-colors text-left"
              >
                <div className="size-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink grid place-items-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{s.label}</p>
                  <p className="text-xs text-slate-400 truncate">{s.value}</p>
                </div>
                <span className="text-slate-500">→</span>
              </button>
            ))}
          </div>

          <button className="w-full py-4 bg-white text-black font-bold rounded-2xl tracking-wide text-sm active:scale-[0.98] transition-transform">
            Bring Her to Life
          </button>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
