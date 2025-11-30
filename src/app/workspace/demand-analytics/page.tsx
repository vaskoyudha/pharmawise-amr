import { DemandAnalytics } from '@/components/workspace/DemandAnalytics';

export default function DemandAnalyticsPage() {
    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Analytics</p>
                <h1 className="font-display text-3xl text-white">Demand Analytics</h1>
                <p className="text-white/60">Monitor regional demand patterns and identify high-pressure areas</p>
            </div>

            <DemandAnalytics
                userId="demo-user"
                region="Jakarta Selatan"
            />
        </section>
    );
}
