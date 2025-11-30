"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileSearch, MessageCircle, Activity, BellRing, GraduationCap, Settings, Megaphone, Bot } from "lucide-react";

const navItems = [
  { href: "/workspace", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace/review", label: "Review Resep", icon: FileSearch },
  { href: "/workspace/counseling", label: "Konseling", icon: MessageCircle },
  { href: "/chatbot", label: "Chatbot AMR", icon: Bot },
  { href: "/workspace/demand-reporting", label: "Report Demand", icon: Activity },
  { href: "/workspace/campaign", label: "Campaign", icon: Megaphone },
  { href: "/workspace/alerts", label: "Early Warning", icon: BellRing },
  { href: "/workspace/learning", label: "Learning", icon: GraduationCap },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel hidden h-full w-64 flex-col gap-4 rounded-3xl border border-white/10 p-6 text-sm text-white/70 lg:flex">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">PharmaWise</p>
        <p className="font-display text-xl text-white">Workspace</p>
      </div>
      <nav className="mt-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-2 transition",
                active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

