import { DemandForm } from "@/components/workspace/forms/DemandForm";

export default function DemandPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul E</p>
        <h1 className="font-display text-3xl text-white">Demand Reporting & Prediction</h1>
        <p className="text-white/60">Catat permintaan antibiotik tidak rasional dan dapatkan forecast 4–8 minggu.</p>
      </div>
      <DemandForm />
    </section>
  );
}

