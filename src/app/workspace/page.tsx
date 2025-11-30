import { Dashboard } from '@/components/workspace/Dashboard';

export default function WorkspaceDashboard() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Analytics</p>
        <h1 className="font-display text-3xl text-white">Dashboard</h1>
        <p className="text-white/60">Monitor your antibiotic prescription patterns and performance metrics</p>
      </div>

      <Dashboard userId="demo-user" />
    </section>
  );
}

