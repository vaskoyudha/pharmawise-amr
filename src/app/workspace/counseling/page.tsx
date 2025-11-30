import { CounselingGenerator } from '@/components/workspace/CounselingGenerator';

// Demo prescription data
const demoPrescription = {
  diagnosis: 'Pneumonia Komunitas',
  antibiotic: 'Amoxicillin',
  doseMg: 500,
  frequency: '3x',
  durationDays: 7,
};

export default function CounselingPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul B</p>
        <h1 className="font-display text-3xl text-white">Counseling Script Generator</h1>
        <p className="text-white/60">Generate patient counseling scripts with AI assistance</p>
      </div>

      <CounselingGenerator
        prescriptionId="demo-prescription-1"
        prescriptionData={demoPrescription}
        userId="demo-user"
      />
    </section>
  );
}
