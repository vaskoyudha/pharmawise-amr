import { AlertsFeed } from "@/components/workspace/AlertsFeed";
import { Card } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul F</p>
        <h1 className="font-display text-3xl text-white">AMR Early Warning</h1>
        <p className="text-white/60">Konsolidasi sinyal kegagalan terapi dari apotek untuk alert regulator.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AlertsFeed />
        <Card className="rounded-3xl">
          <p className="text-sm text-white/60">Mini Map / Heatmap placeholder</p>
          <div className="mt-4 h-64 rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent">
            <div className="flex h-full w-full items-center justify-center text-white/40">Map soon</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

