import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Sparkles, Wand2, MessageCircle, Gem } from "lucide-react";

const items = [
  { to: "/", icon: Compass, label: "Explore", match: (p: string) => p === "/" },
  { to: "/generate", icon: Sparkles, label: "Generate", match: (p: string) => p.startsWith("/generate") },
  { to: "/create", icon: Wand2, label: "Create", match: (p: string) => p.startsWith("/create") },
  { to: "/inbox", icon: MessageCircle, label: "Chat", match: (p: string) => p.startsWith("/inbox") || p.startsWith("/chat") },
  { to: "/premium", icon: Gem, label: "Premium", match: (p: string) => p.startsWith("/premium") },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="h-[72px] glass border-t border-white/5 flex items-center justify-around px-2 shrink-0">
      {items.map(({ to, icon: Icon, label, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-1 flex-1 transition-colors"
          >
            <div
              className={`size-9 rounded-full grid place-items-center transition-all ${
                active
                  ? "bg-gradient-to-br from-neon-purple to-neon-pink shadow-[0_0_18px_rgba(139,92,246,0.7)]"
                  : "bg-transparent"
              }`}
            >
              <Icon className={`size-[18px] ${active ? "text-white" : "text-slate-500"}`} />
            </div>
            <span
              className={`text-[10px] font-medium tracking-wide ${
                active ? "text-neon-purple" : "text-slate-500"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
