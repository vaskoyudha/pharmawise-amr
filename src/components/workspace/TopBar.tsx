"use client";

import { Button } from "@/components/ui/button";
import { Bell, ShieldCheck } from "lucide-react";

export function TopBar() {
  return (
    <header className="glass-panel flex items-center justify-between rounded-3xl border border-white/10 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Hari ini</p>
        <p className="text-lg text-white">Monitor stewardship & edukasi</p>
      </div>
      <div className="flex items-center gap-3 text-sm text-white/70">
        <div className="hidden items-center gap-2 rounded-full border border-aurora-200/40 px-4 py-2 text-aurora-100 md:flex">
          <ShieldCheck size={16} />
          Appropriateness guard active
        </div>
        <Button variant="ghost" className="rounded-full border border-white/10 px-3 py-2">
          <Bell size={18} />
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-aurora-300 to-purple-500 text-sm font-semibold text-white">
          AY
        </div>
      </div>
    </header>
  );
}

