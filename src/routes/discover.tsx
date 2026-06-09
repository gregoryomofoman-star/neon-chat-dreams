import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { CoinPill } from "@/components/CoinPill";
import { USERS } from "@/lib/store";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover — Z Desires" }] }),
  component: Discover,
});

function Discover() {
  const users = Object.values(USERS);
  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="px-7 pt-14 pb-4 flex items-center justify-between border-b border-white/5 bg-background/70 backdrop-blur-xl sticky top-0 z-20">
          <div>
            <h2 className="text-3xl italic font-display leading-none">Discover</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">
              TRENDING IN THE VOID
            </p>
          </div>
          <CoinPill />
        </div>

        <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
          <div className="grid grid-cols-2 gap-3">
            {users.map((u, i) => (
              <Link
                key={u.id}
                to="/profile/$handle"
                params={{ handle: u.handle }}
                className="aspect-[3/4] rounded-[28px] overflow-hidden relative border border-white/5 group"
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {i === 0 && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-neon-pink/90 px-2 py-1 rounded-full">
                    <Flame className="size-3 text-white" />
                    <span className="text-[9px] font-black text-white tracking-widest">HOT</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-semibold text-sm">{u.name}</p>
                  <p className="text-[10px] text-neon-blue font-mono uppercase tracking-widest">
                    @{u.handle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
