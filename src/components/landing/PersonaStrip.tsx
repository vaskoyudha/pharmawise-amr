"use client";

import { motion } from "framer-motion";
import { personas } from "@/lib/data/personas";

export function PersonaStrip() {
  return (
    <section className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">Persona Utama</p>
      <div className="grid gap-4 md:grid-cols-2">
        {personas.map((persona, idx) => (
          <motion.div
            key={persona.name}
            className="glass-panel rounded-3xl border border-white/10 p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{persona.name}</h3>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{persona.nickname}</span>
            </div>
            <p className="mt-2 text-sm text-white/60">{persona.pain}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              {persona.needs.map((need) => (
                <li key={need} className="rounded-full border border-white/10 px-3 py-1">
                  {need}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

