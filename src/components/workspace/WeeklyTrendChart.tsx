'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyTrendChartProps {
    data: Array<{ week: string; count: number }>;
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
    // Format week label (e.g., "2024-01-15" -> "Jan 15")
    const formattedData = data.map(item => ({
        ...item,
        weekLabel: new Date(item.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    return (
        <div className="glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon" />
                Weekly Prescription Trend
            </h3>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="weekLabel"
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
                            labelStyle={{ color: '#5EFCE8' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#5EFCE8"
                            strokeWidth={3}
                            dot={{ fill: '#5EFCE8', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
