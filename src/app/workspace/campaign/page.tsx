"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRole } from "@/components/providers/role-context";
import { useState } from "react";

const formats = ["Poster A3", "IG Carousel", "Video 30 detik", "WhatsApp Blast"];
const tones = ["Edukasi", "Empatik", "Urgensi tinggi", "Fun fact"];

const scheduledCampaigns = [
  { title: "ISPA Rainy Season", channel: "IG Carousel", date: "20 Nov" },
  { title: "Self-medication Alert", channel: "Video 30s", date: "25 Nov" },
];

const recommendations = [
  { topic: "Lonjakan permintaan antibiotik untuk flu", format: "Poster", reason: "Pressure index tinggi di Jakarta" },
  { topic: "Edukasi diare anak", format: "IG Carousel", reason: "Musim liburan" },
];

export default function CampaignPage() {
  const { mode } = useRole();
  const isDemo = mode === "demo";
  const [script, setScript] = useState("Halo! Antibiotik hanya bekerja untuk bakteri, bukan flu. Yuk edukasi pelanggan hari ini.");

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Campaign Toolkit</p>
        <h1 className="font-display text-3xl text-white">Builder + rekomendasi konten</h1>
        <p className="text-white/60">Susun poster, video, dan pesan empatik sesuai tren permintaan lokal.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Campaign Builder</p>
              <h3 className="text-2xl font-semibold text-white">Generate materi</h3>
            </div>
            <Button variant="secondary">Download aset</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Input list="format-list" placeholder="Format" defaultValue={formats[0]} />
            <Input list="tone-list" placeholder="Tone" defaultValue={tones[0]} />
          </div>
          <Textarea rows={6} value={script} onChange={(e) => setScript(e.target.value)} />
          <div className="flex gap-3">
            <Button className="flex-1">Generate ulang</Button>
            <Button variant="secondary" className="flex-1">
              Simpan ke toolkit
            </Button>
          </div>
          <datalist id="format-list">
            {formats.map((format) => (
              <option key={format} value={format} />
            ))}
          </datalist>
          <datalist id="tone-list">
            {tones.map((tone) => (
              <option key={tone} value={tone} />
            ))}
          </datalist>
        </Card>
        <Card className="rounded-3xl">
          <p className="text-sm text-white/60">Jadwal rilis</p>
          {isDemo ? (
            <div className="mt-4 space-y-3">
              {scheduledCampaigns.map((campaign) => (
                <div key={campaign.title} className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-white">{campaign.title}</p>
                  <p className="text-xs text-white/50">
                    {campaign.channel} · {campaign.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/60">Belum ada jadwal. Tambahkan kampanye pertama Anda untuk melihat kalender.</p>
          )}
        </Card>
      </div>
      <Card className="rounded-3xl">
        <p className="text-sm text-white/60">Rekomendasi otomatis</p>
        {isDemo ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {recommendations.map((item) => (
              <div key={item.topic} className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-white">{item.topic}</p>
                <p className="text-xs text-white/50">{item.format}</p>
                <p className="text-xs text-white/60">{item.reason}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-white/60">Hubungkan data demand untuk mendapatkan rekomendasi otomatis.</p>
        )}
      </Card>
    </section>
  );
}







