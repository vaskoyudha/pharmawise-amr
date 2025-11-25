"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { demandHeatmap } from "@/lib/data/dashboard";
import { useRole } from "@/components/providers/role-context";

const demandTrend = Array.from({ length: 12 }).map((_, idx) => ({
  week: `W${idx + 1}`,
  pressure: 55 + Math.round(Math.sin(idx / 2) * 12) + idx,
}));

export function DemandChart() {
  const { mode } = useRole();

  if (mode !== "demo") {
    return (
      <Card className="flex flex-col gap-4 rounded-3xl border border-dashed border-white/20 p-6 text-white/60">
        <p className="text-sm uppercase tracking-[0.3em]">Demand Index</p>
        <p className="text-2xl font-semibold text-white">Belum ada data</p>
        <p className="text-sm text-white/50">
          Pengguna biasa akan melihat canvas kosong di sini sampai data mereka tersambung. Pilih role juri/farmasis/admin untuk
          meninjau dummy forecast.
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-6 rounded-3xl">
      <div>
        <p className="text-sm text-white/60">Demand Index Forecast</p>
        <p className="text-2xl font-semibold text-white">4–8 minggu ke depan</p>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demandTrend}>
            <defs>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5EFCE8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3FB4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" stroke="#ffffff40" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "rgba(10,15,28,0.85)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <Area type="monotone" dataKey="pressure" stroke="#5EFCE8" fill="url(#colorDemand)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {demandHeatmap.map((region) => (
          <div key={region.region} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>{region.region}</span>
              <span className="text-lg font-semibold text-white">{region.score}</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-aurora-300 to-purple-400" style={{ width: `${region.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

