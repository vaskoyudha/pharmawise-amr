'use client';

import { useState } from 'react';
import { CampaignTemplate } from '@/types/campaign';
import { TemplateCard } from './TemplateCard';
import { MOCK_TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/campaign/mockTemplates';
import { Search, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TemplateGalleryProps {
    onSelectTemplate: (template: CampaignTemplate) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
    const [category, setCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [previewTemplate, setPreviewTemplate] = useState<CampaignTemplate | null>(null);

    // Filter templates
    const filteredTemplates = MOCK_TEMPLATES.filter(template => {
        const matchesCategory = category === 'all' || template.category === category;
        const matchesSearch = searchQuery === '' ||
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Template Kampanye AMR</h2>
                <p className="text-white/60">
                    Pilih template dan customize dengan branding apotek Anda
                </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari template..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40"
                    />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-aurora-500/20 text-aurora-300'
                                : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-aurora-500/20 text-aurora-300'
                                : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {TEMPLATE_CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat.value
                                ? 'bg-aurora-500/20 border-aurora-400 text-aurora-300'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            } border`}
                    >
                        {cat.icon && <span className="mr-2">{cat.icon}</span>}
                        {cat.label}
                        <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-white/50">
                Menampilkan {filteredTemplates.length} dari {MOCK_TEMPLATES.length} template
            </div>

            {/* Template Grid */}
            <AnimatePresence mode="wait">
                {filteredTemplates.length > 0 ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={
                            viewMode === 'grid'
                                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'flex flex-col gap-4'
                        }
                    >
                        {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.templateId}
                                template={template}
                                onPreview={setPreviewTemplate}
                                onUse={onSelectTemplate}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-panel p-12 text-center border border-white/10"
                    >
                        <p className="text-white/40">Tidak ada template yang ditemukan</p>
                        <p className="text-white/30 text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal (placeholder) */}
            {previewTemplate && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setPreviewTemplate(null)}
                >
                    <div className="glass-panel max-w-2xl w-full p-6 border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-white mb-4">{previewTemplate.title}</h3>
                        <p className="text-white/60 mb-4">{previewTemplate.description}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setPreviewTemplate(null);
                                    onSelectTemplate(previewTemplate);
                                }}
                                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-aurora-500 to-purple-600 text-white font-medium"
                            >
                                Gunakan Template
                            </button>
                            <button
                                onClick={() => setPreviewTemplate(null)}
                                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
