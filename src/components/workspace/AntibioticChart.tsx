'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AntibioticChartProps {
    data: Array<{ name: string; count: number }>;
}

const COLORS = ['#5EFCE8', '#A78BFA', '#F472B6', '#FB923C', '#34D399'];

export function AntibioticChart({ data }: AntibioticChartProps) {
    // Transform data for recharts
    const chartData = data.map((item, index) => ({
        name: item.name,
        value: item.count,
        color: COLORS[index % COLORS.length],
    }));

    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aurora-400" />
                Antibiotic Distribution
            </h3>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${((entry.value / total) * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
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

            {/* Stats List */}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-white/70">{item.name}</span>
                        </div>
                        <span className="font-semibold text-white">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
