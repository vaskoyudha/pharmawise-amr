import { DemandReportForm } from '@/components/workspace/DemandReportForm';

export default function DemandReportingPage() {
    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul C</p>
                <h1 className="font-display text-3xl text-white">Demand Reporting</h1>
                <p className="text-white/60">Laporkan permintaan antibiotik yang tidak tepat untuk membantu memantau pola demand regional</p>
            </div>

            <DemandReportForm
                userId="demo-user"
                userRegion="Jakarta Selatan"
            />

            {/* Info Panel */}
            <div className="glass-panel p-6 border border-white/10">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                    Kenapa Laporan Ini Penting?
                </h3>
                <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-start gap-2">
                        <span className="text-aurora-400 mt-0.5">•</span>
                        <span>Membantu identifikasi area dengan tekanan demand tinggi</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-aurora-400 mt-0.5">•</span>
                        <span>Memberikan data untuk campaign edukasi publik yang lebih targeted</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-aurora-400 mt-0.5">•</span>
                        <span>Mendukung kebijakan pengendalian AMR di tingkat regional</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-aurora-400 mt-0.5">•</span>
                        <span>Data anonim dan hanya digunakan untuk analisis aggregate</span>
                    </li>
                </ul>
            </div>
        </section>
    );
}
