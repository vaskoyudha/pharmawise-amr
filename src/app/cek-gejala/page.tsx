import { ChatbotPanel } from "@/components/public/ChatbotPanel";
import { Card } from "@/components/ui/card";

export default function CekGejalaPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Cek Gejala</h1>
        <p className="text-white/60">Dapatkan edukasi self-care vs rujukan tanpa menyebut nama antibiotik.</p>
      </header>
      <Card className="rounded-[32px] space-y-4">
        <h2 className="text-2xl font-semibold text-white">Chatbot Triage</h2>
        <ChatbotPanel mode="cekGejala" />
      </Card>
      <section className="grid gap-4 md:grid-cols-3">
        {["Istirahat & hidrasi", "Pantau demam >3 hari", "Cari IGD jika sesak"].map((tip) => (
          <div key={tip} className="glass-panel rounded-3xl border border-white/10 p-4 text-sm text-white/70">
            {tip}
          </div>
        ))}
      </section>
    </main>
  );
}

