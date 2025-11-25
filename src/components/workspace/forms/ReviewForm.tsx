"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ReviewResult = {
  score: number;
  riskLevel: "green" | "yellow" | "red";
  explainability: { label: string; severity: "info" | "warning" | "danger" }[];
  suggestions: string[];
};

const riskColors = {
  green: "text-emerald-300 border-emerald-400/40",
  yellow: "text-amber-200 border-amber-300/40",
  red: "text-rose-200 border-rose-300/40",
};

export function ReviewForm() {
  const [form, setForm] = useState({
    diagnosis: "",
    antibiotic: "",
    doseMg: 500,
    frequency: "3x1",
    durationDays: 5,
    route: "oral",
    patientAge: 30,
    patientWeight: 60,
    allergies: "",
  });

  const mutation = useMutation<ReviewResult, Error, typeof form>({
    mutationFn: async (payload) => {
      const response = await fetch("/api/review/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, allergies: payload.allergies.split(",").map((s) => s.trim()) }),
      });
      if (!response.ok) {
        throw new Error("Gagal menghitung skor");
      }
      return response.json();
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 rounded-3xl">
        <div>
          <p className="text-sm text-white/60">Input Resep</p>
          <h3 className="text-2xl font-semibold text-white">Isikan data minimal</h3>
        </div>
        <div className="grid gap-3">
          <Textarea
            placeholder="Diagnosis / keluhan singkat"
            value={form.diagnosis}
            onChange={(e) => setForm((prev) => ({ ...prev, diagnosis: e.target.value }))}
          />
          <Input
            placeholder="Antibiotik"
            value={form.antibiotic}
            onChange={(e) => setForm((prev) => ({ ...prev, antibiotic: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Dose mg"
              value={form.doseMg}
              onChange={(e) => setForm((prev) => ({ ...prev, doseMg: Number(e.target.value) }))}
            />
            <Input
              placeholder="Frekuensi"
              value={form.frequency}
              onChange={(e) => setForm((prev) => ({ ...prev, frequency: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Durasi (hari)"
              value={form.durationDays}
              onChange={(e) => setForm((prev) => ({ ...prev, durationDays: Number(e.target.value) }))}
            />
            <Input
              placeholder="Route"
              value={form.route}
              onChange={(e) => setForm((prev) => ({ ...prev, route: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Usia"
              value={form.patientAge}
              onChange={(e) => setForm((prev) => ({ ...prev, patientAge: Number(e.target.value) }))}
            />
            <Input
              type="number"
              placeholder="Berat Badan"
              value={form.patientWeight}
              onChange={(e) => setForm((prev) => ({ ...prev, patientWeight: Number(e.target.value) }))}
            />
          </div>
          <Input
            placeholder="Alergi (pisahkan dengan koma)"
            value={form.allergies}
            onChange={(e) => setForm((prev) => ({ ...prev, allergies: e.target.value }))}
          />
        </div>
        <Button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}>
          {mutation.isPending ? "Menghitung..." : "Hitung Appropriateness Score"}
        </Button>
      </Card>
      <Card className="space-y-4 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Hasil AI</p>
            <h3 className="text-2xl font-semibold text-white">Explainability</h3>
          </div>
          {mutation.data && (
            <div className={`rounded-full border px-4 py-1 text-sm ${riskColors[mutation.data.riskLevel]}`}>
              Skor {mutation.data.score}
            </div>
          )}
        </div>
        {mutation.isIdle && <p className="text-white/50">Belum ada skor. Isi data dan jalankan AI.</p>}
        {mutation.isError && <p className="text-rose-200">{mutation.error.message}</p>}
        {mutation.data && (
          <div className="space-y-4">
            <div className="space-y-2">
              {mutation.data.explainability.map((reason) => (
                <Badge key={reason.label} variant={reason.severity === "danger" ? "danger" : reason.severity === "warning" ? "warning" : "default"}>
                  {reason.label}
                </Badge>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-white/60">Suggested Actions</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-white/80">
                {mutation.data.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-3">
                <Button variant="primary" className="flex-1 bg-emerald-500/80">
                  Setujui + Konseling
                </Button>
                <Button variant="secondary" className="flex-1">
                  Klarifikasi Dokter
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

