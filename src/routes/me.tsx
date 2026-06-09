import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { ME, useStore } from "@/lib/store";
import { Settings, Shield, Cpu, Bell, ChevronRight, Plus } from "lucide-react";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Me — Z Desires" }] }),
  component: Me,
});

function Me() {
  const coins = useStore((s) => s.coins);
  const open = useStore((s) => s.openCoinSheet);

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Cover header */}
          <div className="h-52 relative">
            <img src={ME.cover} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <button className="absolute top-12 right-5 size-10 rounded-full glass border border-white/10 grid place-items-center">
              <Settings className="size-4 text-white" />
            </button>
            <div className="absolute -bottom-12 left-7 flex items-end gap-5">
              <div className="size-28 rounded-full bg-zinc-900 border-[6px] border-background overflow-hidden shadow-2xl shadow-neon-purple/20">
                <img src={ME.avatar} alt={ME.name} className="w-full h-full object-cover" />
              </div>
              <div className="pb-4">
                <h3 className="text-3xl italic font-display leading-tight">{ME.name}</h3>
                <p className="text-[10px] font-mono text-neon-blue uppercase tracking-[0.25em] mt-1">
                  Lvl 12 · Architect
                </p>
              </div>
            </div>
          </div>

          <div className="px-7 pt-20 pb-8 space-y-7">
            {/* Wallet card */}
            <button
              onClick={open}
              className="w-full p-5 rounded-[28px] bg-gradient-to-br from-neon-purple/20 via-neon-pink/10 to-neon-blue/20 border border-white/10 text-left relative overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 size-40 rounded-full bg-neon-pink/30 blur-3xl" />
              <p className="text-[9px] text-slate-300 font-bold mb-1 tracking-[0.25em] font-mono">WALLET BALANCE</p>
              <div className="flex items-end justify-between relative z-10">
                <p className="text-4xl font-semibold">
                  {coins.toLocaleString()}{" "}
                  <span className="text-neon-pink text-base italic font-display">coins</span>
                </p>
                <div className="size-10 rounded-full bg-white text-black grid place-items-center shadow-xl">
                  <Plus className="size-4" />
                </div>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/[0.03] rounded-[22px] border border-white/5">
                <p className="text-[9px] text-slate-500 font-bold mb-1 tracking-widest font-mono">UNLOCKS</p>
                <p className="text-xl font-semibold">
                  18 <span className="text-neon-blue text-xs italic font-display">vaulted</span>
                </p>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-[22px] border border-white/5">
                <p className="text-[9px] text-slate-500 font-bold mb-1 tracking-widest font-mono">STREAK</p>
                <p className="text-xl font-semibold">
                  7 <span className="text-neon-pink text-xs italic font-display">nights</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3 font-mono">
                Personal Gallery
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {ME.gallery.map((g) => (
                  <div
                    key={g.id}
                    className="aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900"
                  >
                    <img src={g.src} alt="" loading="lazy" className="w-full h-full object-cover opacity-70" />
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border border-dashed border-neon-pink/30 bg-neon-pink/5 grid place-items-center text-neon-pink text-[10px] font-bold tracking-widest">
                  + NEW
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: Shield, label: "Security Protocol", hint: "Active" },
                { icon: Cpu, label: "Hardware Link", hint: "Telegram" },
                { icon: Bell, label: "Notifications", hint: "On" },
              ].map(({ icon: Icon, label, hint }) => (
                <button
                  key={label}
                  className="w-full p-4 glass border border-white/5 rounded-2xl text-sm font-medium flex items-center gap-3 hover:bg-white/[0.06] transition-colors"
                >
                  <Icon className="size-4 text-slate-400" />
                  <span className="flex-1 text-left">{label}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{hint}</span>
                  <ChevronRight className="size-4 text-slate-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
