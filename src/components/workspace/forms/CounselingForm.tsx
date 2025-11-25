"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type CounselingResult = {
  script: string;
  keyPoints: string[];
};

export function CounselingForm() {
  const [form, setForm] = useState({
    antibiotic: "Amoxicillin",
    doseMg: 500,
    frequency: "3x1",
    durationDays: 5,
    route: "oral",
    format: "short",
    literacyLevel: "standard",
    language: "id",
  });
  const [editableScript, setEditableScript] = useState("");

  const mutation = useMutation<CounselingResult, Error, typeof form>({
    mutationFn: async (payload) => {
      const response = await fetch("/api/counseling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Gagal membuat skrip");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setEditableScript(data.script);
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 rounded-3xl">
        <div>
          <p className="text-sm text-white/60">Input Profil Pasien</p>
          <h3 className="text-2xl font-semibold text-white">Personalisasi Konseling</h3>
        </div>
        <div className="grid gap-3">
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
              placeholder="Durasi"
              value={form.durationDays}
              onChange={(e) => setForm((prev) => ({ ...prev, durationDays: Number(e.target.value) }))}
            />
            <Input
              placeholder="Route"
              value={form.route}
              onChange={(e) => setForm((prev) => ({ ...prev, route: e.target.value }))}
            />
          </div>
          <Select value={form.format} onChange={(e) => setForm((prev) => ({ ...prev, format: e.target.value }))}>
            <option value="short">Ringkas 20 detik</option>
            <option value="standard">Standar 60 detik</option>
            <option value="whatsapp">Pesan WhatsApp</option>
          </Select>
          <Select value={form.literacyLevel} onChange={(e) => setForm((prev) => ({ ...prev, literacyLevel: e.target.value }))}>
            <option value="basic">Literasi dasar</option>
            <option value="standard">Literasi umum</option>
            <option value="advanced">Literasi tinggi</option>
          </Select>
          <Select value={form.language} onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </Select>
        </div>
        <Button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}>
          {mutation.isPending ? "Membuat skrip..." : "Generate Konseling"}
        </Button>
      </Card>
      <Card className="space-y-4 rounded-3xl">
        <div>
          <p className="text-sm text-white/60">Preview</p>
          <h3 className="text-2xl font-semibold text-white">Script AI + edit kilat</h3>
        </div>
        {mutation.isIdle && <p className="text-white/50">Pilih format untuk membuat skrip personalisasi.</p>}
        {mutation.isError && <p className="text-rose-200">{mutation.error.message}</p>}
        {mutation.data && (
          <>
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Textarea rows={8} value={editableScript} onChange={(e) => setEditableScript(e.target.value)} />
            </motion.div>
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {mutation.data.keyPoints.map((point) => (
                <span key={point} className="rounded-full border border-white/10 px-3 py-1">
                  {point}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Copy</Button>
              <Button variant="secondary" className="flex-1">
                Download PDF
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

