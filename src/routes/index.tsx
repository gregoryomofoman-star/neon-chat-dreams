import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import splashOrb from "@/assets/splash-orb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Z Desires — Enter the Void" },
      { name: "description", content: "Premium nocturnal chat. Enter the void." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <PhoneFrame>
      <div className="relative h-full min-h-screen md:min-h-0 flex flex-col items-center justify-between py-20 px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#1e1b4b_0%,transparent_75%)] opacity-50 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-72 rounded-full blur-3xl opacity-30 bg-neon-purple pointer-events-none" />

        <div className="relative z-10 text-center mt-12">
          <div className="size-32 mx-auto mb-12 rounded-full bg-neon-blue/5 border border-neon-blue/20 grid place-items-center backdrop-blur-sm">
            <img
              src={splashOrb}
              alt=""
              width={96}
              height={96}
              className="size-20 rounded-full drop-shadow-[0_0_40px_rgba(139,92,246,0.6)]"
            />
          </div>
          <h1 className="text-7xl font-display italic font-bold leading-[0.85] text-balance mb-6">
            Z<br />
            <span className="text-neon-pink drop-shadow-[0_0_20px_rgba(255,45,146,0.4)]">
              Desires
            </span>
          </h1>
          <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.35em]">
            Digital Nocturnal Habitat
          </p>
        </div>

        <div className="relative z-10 w-full space-y-3">
          <Link
            to="/inbox"
            className="block w-full py-5 bg-white text-black font-bold rounded-full text-center text-xs tracking-[0.25em] shadow-[0_15px_40px_-10px_rgba(255,255,255,0.25)] active:scale-95 transition-transform"
          >
            ENTER THE VOID
          </Link>
          <p className="text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            via Telegram · 18+ only
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
