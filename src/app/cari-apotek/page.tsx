const pharmacies = [
  { name: "Apotek Sehat Sentosa", city: "Jakarta", contact: "0812-1111-2222" },
  { name: "Apotek Harmoni", city: "Bandung", contact: "022-1234567" },
  { name: "Apotek Mitra AMR", city: "Surabaya", contact: "031-554433" },
];

export default function CariApotekPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Cari Apotek Stewardship</h1>
        <p className="text-white/60">Temukan apotek yang siap memberi edukasi antibiotik rasional.</p>
      </header>
      <section className="space-y-4">
        {pharmacies.map((pharmacy) => (
          <article key={pharmacy.name} className="glass-panel rounded-[32px] border border-white/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl text-white">{pharmacy.name}</h3>
                <p className="text-sm text-white/60">{pharmacy.city}</p>
              </div>
              <a href={`tel:${pharmacy.contact}`} className="text-sm text-aurora-200 underline">
                {pharmacy.contact}
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

