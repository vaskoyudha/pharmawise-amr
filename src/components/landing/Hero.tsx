"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { Stethoscope, Pill, Sparkles, HeartPulse, ShieldCheck, GraduationCap, Activity, MessageSquare, Rocket } from "lucide-react";

const stats = [
  { label: "Resep ditinjau", value: 12000 },
  { label: "Konseling otomatis", value: 48000 },
  { label: "Quiz publik", value: 320000 },
];

const roles = ["Juri", "Farmasis", "Admin", "Pengguna biasa", "Dummy"];

export function Hero() {
  return (
    <section className="group relative overflow-hidden rounded-[48px] border border-white/10 bg-gradient-to-br from-[#0b1124] to-[#05060b] p-10 shadow-[0_50px_180px_rgba(0,0,0,0.65)] transition-all duration-500 hover:border-white/20 hover:shadow-[0_50px_180px_rgba(94,252,232,0.15)]">
      <div className="absolute inset-0 bg-grid-glow opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/0 via-aurora-400/0 to-neon/0 transition-all duration-700 group-hover:from-aurora-400/10 group-hover:via-aurora-400/5 group-hover:to-neon/10 rounded-[48px]" aria-hidden />

      {/* Floating medical icons */}
      <motion.div
        className="absolute left-10 top-20 text-aurora-400/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Stethoscope size={60} className="group-hover:text-aurora-400/40 transition-colors duration-500" />
      </motion.div>

      <motion.div
        className="absolute right-20 top-32 text-neon/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Pill size={50} className="group-hover:text-neon/40 transition-colors duration-500" />
      </motion.div>

      <motion.div
        className="absolute left-1/4 bottom-32 text-aurora-400/15"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Sparkles size={45} className="group-hover:text-aurora-400/35 transition-colors duration-500" />
      </motion.div>

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-6">
          <motion.span
            className="group/badge inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-aurora-400/50 hover:bg-aurora-400/10 hover:text-aurora-100 hover:shadow-[0_0_20px_rgba(63,180,255,0.3)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeartPulse size={12} className="text-aurora-400 group-hover/badge:animate-pulse" />
            One Health · Stewardship · Edukasi Publik
            <ShieldCheck size={12} className="text-aurora-400 group-hover/badge:animate-pulse" />
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="space-y-4"
          >
            <h1 className="font-premium text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              PharmaWise-AMR
            </h1>
            <h2 className="gradient-text text-glow text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
              Antimicrobial Stewardship Portal <br className="hidden sm:block" />& Public Education Hub
            </h2>
          </motion.div>

          <motion.div
            className="max-w-3xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="text-base leading-relaxed text-white/80 md:text-lg md:leading-relaxed">
              <span className="font-semibold text-white">Platform klinis berbasis data</span> (dengan opsi AI/ML) yang dirancang untuk kolaborasi farmasis, tenaga kesehatan, dan masyarakat.
            </p>
            <p className="text-base leading-relaxed text-white/75 md:text-lg md:leading-relaxed">
              Sistem terintegrasi untuk <span className="text-aurora-300">menilai resep</span>, <span className="text-aurora-300">memicu aksi stewardship</span>, dan menjadi <span className="text-aurora-300">gerbang edukasi publik</span> agar penggunaan antimikroba lebih bijak sekaligus mencegah resistensi AMR.
            </p>
            <div className="flex items-start gap-3 rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4">
              <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
              <p className="text-sm leading-relaxed text-white/85">
                <span className="font-semibold text-white">Farmasis bukan hanya dispenser</span> — tetapi steward penggunaan antibiotik dan jembatan edukasi bagi pasien serta publik.
              </p>
            </div>
          </motion.div>


          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, idx) => {
              const icons = [Activity, MessageSquare, GraduationCap];
              const Icon = icons[idx] || Activity;
              const iconColors = ["text-aurora-400", "text-neon", "text-purple-400"];

              return (
                <motion.div
                  key={stat.label}
                  className="group/stat glow-effect relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-4 text-center transition-all duration-500 hover:border-aurora-400/50 hover:bg-gradient-to-br hover:from-white/10 hover:to-aurora-400/10 hover:shadow-[0_0_30px_rgba(63,180,255,0.4)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                >
                  {/* Icon overlay on hover */}
                  <motion.div
                    className={`absolute right-4 top-4 ${iconColors[idx]} opacity-0 transition-opacity duration-300 group-hover/stat:opacity-20`}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Icon size={40} />
                  </motion.div>

                  <p className="relative text-2xl font-semibold text-white transition-all duration-300 group-hover/stat:text-aurora-100">
                    <AnimatedCounter value={stat.value} suffix="+" />
                  </p>
                  <p className="relative text-xs uppercase tracking-[0.5em] text-white/50 transition-all duration-300 group-hover/stat:text-white/70">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Centered Luncurkan App Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/workspace"
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:shadow-purple-400/70 hover:shadow-3xl border-2 border-purple-400/50 hover:border-purple-300"
              >
                <Rocket className="h-6 w-6" />
                Luncurkan App
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <ScrollReveal animation="slideLeft" delay={0.3}>
          <motion.div
            className="glass-panel glow-effect group/panel relative h-full rounded-[32px] border border-white/10 p-6 transition-all duration-500 hover:border-aurora-400/30 hover:shadow-[0_0_40px_rgba(63,180,255,0.3)]"
            whileHover={{ scale: 1.02 }}
          >
            {/* Dashboard Preview Image */}
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] w-full"
              >
                <Image
                  src="/img/ui-dashboard-data-farmasi-stewardship.png"
                  alt="Dashboard Preview - PharmaWise AMR"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04060e]/90 via-[#04060e]/20 to-transparent" />
              </motion.div>
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 group-hover/panel:text-aurora-300">Role gateway</p>
            <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover/panel:text-aurora-100">
              Cukup pilih persona
            </h3>
            <p className="mt-2 text-sm text-white/70 transition-colors duration-300 group-hover/panel:text-white/80">
              Tanpa kredensial pun, juri/farmasis/admin langsung melihat sandbox penuh insight. Pengguna biasa & dummy
              presenter menyimak empty state untuk membayangkan dampak di organisasi masing-masing.
            </p>

            <motion.div
              className="mt-6 rounded-2xl border border-aurora-400/40 bg-aurora-400/10 px-4 py-3 text-sm text-aurora-100 transition-all duration-300 group-hover/panel:border-aurora-400/60 group-hover/panel:bg-aurora-400/15 group-hover/panel:shadow-[0_0_15px_rgba(63,180,255,0.3)]"
              whileHover={{ scale: 1.02 }}
            >
              Demo auto-switch: juri · farmasis · admin = data dummy kaya | pengguna biasa = canvas kosong.
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Enhanced floating gradient orbs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-aurora-400/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-neon/30 blur-[120px] floating" />
    </section>
  );
}

