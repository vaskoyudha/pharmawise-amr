"use client";

import { dashboardCards } from "@/lib/data/dashboard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/providers/role-context";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

export function DashboardCards() {
  const { mode } = useRole();
  const cards = mode === "demo"
    ? dashboardCards
    : dashboardCards.map((card) => ({
      ...card,
      value: "--",
      change: "Belum ada data",
      trend: "flat",
    }));

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, idx) => (
        <motion.div
          key={`${card.title}-${idx}`}
          className="glass-panel glow-effect hover-lift rounded-3xl border border-white/10 p-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-sm text-white/60">{card.title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {typeof card.value === "number" ? (
              <AnimatedCounter value={card.value} duration={1.5} />
            ) : (
              card.value
            )}
          </p>
          <span
            className={cn(
              "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium transition-all",
              card.trend === "up"
                ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
                : card.trend === "down"
                  ? "bg-amber-400/20 text-amber-100 hover:bg-amber-400/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
            )}
          >
            {card.change}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

