"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WelcomeFloatingCard() {
  const [isOpen, setIsOpen] = useState(true);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/95 to-aurora-950/40 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.9)]"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-aurora-500/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-5 h-56 w-56 rounded-full bg-purple-500/30 blur-[120px]" />

        <div className="relative grid gap-5 overflow-y-auto p-5 md:p-6 md:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-aurora-200">
              Pharmawise-AMR
            </div>
            <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
              Selamat datang, Juri & Panitia Lomba Essay Nasional UNDANA 2025
            </h2>
            <p className="mt-3 text-xs text-white/80 md:text-sm">
              Platform ini dikembangkan sebagai inovasi digital pendukung Lomba Essay Nasional 2025
              yang diselenggarakan oleh Fakultas Kedokteran & Kedokteran Hewan Universitas Nusa
              Cendana (UNDANA). Pharmawise-AMR memvisualisasikan bagaimana teknologi memperkuat
              kolaborasi lintas sektor menghadapi Antimicrobial Resistance (AMR) selaras dengan
              pendekatan One Health.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/80">
              <p className="text-white">Tema utama kompetisi:</p>
              <p className="mt-1 text-xs font-semibold text-aurora-100 md:text-sm">
                “Strengthening One Health Collaboration to Combat Antimicrobial Resistance for
                Sustainable Human, Animal, and Pharmaceutical Care.”
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/80">
            <p className="text-white">Eksplorasi utama:</p>
            <ul className="mt-3 space-y-3 text-xs">
              <li className="flex gap-3 rounded-xl bg-slate-900/40 p-2">
                <span className="text-aurora-200">01</span>
                <div>
                  <p className="font-semibold text-white">Modul Literasi & Kampanye</p>
                  <p>Edukasi publik lintas sektor dengan konten interaktif.</p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl bg-slate-900/40 p-2">
                <span className="text-aurora-200">02</span>
                <div>
                  <p className="font-semibold text-white">Workspace Kolaboratif</p>
                  <p>Simulasi dashboard untuk juri, panitia, dan stakeholder kesehatan.</p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl bg-slate-900/40 p-2">
                <span className="text-aurora-200">03</span>
                <div>
                  <p className="font-semibold text-white">Analitik & Chatbot</p>
                  <p>Integrasi chatbot, surveilans permintaan antibiotik, dan review kebijakan.</p>
                </div>
              </li>
            </ul>

            <p className="mt-2 text-[10px] text-white/60">
              Seluruh detail lomba tersedia pada Guide Book resmi yang dapat diakses langsung.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/80">
            <p className="text-white">Profil Delegasi:</p>
            <div className="mt-3 flex flex-col items-center text-center">
              <div className="relative mb-2 h-20 w-20 overflow-hidden rounded-full border border-white/20 bg-slate-900/50">
                <span className="absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-[0.2em] text-white/50">
                  Foto
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Vasco Yudha Nodyatama Sera</p>
              <p className="mt-1 text-lg font-semibold text-white">Vasco Y. N. Sera</p>
            </div>
            <div className="mt-3 space-y-3 text-xs">
              <div className="rounded-xl bg-slate-900/40 p-2">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/60">NIM</p>
                <p className="text-xs font-semibold text-white">2404130013</p>
              </div>
              <div className="rounded-xl bg-slate-900/40 p-2">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/60">Universitas</p>
                <p className="text-xs font-semibold text-white">Universitas Negeri Semarang</p>
              </div>
              <div className="rounded-xl bg-slate-900/40 p-2">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/60">Program Studi</p>
                <p className="text-xs font-semibold text-white">Teknik Informatika</p>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-white/60">Pas foto akan ditambahkan begitu dokumen final tersedia.</p>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <Button onClick={handleDismiss} className="flex-1 min-w-[180px]">
                Mulai Jelajahi Platform
              </Button>
              <Button asChild variant="secondary" className="flex-1 min-w-[180px] border-white/30 text-white">
                <Link href="/guidebook.pdf" target="_blank" rel="noreferrer">
                  Lihat Guide Book
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


