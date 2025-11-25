const assets = [
  { title: "Poster Flu", format: "A3 / PNG", theme: "ISPA", url: "#" },
  { title: "Kalimat Penolakan Empatik", format: "Script WhatsApp", theme: "Sakit gigi", url: "#" },
  { title: "Video 30 detik", format: "MP4", theme: "Self-medication", url: "#" },
];

export default function MateriKampanyePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Publik</p>
        <h1 className="font-display text-4xl text-white">Materi Kampanye</h1>
        <p className="text-white/60">Toolkit siap pakai untuk apotek menjalankan kampanye edukasi AMR.</p>
      </header>
      <section className="space-y-4">
        {assets.map((asset) => (
          <article key={asset.title} className="glass-panel rounded-[32px] border border-white/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">{asset.theme}</p>
                <h3 className="text-xl text-white">{asset.title}</h3>
              </div>
              <a href={asset.url} className="text-sm text-aurora-200 underline">
                Download {asset.format}
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

