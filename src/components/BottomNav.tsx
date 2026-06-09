import { Link, useRouterState } from "@tanstack/react-router";
import { Inbox, Compass, User } from "lucide-react";

const items = [
  { to: "/inbox", icon: Inbox, label: "Inbox" },
  { to: "/discover", icon: Compass, label: "Discover" },
  { to: "/me", icon: User, label: "Me" },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="h-20 glass border-t border-white/5 flex items-center justify-around px-8 shrink-0">
      {items.map(({ to, icon: Icon, label }) => {
        const active = pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 transition-colors ${
              active ? "text-neon-pink" : "text-slate-600"
            }`}
          >
            <Icon
              className="size-5"
              style={active ? { filter: "drop-shadow(0 0 8px var(--neon-pink))" } : undefined}
            />
            <span className="text-[9px] font-mono uppercase tracking-widest">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
