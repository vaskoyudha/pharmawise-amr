import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Pengaturan</p>
        <h1 className="font-display text-3xl text-white">Consent & Guardrails</h1>
        <p className="text-white/60">Atur guideline reference, guardrails AI, dan integrasi eksternal.</p>
      </div>
      <Card className="rounded-3xl space-y-4">
        <div>
          <p className="text-sm text-white/60">Guideline URL</p>
          <Input placeholder="https://..." />
        </div>
        <div>
          <p className="text-sm text-white/60">Consent Text</p>
          <Input placeholder="Saya setuju..." />
        </div>
        <Button>Simpan</Button>
      </Card>
    </section>
  );
}

