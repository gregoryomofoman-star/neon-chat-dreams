import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { CoinSheet } from "@/components/CoinSheet";
import { USERS } from "@/lib/store";
import { ChevronLeft, ChevronRight, Wand2, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Z Desires — Explore" },
      { name: "description", content: "Explore neon-lit AI companions. Chat, unlock, and create your own." },
    ],
  }),
  component: Explore,
});

const BANNERS = [
  {
    title: "Create your own",
    accent: "AI Companion",
    cta: "Create Now",
    gradient: "from-neon-purple via-neon-pink to-neon-blue",
  },
  {
    title: "Unlock exclusive",
    accent: "Nocturnal Drops",
    cta: "Explore Now",
    gradient: "from-neon-blue via-neon-purple to-neon-pink",
  },
];

const CHARACTERS = [
  { handle: "vesper.nyx", age: 27, desc: "The notorious operative finally tracked you down…", isNew: true },
  { handle: "z_sorax", age: 22, desc: "Your gorgeous roommate has to sleep in your room…" },
  { handle: "dorian_x", age: 29, desc: "Codes by night. Lives in the static between channels.", isNew: true },
  { handle: "kai.v", age: 24, desc: "The arcade never closes. Neither do her secrets." },
];

function Explore() {
  const [slide, setSlide] = useState(0);
  const banner = BANNERS[slide];

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0">
        {/* Header */}
        <div className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
          <h1 className="text-2xl font-display italic font-bold leading-none">
            Z <span className="text-neon-pink">Desires</span>
          </h1>
          <Link
            to="/premium"
            className="flex items-center gap-1.5 bg-gradient-to-r from-neon-purple to-neon-pink px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide shadow-[0_0_15px_rgba(255,45,146,0.4)]"
          >
            <Zap className="size-3" />
            Pro
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
          {/* Hero Banner */}
          <div className="px-4 pt-2">
            <div
              className={`relative rounded-[28px] overflow-hidden bg-gradient-to-br ${banner.gradient} p-6 h-[200px] flex flex-col justify-between`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
              <div className="absolute -bottom-10 -right-10 size-48 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <p className="text-white/90 text-2xl font-display italic leading-tight">
                  {banner.title}
                </p>
                <p className="text-white text-3xl font-display italic font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {banner.accent}
                </p>
              </div>

              <Link
                to="/create"
                className="relative z-10 self-start flex items-center gap-2 bg-white/95 text-neon-purple font-bold text-sm px-5 py-2.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.3)] active:scale-95 transition-transform"
              >
                <Wand2 className="size-4" />
                {banner.cta}
              </Link>

              {/* Arrows */}
              <button
                onClick={() => setSlide((s) => (s - 1 + BANNERS.length) % BANNERS.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-black/20 backdrop-blur-sm text-white/90 z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => setSlide((s) => (s + 1) % BANNERS.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-black/20 backdrop-blur-sm text-white/90 z-10"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {BANNERS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === slide ? "w-6 bg-white" : "w-3 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section title */}
          <h2 className="px-5 pt-6 pb-4 text-2xl font-bold">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Explore
            </span>{" "}
            <span className="text-white">AI Companions</span>
          </h2>

          {/* Character Grid */}
          <div className="px-4 grid grid-cols-2 gap-3">
            {CHARACTERS.map((c) => {
              const u = USERS[c.handle.split(".")[0].replace("z_sora", "sora").replace("sorax", "sora")] ||
                USERS[Object.keys(USERS).find((k) => USERS[k].handle === c.handle) || "sora"];
              return (
                <Link
                  key={c.handle}
                  to="/profile/$handle"
                  params={{ handle: c.handle }}
                  className="relative aspect-[3/4.2] rounded-[22px] overflow-hidden border border-white/5 group"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-active:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {c.isNew && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      <Zap className="size-3 text-neon-pink fill-neon-pink" />
                      <span className="text-[10px] font-bold text-white">New</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <div className="flex items-baseline gap-2">
                      <p className="font-bold text-base text-white leading-none">{u.name.split(" ")[0]}</p>
                      <p className="font-bold text-sm text-white/70 leading-none">{c.age}</p>
                    </div>
                    <p className="text-[11px] text-white/70 mt-1.5 line-clamp-2 leading-snug">
                      {c.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <BottomNav />
        <CoinSheet />
      </div>
    </PhoneFrame>
  );
}
