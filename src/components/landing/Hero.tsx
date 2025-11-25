"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const stats = [
  { label: "Resep ditinjau", value: 12000 },
  { label: "Konseling otomatis", value: 48000 },
  { label: "Quiz publik", value: 320000 },
];

const roles = ["Juri", "Farmasis", "Admin", "Pengguna biasa", "Dummy"];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[48px] border border-white/10 bg-gradient-to-br from-[#0b1124] to-[#05060b] p-10 shadow-[0_50px_180px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0 bg-grid-glow opacity-70" aria-hidden />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-8">
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            One Health · Stewardship · Edukasi Publik
          </motion.span>

          <motion.h1
            className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Jumbotron klinis untuk menilai resep, mendidik publik, dan memicu aksi AMS dalam{" "}
            <span className="gradient-text text-glow">satu portal futuristik</span>.
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Pilih peranmu: juri demo, farmasis champion, admin data, pengguna biasa, atau dummy presenter. Kami akan
            menyiapkan skenario yang tepat—dengan data dummy kaya untuk role istimewa maupun kosong untuk publik nyata.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Button asChild size="lg">
              <Link href="/workspace">Masuk Workspace</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#role-tour">Lihat Mode Juri/Farmasis</Link>
            </Button>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="glow-effect rounded-3xl border border-white/5 bg-white/5 p-4 text-center hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
              >
                <p className="text-2xl font-semibold text-white">
                  <AnimatedCounter value={stat.value} suffix="+" />
                </p>
                <p className="text-xs uppercase tracking-[0.5em] text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <ScrollReveal animation="slideLeft" delay={0.3}>
          <div className="glass-panel glow-effect relative h-full rounded-[32px] border border-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Role gateway</p>
            <h3 className="text-2xl font-semibold text-white">Cukup pilih persona</h3>
            <p className="mt-2 text-sm text-white/70">
              Tanpa kredensial pun, juri/farmasis/admin langsung melihat sandbox penuh insight. Pengguna biasa & dummy
              presenter menyimak empty state untuk membayangkan dampak di organisasi masing-masing.
            </p>
            <div className="mt-6 space-y-3">
              {roles.map((role, idx) => (
                <motion.div
                  key={role}
                  className="hover-lift flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition-all hover:bg-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <span>{role}</span>
                  <span className="text-xs text-white/40">pilih & jelajah</span>
                </motion.div>
              ))}
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-aurora-400/40 bg-aurora-400/10 px-4 py-3 text-sm text-aurora-100">
              Demo auto-switch: juri · farmasis · admin = data dummy kaya | pengguna biasa = canvas kosong.
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Enhanced floating gradient orbs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-aurora-400/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-neon/30 blur-[120px] floating" />
    </section>
  );
}

