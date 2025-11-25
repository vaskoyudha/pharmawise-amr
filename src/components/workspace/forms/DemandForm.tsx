"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ForecastPoint = { week: string; pressureIndex: number };

export function DemandForm() {
  const [form, setForm] = useState({ category: "", drugRequested: "", region: "", note: "" });

  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    },
  });

  const forecast = useQuery({
    queryKey: ["demand-forecast", form.region || "Jakarta"],
    queryFn: async () => {
      const response = await fetch("/api/demand-forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: form.region || "Jakarta", horizonWeeks: 8 }),
      });
      if (!response.ok) throw new Error("Forecast gagal dimuat");
      return response.json() as Promise<{ points: ForecastPoint[] }>;
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 rounded-3xl">
        <div>
          <p className="text-sm text-white/60">Catat tekanan permintaan</p>
          <h3 className="text-2xl font-semibold text-white">Laporan 20 detik</h3>
        </div>
        <Input placeholder="Kategori (flu, diare...)" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} />
        <Input placeholder="Antibiotik diminta" value={form.drugRequested} onChange={(e) => setForm((prev) => ({ ...prev, drugRequested: e.target.value }))} />
        <Input placeholder="Wilayah" value={form.region} onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))} />
        <Textarea rows={4} placeholder="Catatan singkat" value={form.note} onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))} />
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? "Mengirim..." : "Kirim Laporan"}
        </Button>
        {mutation.isSuccess && <p className="text-emerald-200">Terkirim. Terima kasih!</p>}
      </Card>
      <Card className="space-y-4 rounded-3xl">
        <div>
          <p className="text-sm text-white/60">Forecast</p>
          <h3 className="text-2xl font-semibold text-white">Pressure Index wilayah</h3>
        </div>
        {forecast.isLoading && <p className="text-white/50">Memuat forecast...</p>}
        {forecast.isError && <p className="text-rose-200">{(forecast.error as Error).message}</p>}
        {forecast.data && (
          <div className="space-y-3">
            {forecast.data.points.map((point) => (
              <div key={point.week} className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
                <span className="flex-1">{point.week}</span>
                <span className="text-white">{point.pressureIndex}</span>
                <div className="h-2 w-32 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-aurora-300 to-purple-400" style={{ width: `${point.pressureIndex / 1.2}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

