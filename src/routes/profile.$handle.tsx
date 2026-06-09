import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { CoinSheet } from "@/components/CoinSheet";
import { USERS, useStore } from "@/lib/store";
import { ChevronLeft, MoreHorizontal, Lock, MessageCircle, Gift, Shield } from "lucide-react";

export const Route = createFileRoute("/profile/$handle")({
  head: ({ params }) => ({ meta: [{ title: `@${params.handle} — Z Desires` }] }),
  loader: ({ params }) => {
    const user = Object.values(USERS).find((u) => u.handle === params.handle);
    if (!user) throw notFound();
    return { user };
  },
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const user = Object.values(USERS).find((u) => u.handle === handle)!;
  const unlock = useStore((s) => s.unlock);
  const unlocked = useStore((s) => s.unlocked);
  const open = useStore((s) => s.openCoinSheet);

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 overflow-y-auto no-scrollbar">
        {/* Cover */}
        <div className="h-72 relative shrink-0">
          <img src={user.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/40" />
          <div className="absolute top-12 left-5 right-5 flex justify-between items-center z-10">
            <Link to="/inbox" className="size-10 rounded-full glass border border-white/10 grid place-items-center">
              <ChevronLeft className="size-5 text-white" />
            </Link>
            <button className="size-10 rounded-full glass border border-white/10 grid place-items-center">
              <MoreHorizontal className="size-5 text-white" />
            </button>
          </div>
          <div className="absolute bottom-0 left-8 translate-y-1/2">
            <div className="size-28 rounded-[36px] border-[6px] border-background bg-zinc-900 overflow-hidden shadow-2xl rotate-3">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="px-7 pt-20 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl italic font-display leading-none">{user.name}</h3>
              <p className="text-neon-pink text-[10px] font-bold font-mono tracking-[0.2em] uppercase mt-2">
                @{user.handle}
              </p>
            </div>
            <button className="px-5 py-2.5 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-full text-[10px] font-bold tracking-widest active:scale-95 transition-all">
              FOLLOW
            </button>
          </div>

          <p className="mt-5 text-slate-400 text-sm font-light leading-relaxed text-pretty">
            {user.bio}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6 py-4 border-y border-white/5">
            <div>
              <p className="text-lg font-semibold">14.2k</p>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Followers</p>
            </div>
            <div>
              <p className="text-lg font-semibold">182</p>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Drops</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-neon-pink">$$$</p>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Tier</p>
            </div>
          </div>

          <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mt-6 mb-3 font-mono">
            Vault Gallery
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {user.gallery.map((g) => {
              const isUnlocked = !g.locked || unlocked.has(g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => g.locked && !isUnlocked && unlock(g.id, 25)}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative bg-zinc-900"
                >
                  <img
                    src={g.src}
                    alt=""
                    loading="lazy"
                    className={`w-full h-full object-cover ${isUnlocked ? "" : "blur-md scale-110"}`}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/40 grid place-items-center">
                      <Lock className="size-4 text-neon-pink drop-shadow-[0_0_8px_rgba(255,45,146,0.6)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Link
              to="/chat/$id"
              params={{ id: user.id }}
              className="py-4 bg-white text-black font-bold rounded-full text-xs tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform"
            >
              <MessageCircle className="size-4" />
              MESSAGE
            </Link>
            <button
              onClick={open}
              className="py-4 bg-neon-purple/15 text-neon-purple border border-neon-purple/30 font-bold rounded-full text-xs tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Gift className="size-4" />
              GIFT COINS
            </button>
          </div>

          <button className="mt-3 w-full py-3 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Shield className="size-3.5" />
            <span className="font-mono uppercase tracking-widest text-[10px]">Block · Report</span>
          </button>
        </div>

        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
