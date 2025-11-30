import { PrescriptionReviewForm } from '@/components/workspace/PrescriptionReviewForm';

export default function WorkspaceReviewPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul A</p>
        <h1 className="font-display text-3xl text-white">Review Resep Antibiotik</h1>
        <p className="text-white/60">Sistem AI akan menganalisis kelayakan resep berdasarkan guideline dan evidence-based medicine</p>
      </div>

      <PrescriptionReviewForm />
    </section>
  );
}
