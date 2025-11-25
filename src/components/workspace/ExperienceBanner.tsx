"use client";

import { useRole } from "@/components/providers/role-context";

const roleCopy: Record<string, string> = {
  juri: "Anda sedang di mode Juri — semua data berikut adalah dummy curated untuk penjurian.",
  farmasis: "Mode Farmasis aktif. Silakan jelajah semua modul dengan data contoh lengkap.",
  admin: "Mode Admin memunculkan seluruh dashboard dan pengaturan dummy.",
  dummy: "Mode Dummy Presenter: siap untuk autopilot demo.",
  pengguna: "Anda pengguna biasa. Tautkan data asli untuk mengisi dashboard kosong ini.",
};

export function ExperienceBanner() {
  const { role, mode, personaName } = useRole();

  if (!role) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
      <p className="font-semibold text-white">
        {personaName ? `${personaName} · ` : ""}
        Role: {role.charAt(0).toUpperCase() + role.slice(1)} · Mode {mode === "demo" ? "Demo data" : "Empty state"}
      </p>
      <p>{roleCopy[role]}</p>
    </div>
  );
}

