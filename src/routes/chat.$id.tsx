import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { CoinPill } from "@/components/CoinPill";
import { CoinSheet } from "@/components/CoinSheet";
import { LockedMedia } from "@/components/LockedMedia";
import { USERS, useStore } from "@/lib/store";
import { ChevronLeft, Plus, Send, Coins } from "lucide-react";

export const Route = createFileRoute("/chat/$id")({
  head: ({ params }) => ({ meta: [{ title: `${USERS[params.id]?.name ?? "Chat"} — Z Desires` }] }),
  loader: ({ params }) => {
    if (!USERS[params.id]) throw notFound();
    return { user: USERS[params.id] };
  },
  component: Chat,
});

function Chat() {
  const { id } = Route.useParams();
  const user = USERS[id];
  const messages = useStore((s) => s.messages[id] ?? []);
  const send = useStore((s) => s.send);
  const openCoinSheet = useStore((s) => s.openCoinSheet);
  const [draft, setDraft] = useState("");

  const onSend = () => {
    if (!draft.trim()) return;
    send(id, draft.trim());
    setDraft("");
  };

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        {/* Header */}
        <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b border-white/5 bg-background/70 backdrop-blur-xl sticky top-0 z-20">
          <Link to="/inbox" className="size-9 grid place-items-center -ml-2">
            <ChevronLeft className="size-5 text-neon-blue" />
          </Link>
          <Link
            to="/profile/$handle"
            params={{ handle: user.handle }}
            className="flex items-center gap-3 flex-1"
          >
            <img
              src={user.avatar}
              alt={user.name}
              loading="lazy"
              className="size-10 rounded-full object-cover border border-white/10"
            />
            <div>
              <p className="font-semibold text-sm leading-tight">{user.name}</p>
              <p className="text-[9px] text-neon-blue font-bold font-mono uppercase tracking-[0.2em]">
                {user.online ? "Active Now" : "Last seen recently"}
              </p>
            </div>
          </Link>
          <CoinPill />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          {messages.map((m) => {
            if (m.media) {
              return (
                <div key={m.id} className="flex">
                  <LockedMedia id={m.media.id} src={m.media.src} cost={m.media.cost} />
                </div>
              );
            }
            return (
              <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
                    m.fromMe
                      ? "bg-gradient-to-br from-neon-blue/90 to-neon-purple/90 text-white rounded-[22px] rounded-tr-md shadow-[0_8px_24px_-8px_rgba(0,212,255,0.4)]"
                      : "bg-zinc-900 text-slate-100 rounded-[22px] rounded-tl-md border border-white/5"
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[9px] font-mono mt-1 ${
                      m.fromMe ? "text-white/60" : "text-slate-500"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div className="p-4 bg-background/80 backdrop-blur-xl border-t border-white/5 flex items-center gap-2 shrink-0">
          <button className="size-11 rounded-full bg-zinc-900 border border-white/5 grid place-items-center shrink-0">
            <Plus className="size-4 text-slate-400" />
          </button>
          <div className="flex-1 bg-zinc-900 border border-white/5 rounded-full pl-4 pr-2 py-1.5 flex items-center">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Write a message…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500"
            />
            <button
              onClick={openCoinSheet}
              className="size-8 rounded-full grid place-items-center text-neon-pink"
            >
              <Coins className="size-4" />
            </button>
          </div>
          <button
            onClick={onSend}
            className="size-11 rounded-full bg-neon-blue grid place-items-center shrink-0 shadow-[0_0_20px_rgba(0,212,255,0.4)] active:scale-95 transition-transform"
          >
            <Send className="size-4 text-black" />
          </button>
        </div>

        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
