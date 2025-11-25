"use client";

import { Card } from "@/components/ui/card";
import { learningTimeline } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/providers/role-context";

export function LearningTimeline() {
  const { mode } = useRole();

  if (mode !== "demo") {
    return (
      <Card className="rounded-3xl border border-dashed border-white/20 p-6 text-white/60">
        <p className="text-sm text-white/60">Learning Journey</p>
        <h3 className="text-2xl font-semibold text-white">Belum ada progres</h3>
        <p className="mt-3 text-sm">
          Pengguna biasa akan mulai dari nol begitu modul micro-credential aktif. Coba pilih role juri/farmasis/admin untuk
          melihat contoh dummy progress.
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl">
      <p className="text-sm text-white/60">Learning Journey</p>
      <h3 className="text-2xl font-semibold text-white">Micro-credential AMS</h3>
      <div className="mt-6 space-y-5">
        {learningTimeline.map((item, idx) => (
          <div key={item.title} className="flex items-start gap-4">
            <span
              className={cn(
                "mt-1 h-8 w-8 rounded-full border-2 text-center text-sm font-semibold leading-7",
                item.status === "completed"
                  ? "border-emerald-300 text-emerald-200"
                  : item.status === "active"
                  ? "border-aurora-300 text-aurora-100"
                  : "border-white/20 text-white/50"
              )}
            >
              {idx + 1}
            </span>
            <div>
              <p className="text-white">{item.title}</p>
              <p className="text-xs text-white/50">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

