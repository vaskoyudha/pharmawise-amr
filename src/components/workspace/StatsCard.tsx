// src/components/workspace/StatsCard.tsx
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = 'blue'
}: StatsCardProps) {
    const colorMap = {
        blue: {
            bg: 'from-blue-500 to-cyan-500',
            shadow: 'shadow-blue-500/20',
        },
        green: {
            bg: 'from-green-500 to-emerald-500',
            shadow: 'shadow-green-500/20',
        },
        purple: {
            bg: 'from-purple-500 to-pink-500',
            shadow: 'shadow-purple-500/20',
        },
        orange: {
            bg: 'from-orange-500 to-red-500',
            shadow: 'shadow-orange-500/20',
        },
    };

    const colors = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold text-white font-display">
                            {value}
                        </h3>
                        {trend && (
                            <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {trend.isPositive ? '↑' : '↓'} {trend.value}%
                            </span>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-white/40 mt-2">{subtitle}</p>
                    )}
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.shadow} shadow-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
            </div>
        </motion.div>
    );
}
