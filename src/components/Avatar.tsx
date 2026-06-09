import type { User } from "@/lib/store";

const ringMap = {
  pink: "border-neon-pink shadow-[0_0_12px_rgba(255,45,146,0.4)]",
  blue: "border-neon-blue shadow-[0_0_12px_rgba(0,212,255,0.4)]",
  purple: "border-neon-purple shadow-[0_0_12px_rgba(139,92,246,0.4)]",
};

export function Avatar({ user, size = 56, online }: { user: User; size?: number; online?: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className={`w-full h-full rounded-full border p-[2px] ${ringMap[user.ringColor]}`}>
        <img
          src={user.avatar}
          alt={user.name}
          loading="lazy"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 size-3 bg-neon-blue border-2 border-background rounded-full shadow-[0_0_8px_var(--neon-blue)]" />
      )}
    </div>
  );
}
