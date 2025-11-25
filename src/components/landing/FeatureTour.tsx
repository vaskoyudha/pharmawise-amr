"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    key: "review",
    title: "Appropriateness Studio",
    summary: "Skor 0–100, explainability, dan rekomendasi aksi dalam 45 detik.",
    bullets: ["OCR resep + auto-fill", "Explainability chips", "Button aksi instan"],
  },
  {
    key: "counseling",
    title: "Counseling Synthesizer",
    summary: "Script 20s, 60s, atau WhatsApp dengan typewriter preview dan multi bahasa.",
    bullets: ["Template aman guideline", "Quick edit drawer", "Export PDF & share WA"],
  },
  {
    key: "chatbot",
    title: "Public AMR Chatbot",
    summary: "Edukasikan publik, triage gejala, dan kumpulkan survei literasi.",
    bullets: ["Mode Cek Gejala", "FAQ populer", "Survei 3 pertanyaan"],
  },
  {
    key: "campaign",
    title: "Campaign Toolkit",
    summary: "Poster, IG carousel, video 30 detik, dan kalimat penolakan empatik.",
    bullets: ["Template builder", "Kalender musiman", "AI content recommender"],
  },
];

export function FeatureTour() {
  const [active, setActive] = useState(features[0]);

  return (
    <section className="rounded-[40px] border border-white/5 bg-white/5 p-6 lg:p-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Feature walk-through</p>
          <h2 className="font-display text-3xl text-white">Tour interaktif sebelum login</h2>
          <p className="max-w-2xl text-white/70">
            Juri, farmasis, dan admin bisa klik modul untuk memutar dummy data carousel. Pengguna biasa akan melihat empty state
            dengan tooltip inspirasi.
          </p>
        </div>
        <div className="flex gap-2">
          {features.map((feature) => (
            <Button
              key={feature.key}
              variant={feature.key === active.key ? "primary" : "ghost"}
              className="rounded-2xl"
              onClick={() => setActive(feature)}
            >
              {feature.title.split(" ")[0]}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <Card className="rounded-[32px] border border-white/10 p-8">
          <motion.h3
            key={active.title}
            className="text-3xl font-semibold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {active.title}
          </motion.h3>
          <motion.p
            key={active.summary}
            className="mt-3 text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {active.summary}
          </motion.p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {active.bullets.map((bullet) => (
              <li key={bullet} className="rounded-2xl border border-white/10 px-4 py-3">
                {bullet}
              </li>
            ))}
          </ul>
        </Card>
        <div className="glass-panel rounded-[32px] border border-white/10 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Dummy Showcase</p>
          <h4 className="mt-2 text-xl font-semibold text-white">Snapshot yang dilihat role istimewa</h4>
          <p className="mt-3">
            Mereka akan melihat screenshot animasi modul {active.title} lengkap dengan data dummy yang bisa diganti-ganti untuk
            menjawab pertanyaan juri.
          </p>
          <p className="mt-4 text-white/60">
            Pengguna biasa? Kami tampilkan canvas kosong + CTA “hubungkan data Anda” supaya tetap mudah dibayangkan.
          </p>
        </div>
      </div>
    </section>
  );
}







