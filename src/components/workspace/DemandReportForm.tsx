'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createDemandReport } from '@/lib/firestore/demandReports';
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    FileWarning,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemandReportFormProps {
    userId: string;
    userRegion: string;
}

const CATEGORIES = [
    { value: 'respiratory', label: 'Respiratory (Batuk, Flu, Bronkitis)', icon: '🫁' },
    { value: 'gastrointestinal', label: 'Gastrointestinal (Diare, Mual)', icon: '🫃' },
    { value: 'uti', label: 'Urinary Tract Infection', icon: '💧' },
    { value: 'skin', label: 'Skin Infections (Jerawat, Luka)', icon: '✨' },
    { value: 'dental', label: 'Dental (Sakit Gigi)', icon: '🦷' },
    { value: 'other', label: 'Lainnya', icon: '📋' },
] as const;

const REFUSAL_REASONS = [
    'Tidak ada indikasi infeksi bakteri',
    'Kemungkinan viral infection',
    'Sudah self-limiting disease',
    'Perlu pemeriksaan dokter lebih dulu',
    'Antibiotik tidak sesuai untuk kondisi',
    'Resiko resistensi lebih besar dari manfaat',
    'Lainnya',
];

const PATIENT_REACTIONS = [
    { value: 'accepted', label: '✅ Accepted - Pasien mengerti & setuju', color: 'green' },
    { value: 'angry', label: '😡 Angry - Pasien kesal/marah', color: 'red' },
    { value: 'confused', label: '😕 Confused - Pasien bingung', color: 'yellow' },
    { value: 'went-elsewhere', label: '🚶 Went Elsewhere - Pergi ke apotek lain', color: 'orange' },
] as const;

export function DemandReportForm({ userId, userRegion }: DemandReportFormProps) {
    const [formData, setFormData] = useState({
        category: '' as any,
        drugRequested: '',
        wasDispensed: false,
        refusalReason: '',
        patientReaction: '' as any,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.category || !formData.drugRequested) {
            setError('Kategori dan nama obat harus diisi');
            return;
        }

        if (!formData.wasDispensed && !formData.refusalReason) {
            setError('Alasan penolakan harus diisi jika obat tidak diberikan');
            return;
        }

        setLoading(true);

        try {
            await createDemandReport(userId, {
                category: formData.category,
                drugRequested: formData.drugRequested,
                wasDispensed: formData.wasDispensed,
                refusalReason: formData.refusalReason,
                patientReaction: formData.patientReaction,
                region: userRegion,
            });

            setSuccess(true);

            // Reset form after 2 seconds
            setTimeout(() => {
                setSuccess(false);
                setFormData({
                    category: '',
                    drugRequested: '',
                    wasDispensed: false,
                    refusalReason: '',
                    patientReaction: '',
                });
            }, 2000);
        } catch (err: any) {
            console.error('Failed to submit report:', err);
            setError(err.message || 'Gagal submit laporan');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <FileWarning className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white font-display">Laporan Permintaan</h2>
                    <p className="text-white/50 text-sm">Laporkan permintaan antibiotik yang tidak tepat</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6 border border-white/10">
                {/* Category Selection */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                        Kategori Penyakit
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, category: cat.value })}
                                className={`p-4 rounded-2xl border transition-all text-left ${formData.category === cat.value
                                        ? 'bg-aurora-500/20 border-aurora-400 shadow-lg shadow-aurora-500/20'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <div className="text-2xl mb-2">{cat.icon}</div>
                                <div className="text-sm font-medium text-white">{cat.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Drug Requested */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                        Nama Antibiotik yang Diminta
                    </label>
                    <input
                        type="text"
                        value={formData.drugRequested}
                        onChange={(e) => setFormData({ ...formData, drugRequested: e.target.value })}
                        placeholder="e.g., Amoxicillin, Ciprofloxacin, Azithromycin"
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40"
                        required
                    />
                </div>

                {/* Was Dispensed */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                        Apakah Antibiotik Diberikan?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, wasDispensed: false })}
                            className={`p-4 rounded-2xl border transition-all ${!formData.wasDispensed
                                    ? 'bg-red-500/20 border-red-400'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="text-2xl mb-1">❌</div>
                            <div className="text-sm font-medium text-white">Tidak Diberikan</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, wasDispensed: true })}
                            className={`p-4 rounded-2xl border transition-all ${formData.wasDispensed
                                    ? 'bg-yellow-500/20 border-yellow-400'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="text-2xl mb-1">⚠️</div>
                            <div className="text-sm font-medium text-white">Terpaksa Diberikan</div>
                        </button>
                    </div>
                </div>

                {/* Refusal Reason (conditional) */}
                {!formData.wasDispensed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                            Alasan Penolakan
                        </label>
                        <select
                            value={formData.refusalReason}
                            onChange={(e) => setFormData({ ...formData, refusalReason: e.target.value })}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-white focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                            required={!formData.wasDispensed}
                        >
                            <option value="" className="bg-midnight">Pilih alasan...</option>
                            {REFUSAL_REASONS.map((reason) => (
                                <option key={reason} value={reason} className="bg-midnight">{reason}</option>
                            ))}
                        </select>
                    </motion.div>
                )}

                {/* Patient Reaction */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                        Reaksi Pasien
                    </label>
                    <div className="grid gap-3">
                        {PATIENT_REACTIONS.map((reaction) => (
                            <button
                                key={reaction.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, patientReaction: reaction.value })}
                                className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${formData.patientReaction === reaction.value
                                        ? 'bg-aurora-500/20 border-aurora-400 shadow-lg shadow-aurora-500/20'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <span className="text-sm font-medium text-white">{reaction.label}</span>
                                {formData.patientReaction === reaction.value && (
                                    <CheckCircle2 className="w-5 h-5 text-aurora-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                        >
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <p className="text-sm text-red-300">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Menyimpan...
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Berhasil Disimpan!
                        </>
                    ) : (
                        <>
                            Submit Laporan
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
