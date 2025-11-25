"use client";

import { motion } from "framer-motion";
import { modules } from "@/lib/data/modules";

export function ModulesGrid() {
  return (
    <section id="modul" className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aurora-200">Modul Sistem</p>
          <h2 className="font-display text-3xl text-white">Semua pilar stewardship dalam satu layar</h2>
        </div>
        <span className="rounded-full border border-white/10 px-4 py-1 text-sm text-white/60">Phase 1–3 Roadmap</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((mod, index) => (
          <motion.article
            key={mod.key}
            className="glass-panel group relative flex flex-col rounded-3xl border border-white/10 p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold text-aurora-200">{mod.key}</span>
              <h3 className="text-xl font-semibold text-white">{mod.title}</h3>
            </div>
            <p className="text-sm text-white/70">{mod.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              {mod.highlights.map((item) => (
                <li key={item} className="rounded-full border border-white/10 px-3 py-1">
                  {item}
                </li>
              ))}
            </ul>
            <div className="absolute inset-x-0 -bottom-0 h-px bg-gradient-to-r from-transparent via-aurora-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

