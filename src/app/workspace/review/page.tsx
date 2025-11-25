import { ReviewForm } from "@/components/workspace/forms/ReviewForm";

export default function ReviewPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul A</p>
        <h1 className="font-display text-3xl text-white">Prescription Review Assistant</h1>
        <p className="text-white/60">Input minimal, dapatkan skor 0–100 dengan alasan transparan.</p>
      </div>
      <ReviewForm />
    </section>
  );
}

