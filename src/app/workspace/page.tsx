import { AlertsFeed } from "@/components/workspace/AlertsFeed";
import { DashboardCards } from "@/components/workspace/DashboardCards";
import { DemandChart } from "@/components/workspace/DemandChart";
import { LearningTimeline } from "@/components/workspace/LearningTimeline";

export default function WorkspaceDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <DashboardCards />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DemandChart />
        </div>
        <LearningTimeline />
      </div>
      <AlertsFeed />
    </section>
  );
}

