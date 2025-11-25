"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing } from "lucide-react";
import { useRole } from "@/components/providers/role-context";

const alerts = [
  {
    title: "Cluster kegagalan terapi",
    region: "Jakarta Timur",
    detail: "3 laporan amoksisilin tidak mempan dalam 5 hari",
    severity: "danger",
    time: "2 jam lalu",
  },
  {
    title: "Tekanan permintaan tinggi",
    region: "Bandung",
    detail: "Pasien meminta antibiotik untuk flu musiman",
    severity: "warning",
    time: "Kemarin",
  },
];

export function AlertsFeed() {
  const { mode } = useRole();

  if (mode !== "demo") {
    return (
      <Card className="rounded-3xl border border-dashed border-white/20 p-6">
        <div className="flex items-center gap-2">
          <BellRing size={18} className="text-aurora-200" />
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Early Warning</p>
        </div>
        <p className="mt-3 text-sm text-white/60">
          Belum ada laporan kegagalan terapi untuk role ini. Sambungkan data lapangan Anda atau pilih role demo untuk melihat
          contoh alert.
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl">
      <div className="flex items-center gap-2">
        <BellRing size={18} className="text-aurora-200" />
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Early Warning</p>
      </div>
      <div className="mt-4 space-y-4">
        {alerts.map((alert) => (
          <div key={alert.title} className="rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-white">{alert.title}</p>
              <Badge variant={alert.severity === "danger" ? "danger" : "warning"}>{alert.region}</Badge>
            </div>
            <p className="mt-2 text-sm text-white/70">{alert.detail}</p>
            <span className="text-xs text-white/40">{alert.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

