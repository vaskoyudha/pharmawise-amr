"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRole } from "@/components/providers/role-context";

const roles = [
  {
    key: "juri",
    name: "Juri",
    description: "Langsung loncat ke demo penuh data dummy tanpa login. Fokus menilai value & UX.",
    badge: "No Login",
  },
  {
    key: "farmasis",
    name: "Farmasis",
    description: "Akses sandbox dengan privilege yang sama seperti admin untuk eksplor modul klinis.",
    badge: "Sandbox penuh",
  },
  {
    key: "admin",
    name: "Admin",
    description: "Melihat data dummy aggregator (dashboard, alert, laporan) dan mengatur integrasi.",
    badge: "God mode",
  },
  {
    key: "pengguna",
    name: "Pengguna biasa",
    description: "Melihat kanvas kosong, bisa registrasi untuk menyimpan data nyata mereka.",
    badge: "Empty state",
  },
  {
    key: "dummy",
    name: "Dummy presenter",
    description: "Mode autopilot untuk pitch deck—storyboard & animasi otomatis.",
    badge: "Auto pitch",
  },
] as const;

export function RoleShowcase() {
  const { chooseRole } = useRole();

  return (
    <section id="role-tour" className="space-y-6">
      <div className="flex flex-col gap-3 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">Role Selector</p>
        <h2 className="font-display text-3xl text-white">Satu portal, lima pengalaman berbeda</h2>
        <p className="text-white/60">
          Setelah klik role ini, kami jadwalkan data dummy atau empty state yang sesuai. Juri + farmasis + admin merasakan seluruh
          fitur, pengguna biasa melihat tempat kosong yang siap diisi datanya.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role, idx) => (
          <motion.div
            key={role.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="flex h-full flex-col justify-between rounded-[30px] border border-white/10 p-5">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-aurora-200">{role.badge}</span>
                <h3 className="mt-3 text-2xl font-semibold text-white">{role.name}</h3>
                <p className="mt-2 text-sm text-white/70">{role.description}</p>
              </div>
              <Button variant="secondary" className="mt-6 rounded-2xl" onClick={() => chooseRole(role.key)}>
                Pilih {role.name}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

