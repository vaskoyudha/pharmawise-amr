import { ChatbotPanel } from "@/components/public/ChatbotPanel";
import { Card } from "@/components/ui/card";

const faq = [
  {
    question: "Apakah antibiotik perlu untuk flu?",
    answer: "Mayoritas flu disebabkan virus sehingga cukup self-care dan hidrasi.",
  },
  {
    question: "Bolehkah simpan antibiotik sisa?",
    answer: "Tidak. Antibiotik harus dihabiskan sesuai anjuran untuk mencegah resistensi.",
  },
];

export default function TanyaAntibiotikPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Tanya Antibiotik</h1>
        <p className="text-white/60">FAQ dinamis untuk kasus populer seperti flu, diare, hingga sakit gigi.</p>
      </header>
      <Card className="rounded-[32px] space-y-4">
        <h2 className="text-2xl font-semibold text-white">Chatbot Edukasi</h2>
        <ChatbotPanel mode="tanyaAntibiotik" />
      </Card>
      <section className="grid gap-4 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.question} className="glass-panel rounded-3xl border border-white/10 p-4">
            <h3 className="text-white">{item.question}</h3>
            <p className="text-sm text-white/70">{item.answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

