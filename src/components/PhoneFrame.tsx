import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#020203] flex items-center justify-center md:p-8">
      <div className="relative w-full md:w-[390px] md:h-[844px] min-h-screen md:min-h-0 md:rounded-[54px] md:border-[10px] md:border-zinc-900 md:shadow-2xl overflow-hidden bg-background">
        {children}
      </div>
    </div>
  );
}
