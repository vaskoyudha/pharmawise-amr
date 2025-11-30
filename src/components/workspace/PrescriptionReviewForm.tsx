'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { prescriptionInputSchema } from '@/lib/validation/schemas';
import { scorePrescription } from '@/lib/firebase/functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Info,
    HelpCircle,
    Activity,
    Scale,
    Clock,
    Calendar,
    User,
    Pill,
    Syringe,
    ArrowRight,
    Loader2
} from 'lucide-react';

export function PrescriptionReviewForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(prescriptionInputSchema),
        defaultValues: {
            diagnosis: '',
            antibiotic: 'Amoxicillin',
            doseMg: 500,
            frequency: '3x',
            durationDays: 7,
            route: 'oral' as const,
            patientAge: 35,
        }
    });

    async function onSubmit(data: any) {
        setLoading(true);
        setResult(null);

        try {
            const scoreResult = await scorePrescription(data);
            setResult(scoreResult);
        } catch (error) {
            console.error('Review failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-8 border border-white/10 shadow-xl"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aurora-500 to-purple-600 flex items-center justify-center shadow-lg shadow-aurora-500/20">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white font-display">Prescription Input</h2>
                        <p className="text-white/50 text-sm">Enter clinical details for AI analysis</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Diagnosis */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Diagnosis
                        </label>
                        <Input
                            {...register('diagnosis')}
                            placeholder="e.g. Community Acquired Pneumonia"
                            className="bg-white/5 border-white/10 focus:border-aurora-500/50 h-12"
                        />
                        {errors.diagnosis && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {errors.diagnosis.message as string}
                            </p>
                        )}
                    </div>

                    {/* Antibiotic & Dose */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Pill className="w-3 h-3" /> Antibiotic
                            </label>
                            <div className="relative">
                                <select
                                    {...register('antibiotic')}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                                >
                                    <option value="Amoxicillin" className="bg-midnight">Amoxicillin</option>
                                    <option value="Azithromycin" className="bg-midnight">Azithromycin</option>
                                    <option value="Ciprofloxacin" className="bg-midnight">Ciprofloxacin</option>
                                    <option value="Cephalexin" className="bg-midnight">Cephalexin</option>
                                    <option value="Doxycycline" className="bg-midnight">Doxycycline</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ArrowRight className="w-4 h-4 text-white/20 rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Scale className="w-3 h-3" /> Dose (mg)
                            </label>
                            <Input
                                type="number"
                                {...register('doseMg', { valueAsNumber: true })}
                                placeholder="500"
                                className="bg-white/5 border-white/10 focus:border-aurora-500/50 h-[46px]"
                            />
                        </div>
                    </div>

                    {/* Frequency, Duration, Route */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> Freq
                            </label>
                            <div className="relative">
                                <select
                                    {...register('frequency')}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                                >
                                    <option value="1x" className="bg-midnight">1x</option>
                                    <option value="2x" className="bg-midnight">2x</option>
                                    <option value="3x" className="bg-midnight">3x</option>
                                    <option value="4x" className="bg-midnight">4x</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> Days
                            </label>
                            <Input
                                type="number"
                                {...register('durationDays', { valueAsNumber: true })}
                                placeholder="7"
                                className="bg-white/5 border-white/10 focus:border-aurora-500/50 h-[46px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Syringe className="w-3 h-3" /> Route
                            </label>
                            <div className="relative">
                                <select
                                    {...register('route')}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                                >
                                    <option value="oral" className="bg-midnight">Oral</option>
                                    <option value="IV" className="bg-midnight">IV</option>
                                    <option value="IM" className="bg-midnight">IM</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Patient Age */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                            <User className="w-3 h-3" /> Patient Age (Years)
                        </label>
                        <Input
                            type="number"
                            {...register('patientAge', { valueAsNumber: true })}
                            placeholder="35"
                            className="bg-white/5 border-white/10 focus:border-aurora-500/50 h-12"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-14 text-lg mt-4 shadow-lg shadow-aurora-500/20"
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" /> Review Prescription
                            </>
                        )}
                    </Button>
                </form>
            </motion.div>

            {/* Right: AI Result */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-8 border border-white/10 shadow-xl flex flex-col h-full"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon to-aurora-500 flex items-center justify-center shadow-lg shadow-neon/20">
                        <Sparkles className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white font-display">AI Analysis Result</h2>
                        <p className="text-white/50 text-sm">Real-time clinical decision support</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6 flex-1 flex flex-col"
                        >
                            {/* Score Badge */}
                            <div className={`relative p-8 rounded-3xl text-center overflow-hidden border-2 ${result.riskLevel === 'green' ? 'bg-green-500/10 border-green-500/30' :
                                result.riskLevel === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                                }`}>
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                                <div className={`text-7xl font-bold mb-2 bg-gradient-to-br ${result.riskLevel === 'green' ? 'from-green-400 to-emerald-300' :
                                    result.riskLevel === 'yellow' ? 'from-yellow-400 to-amber-300' :
                                        'from-red-400 to-rose-300'
                                    } bg-clip-text text-transparent font-display`}>
                                    {result.score}
                                </div>
                                <div className="text-sm font-semibold text-white/60 uppercase tracking-widest">Appropriateness Score</div>

                                <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${result.riskLevel === 'green' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' :
                                    result.riskLevel === 'yellow' ? 'bg-yellow-500 text-midnight shadow-lg shadow-yellow-500/20' :
                                        'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                    }`}>
                                    {result.riskLevel === 'green' ? <CheckCircle2 className="w-4 h-4" /> :
                                        result.riskLevel === 'yellow' ? <AlertTriangle className="w-4 h-4" /> :
                                            <XCircle className="w-4 h-4" />}
                                    {result.riskLevel === 'green' ? 'APPROPRIATE' :
                                        result.riskLevel === 'yellow' ? 'CAUTION' :
                                            'HIGH RISK'}
                                </div>
                            </div>

                            {/* Explainability */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-aurora-200">
                                    <Info className="w-4 h-4" /> Clinical Reasoning
                                </h3>
                                <div className="space-y-2">
                                    {result.explainability.map((item: any, i: number) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className={`mt-0.5 p-1 rounded-lg ${item.severity === 'danger' ? 'bg-red-500/20 text-red-300' :
                                                item.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                                                    'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                {item.severity === 'danger' ? <XCircle className="w-3 h-3" /> :
                                                    item.severity === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                                                        <Info className="w-3 h-3" />}
                                            </div>
                                            <span className="text-sm text-white/80 leading-relaxed">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-aurora-200">
                                    <Sparkles className="w-4 h-4" /> Recommendations
                                </h3>
                                <div className="space-y-2">
                                    {result.suggestions.map((suggestion: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-white/70 p-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neon mt-1.5 flex-shrink-0" />
                                            <span>{suggestion}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1" />

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                                <Button variant="primary" className="bg-green-600 hover:bg-green-500 border-none">
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                                </Button>
                                <Button variant="secondary" className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10">
                                    <HelpCircle className="w-4 h-4 mr-2" /> Clarify
                                </Button>
                                <Button variant="ghost" className="text-red-300 hover:bg-red-500/10 hover:text-red-200">
                                    <XCircle className="w-4 h-4 mr-2" /> Reject
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full text-white/30 py-12"
                        >
                            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                                <FileText className="w-12 h-12 opacity-50" />
                            </div>
                            <p className="text-center font-medium text-lg">
                                Waiting for prescription data...
                            </p>
                            <p className="text-center text-sm text-white/20 mt-2">
                                Fill out the form to generate AI analysis
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
