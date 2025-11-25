import { CounselingForm } from "@/components/workspace/forms/CounselingForm";

export default function CounselingPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul B</p>
        <h1 className="font-display text-3xl text-white">Counseling Script Generator</h1>
        <p className="text-white/60">Script konseling 20 detik, 60 detik, hingga pesan WhatsApp, otomatis rapi.</p>
      </div>
      <CounselingForm />
    </section>
  );
}

