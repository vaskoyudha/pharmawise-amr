'use client';

import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/workspace/StatsCard';
import { AntibioticChart } from '@/components/workspace/AntibioticChart';
import { WeeklyTrendChart } from '@/components/workspace/WeeklyTrendChart';
import { getAnalytics, calculateStats } from '@/lib/firestore/analytics';
import {
    Activity,
    TrendingUp,
    AlertTriangle,
    FileText,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getAnalytics(userId, 30);
                const calculatedStats = calculateStats(data);
                setStats(calculatedStats);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            fetchData();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 text-aurora-400 animate-spin" />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="glass-panel p-12 text-center">
                <p className="text-white/50">No data available yet. Start reviewing prescriptions!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Prescriptions"
                    value={stats.totalPrescriptions}
                    subtitle="Last 30 days"
                    icon={Activity}
                    color="blue"
                />

                <StatsCard
                    title="Avg Appropriateness"
                    value={`${stats.avgScore}/100`}
                    subtitle="Quality score"
                    icon={TrendingUp}
                    color="green"
                />

                <StatsCard
                    title="High Risk"
                    value={stats.highRiskCount}
                    subtitle="Require attention"
                    icon={AlertTriangle}
                    color="orange"
                />

                <StatsCard
                    title="Counseling Scripts"
                    value={stats.counselingCount}
                    subtitle="Generated"
                    icon={FileText}
                    color="purple"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                <AntibioticChart data={stats.antibioticDistribution} />
                <WeeklyTrendChart data={stats.weeklyData} />
            </div>

            {/* Recent Activity - Optional for future */}
            {/* <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        ... activity list ...
      </div> */}
        </div>
    );
}
