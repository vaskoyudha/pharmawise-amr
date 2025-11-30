'use client';

import { CampaignTemplate } from '@/types/campaign';
import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TemplateCardProps {
    template: CampaignTemplate;
    onPreview: (template: CampaignTemplate) => void;
    onUse: (template: CampaignTemplate) => void;
}

const CATEGORY_COLORS = {
    'anti-self-med': 'from-red-500 to-orange-500',
    'complete-course': 'from-blue-500 to-cyan-500',
    'not-for-flu': 'from-green-500 to-emerald-500',
    'amr-awareness': 'from-purple-500 to-pink-500',
};

const CATEGORY_LABELS = {
    'anti-self-med': 'Anti Self-Medication',
    'complete-course': 'Habiskan Antibiotik',
    'not-for-flu': 'Bukan untuk Flu',
    'amr-awareness': 'Edukasi AMR',
};

export function TemplateCard({ template, onPreview, onUse }: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel border border-white/10 rounded-2xl overflow-hidden group hover:border-aurora-400/30 transition-all"
        >
            {/* Thumbnail Preview */}
            <div className="relative aspect-square bg-white/5 overflow-hidden">
                {/* Placeholder image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-midnight to-aurora-900">
                    <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_COLORS[template.category]} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white/30 text-sm font-medium">{template.format}</p>
                    </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-midnight/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button
                        onClick={() => onPreview(template)}
                        variant="secondary"
                        className="rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${CATEGORY_COLORS[template.category]}`}>
                        {CATEGORY_LABELS[template.category]}
                    </span>
                </div>

                {/* Download Count */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <Download className="w-3 h-3 text-white/70" />
                    <span className="text-xs text-white/70">{template.downloads}</span>
                </div>
            </div>

            {/* Template Info */}
            <div className="p-4">
                <h3 className="text-white font-semibold mb-1 line-clamp-2">{template.title}</h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{template.description}</p>

                {/* Format & Size Info */}
                <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                    <span>{template.width}x{template.height}px</span>
                    <span className="capitalize">{template.format.replace('-', ' ')}</span>
                </div>

                {/* Action Button */}
                <Button
                    onClick={() => onUse(template)}
                    className="w-full rounded-xl bg-gradient-to-r from-aurora-500 to-purple-600 hover:shadow-aurora-500/40 transition-all"
                >
                    Gunakan Template
                </Button>
            </div>
        </motion.div>
    );
}
