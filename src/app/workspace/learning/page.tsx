import { LearningTimeline } from "@/components/workspace/LearningTimeline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRole } from "@/components/providers/role-context";

const modules = [
  { title: "Primer AMS", duration: "7 menit", status: "Selesai" },
  { title: "Audit Resep Antibiotik", duration: "6 menit", status: "Berjalan" },
  { title: "Studi Kasus Apotek", duration: "5 menit", status: "Next" },
];

export default function LearningPage() {
  const { mode } = useRole();
  const isDemo = mode === "demo";

  const scormPackages = [
    { name: "SCORM - Stewardship Basics", version: "SCORM 1.2", size: "24 MB" },
    { name: "xAPI Case Study", version: "xAPI", size: "12 MB" },
  ];

  const badges = [
    { title: "OpenBadge · AMS Navigator", date: "12 Nov 2025" },
    { title: "OpenBadge · Counselor Pro", date: "18 Nov 2025" },
  ];

  const webinars = [
    { title: "Microlearning Live #1", speaker: "dr. Rika", time: "20 Nov · 19.00" },
    { title: "Audit Resep Masterclass", speaker: "Apt. Farhan", time: "27 Nov · 15.00" },
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul G</p>
        <h1 className="font-display text-3xl text-white">Micro-Credential AMS</h1>
        <p className="text-white/60">AI personal learning path berdasarkan pretest cepat.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <LearningTimeline />
        <Card className="rounded-3xl">
          <p className="text-sm text-white/60">Modul aktif</p>
          <div className="mt-4 space-y-3">
            {modules.map((module) => (
              <div key={module.title} className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-white">{module.title}</p>
                <p className="text-xs text-white/50">{module.duration} · {module.status}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">SCORM/xAPI Library</p>
              <h3 className="text-2xl font-semibold text-white">Unggah konten microlearning</h3>
            </div>
            <Button variant="secondary">Upload paket</Button>
          </div>
          {isDemo ? (
            <div className="mt-4 space-y-3">
              {scormPackages.map((pack) => (
                <div key={pack.name} className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-white">{pack.name}</p>
                  <p className="text-xs text-white/50">{pack.version} · {pack.size}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/60">Belum ada paket. Upload file SCORM/xAPI Anda untuk memulai kelas.</p>
          )}
        </Card>
        <Card className="rounded-3xl">
          <p className="text-sm text-white/60">Sertifikat OpenBadges</p>
          {isDemo ? (
            <div className="mt-4 space-y-3">
              {badges.map((badge) => (
                <div key={badge.title} className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-white">{badge.title}</p>
                  <p className="text-xs text-white/50">Diterima {badge.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/60">Belum ada badge. Ikuti modul untuk mendapatkan sertifikat digital.</p>
          )}
        </Card>
      </div>
      <Card className="rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Webinar & Live Mentoring</p>
            <h3 className="text-2xl font-semibold text-white">Jadwalkan sesi langsung</h3>
          </div>
          <Button variant="primary">Tambah jadwal</Button>
        </div>
        {isDemo ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {webinars.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-white">{item.title}</p>
                <p className="text-xs text-white/50">{item.speaker} · {item.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-white/60">Belum ada webinar terjadwal. Gunakan tombol di atas untuk menambahkan.</p>
        )}
      </Card>
    </section>
  );
}

