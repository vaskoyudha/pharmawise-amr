const facts = [
  "Antibiotik tidak bekerja untuk virus, termasuk flu dan sebagian besar batuk pilek.",
  "Menghentikan antibiotik sebelum waktunya meningkatkan risiko resistensi.",
  "Gunakan antibiotik hanya bila diresepkan oleh tenaga kesehatan berwenang.",
  "Farmasis berhak menolak permintaan antibiotik tanpa resep demi keselamatan pasien.",
];

export default function FaktaAMRPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Fakta AMR</h1>
        <p className="text-white/60">Materi satu layar, satu pesan, mudah dibagikan di media sosial.</p>
      </header>
      <section className="space-y-4">
        {facts.map((fact, index) => (
          <article key={fact} className="glass-panel rounded-[32px] border border-white/10 p-6">
            <p className="text-xs uppercase text-white/40">Fakta #{index + 1}</p>
            <p className="mt-2 text-lg text-white/80">{fact}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

