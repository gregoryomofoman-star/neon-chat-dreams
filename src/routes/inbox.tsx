import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinPill } from "@/components/CoinPill";
import { CoinSheet } from "@/components/CoinSheet";
import { Avatar } from "@/components/Avatar";
import { USERS, CHAT_LIST, useStore } from "@/lib/store";
import { Search } from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({ meta: [{ title: "Inbox — Z Desires" }] }),
  component: Inbox,
});

function Inbox() {
  const messages = useStore((s) => s.messages);
  const unread = useStore((s) => s.unread);

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        <div className="px-7 pt-14 pb-4 flex items-center justify-between border-b border-white/5 bg-background/70 backdrop-blur-xl sticky top-0 z-20">
          <div>
            <h2 className="text-3xl italic font-display leading-none">Inbox</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">14 NEW · 2 PENDING</p>
          </div>
          <CoinPill />
        </div>

        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/5 rounded-full px-4 py-2.5">
            <Search className="size-4 text-slate-500" />
            <span className="text-slate-500 text-sm font-light">Search the void…</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 space-y-2 no-scrollbar">
          {CHAT_LIST.map((id) => {
            const u = USERS[id];
            const last = messages[id]?.[messages[id].length - 1];
            const lastText = last?.text ?? (last?.media ? "📸 Sent a locked media" : "");
            const count = unread[id] ?? 0;
            return (
              <Link
                key={id}
                to="/chat/$id"
                params={{ id }}
                className="flex items-center gap-4 p-3 rounded-[28px] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
              >
                <Avatar user={u} online={u.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-semibold text-sm">{u.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{last?.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 truncate font-light">{lastText}</p>
                </div>
                {count > 0 && (
                  <div className="size-5 bg-neon-pink rounded-full grid place-items-center shadow-[0_0_10px_rgba(255,45,146,0.6)] shrink-0">
                    <span className="text-[10px] font-black text-white">{count}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
