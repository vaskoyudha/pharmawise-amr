'use client';

import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/workspace/StatsCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getDemandStatsByRegion, getUserDemandReports } from '@/lib/firestore/demandReports';
import {
    TrendingUp,
    AlertTriangle,
    Users,
    Target,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DemandAnalyticsProps {
    userId: string;
    region: string;
}

const COLORS = ['#5EFCE8', '#A78BFA', '#F472B6', '#FB923C', '#34D399', '#60A5FA'];
const CATEGORY_LABELS: Record<string, string> = {
    respiratory: 'Respiratory',
    gastrointestinal: 'Gastrointestinal',
    uti: 'UTI',
    skin: 'Skin',
    dental: 'Dental',
    other: 'Lainnya',
};

export function DemandAnalytics({ userId, region }: DemandAnalyticsProps) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [recentReports, setRecentReports] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Get regional stats
                const regionalStats = await getDemandStatsByRegion(region);

                // Get user's recent reports
                const reports = await getUserDemandReports(userId, 5);

                setStats(regionalStats);
                setRecentReports(reports);
            } catch (error) {
                console.error('Failed to fetch demand analytics:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId, region]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 text-aurora-400 animate-spin" />
            </div>
        );
    }

    if (!stats || stats.total === 0) {
        return (
            <div className="glass-panel p-12 text-center border border-white/10">
                <p className="text-white/50">Belum ada data demand untuk region ini.</p>
                <p className="text-white/30 text-sm mt-2">Mulai submit laporan untuk melihat analytics!</p>
            </div>
        );
    }

    // Calculate metrics
    const refusalRate = stats.total > 0
        ? Math.round((stats.refusedCount / stats.total) * 100)
        : 0;

    const demandIndex = Math.min(100, Math.round((stats.total / 50) * 100)); // Simple formula

    // Prepare chart data
    const categoryData = Object.entries(stats.byCategory).map(([key, value]) => ({
        name: CATEGORY_LABELS[key] || key,
        value: value as number,
    }));

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Reports"
                    value={stats.total}
                    subtitle={`Region: ${region}`}
                    icon={Target}
                    color="blue"
                />

                <StatsCard
                    title="Refusal Rate"
                    value={`${refusalRate}%`}
                    subtitle="Tidak diberikan"
                    icon={AlertTriangle}
                    color="orange"
                />

                <StatsCard
                    title="Demand Index"
                    value={demandIndex}
                    subtitle="0-100 scale"
                    icon={TrendingUp}
                    color={demandIndex > 50 ? 'orange' : 'green'}
                />

                <StatsCard
                    title="My Reports"
                    value={recentReports.length}
                    subtitle="Last 5 submissions"
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Category Distribution Pie Chart */}
                <div className="glass-panel p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-aurora-400" />
                        Category Distribution
                    </h3>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ${entry.value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(7, 11, 22, 0.95)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#fff'
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => <span className="text-white/70 text-sm">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Dispensed vs Refused Bar Chart */}
                <div className="glass-panel p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neon" />
                        Dispensed vs Refused
                    </h3>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { name: 'Diberikan', value: stats.dispensedCount, fill: '#FB923C' },
                                    { name: 'Ditolak', value: stats.refusedCount, fill: '#34D399' },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(7, 11, 22, 0.95)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar dataKey="value" fill="#5EFCE8" radius={[12, 12, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Reports Table */}
            {recentReports.length > 0 && (
                <div className="glass-panel p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Recent Reports
                    </h3>

                    <div className="space-y-3">
                        {recentReports.map((report, index) => (
                            <motion.div
                                key={report.reportId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-aurora-500/20 flex items-center justify-center">
                                        <span className="text-sm font-bold text-aurora-300">{CATEGORY_LABELS[report.category]?.[0]}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{report.drugRequested}</p>
                                        <p className="text-xs text-white/50">
                                            {CATEGORY_LABELS[report.category]} • {new Date(report.createdAt.toDate()).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${report.wasDispensed
                                            ? 'bg-yellow-500/20 text-yellow-300'
                                            : 'bg-green-500/20 text-green-300'
                                        }`}>
                                        {report.wasDispensed ? 'Diberikan' : 'Ditolak'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
