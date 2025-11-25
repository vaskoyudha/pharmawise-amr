"use client";

import { motion } from "framer-motion";
import { journeys } from "@/lib/data/journeys";
import { LucideIcon, ClipboardList, MessageSquare, Sparkles } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "Review Resep": ClipboardList,
  Konseling: MessageSquare,
  "Chatbot Publik": Sparkles,
};

export function JourneyTimeline() {
  return (
    <section className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">User Journey</p>
      <div className="grid gap-6 md:grid-cols-3">
        {journeys.map((journey, idx) => {
          const Icon = icons[journey.title] ?? Sparkles;
          return (
            <motion.div
              key={journey.title}
              className="glass-panel rounded-[32px] border border-white/10 p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-2xl bg-aurora-400/20 p-3 text-aurora-100">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white">{journey.title}</h3>
              </div>
              <ol className="mt-4 space-y-3 text-sm text-white/70">
                {journey.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="text-xs text-white/50">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

