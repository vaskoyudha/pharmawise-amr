"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <motion.section
      className="rounded-[40px] border border-white/10 bg-gradient-to-r from-aurora-500/30 via-purple-600/20 to-midnight/40 p-10 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl text-white">Siap bawa AMS komunitas ke level berikutnya?</h2>
      <p className="mt-3 text-white/70">
        Jalankan PharmaWise-AMR, sinkronkan dengan Firebase, dan deploy ke Vercel hanya dalam hitungan menit.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/workspace">Masuk Workspace</Link>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <Link href="https://github.com/" target="_blank">
            Lihat Dokumentasi
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}

