"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    q: "Antibiotik bekerja untuk?",
    options: ["Virus", "Bakteri", "Semua jenis kuman"],
    answer: 1,
  },
  {
    q: "Kapan boleh minta antibiotik tanpa resep?",
    options: ["Saat flu berat", "Saat dokter meresepkan", "Saat stok di rumah habis"],
    answer: 1,
  },
  {
    q: "Apa yang harus dilakukan jika gejala memburuk?",
    options: ["Tambah dosis sendiri", "Hentikan obat", "Konsultasi tenaga kesehatan"],
    answer: 2,
  },
];

const leaderboard = [
  { name: "Alya", score: 300 },
  { name: "Rizky", score: 280 },
  { name: "Nadia", score: 260 },
];

export default function QuizLiterasiPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  const handleAnswer = (index: number) => {
    if (current && index === current.answer) {
      setScore((prev) => prev + 100);
    }
    if (step === questions.length - 1) {
      setFinished(true);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Quiz Literasi Antibiotik</h1>
        <p className="text-white/60">Jawab 3 pertanyaan, dapatkan skor, dan ajak teman untuk masuk leaderboard wilayahmu.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
        <Card className="rounded-[32px] space-y-4">
          {finished ? (
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">Skor kamu: {score}</p>
              <p className="text-white/60">Bagikan hasilmu dan ajak keluarga memahami antibiotik.</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Main lagi
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-white/60">
                Pertanyaan {step + 1} / {questions.length}
              </p>
              <h2 className="text-2xl font-semibold text-white">{current.q}</h2>
              <div className="space-y-3">
                {current.options.map((option, idx) => (
                  <Button key={option} variant="secondary" className="w-full justify-start" onClick={() => handleAnswer(idx)}>
                    {option}
                  </Button>
                ))}
              </div>
            </>
          )}
        </Card>
        <Card className="rounded-[32px]">
          <p className="text-sm text-white/60">Leaderboard wilayah</p>
          <div className="mt-4 space-y-3">
            {leaderboard.map((entry, idx) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80">
                <span>{idx + 1}. {entry.name}</span>
                <span>{entry.score}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/60">Skor kamu akan muncul di sini setelah ikut quiz.</p>
        </Card>
      </div>
    </main>
  );
}







