'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { saveCounseling } from '@/lib/firestore/counseling';
import {
    Sparkles,
    Copy,
    Download,
    Loader2,
    FileText,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

interface Props {
    prescriptionId: string;
    prescriptionData: {
        diagnosis: string;
        antibiotic: string;
        doseMg: number;
        frequency: string;
        durationDays: number;
    };
    userId: string;
}

export function CounselingGenerator({ prescriptionId, prescriptionData, userId }: Props) {
    const [format, setFormat] = useState<'short' | 'standard' | 'whatsapp'>('standard');
    const [language, setLanguage] = useState<'id' | 'en'>('id');
    const [literacyLevel, setLiteracyLevel] = useState<'basic' | 'standard' | 'advanced'>('basic');
    const [script, setScript] = useState('');
    const [keyPoints, setKeyPoints] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    async function handleGenerate() {
        setLoading(true);
        try {
            // Call API route instead of Gemini directly
            const response = await fetch('/api/counseling/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...prescriptionData,
                    format,
                    language,
                    literacyLevel,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || 'Failed to generate script');
            }

            const result = await response.json();

            setScript(result.script);
            setKeyPoints(result.keyPoints);

            // Save to Firestore
            await saveCounseling({
                prescriptionId,
                userId,
                format,
                language,
                literacyLevel,
                scriptText: result.script,
                keyPoints: result.keyPoints,
                wasEdited: false,
            });
        } catch (error: any) {
            console.error('Failed to generate:', error);
            alert(error.message || 'Gagal men-generate script. Pastikan API key sudah diset.');
        } finally {
            setLoading(false);
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleDownloadPDF() {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text('Skrip Konseling Pasien', 20, 20);

        // Prescription Info
        doc.setFontSize(10);
        doc.text(`Antibiotik: ${prescriptionData.antibiotic} ${prescriptionData.doseMg}mg`, 20, 35);
        doc.text(`Diagnosis: ${prescriptionData.diagnosis}`, 20, 42);
        doc.text(`Durasi: ${prescriptionData.durationDays} hari (${prescriptionData.frequency})`, 20, 49);

        // Script Content
        doc.setFontSize(11);
        const splitText = doc.splitTextToSize(script, 170);
        doc.text(splitText, 20, 65);

        // Save
        doc.save(`counseling-script-${prescriptionId}.pdf`);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon to-aurora-500 flex items-center justify-center shadow-lg shadow-neon/20">
                    <FileText className="w-6 h-6 text-midnight" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white font-display">Counseling Script Generator</h2>
                    <p className="text-white/50 text-sm">AI-powered patient counseling assistant</p>
                </div>
            </div>

            {/* Settings Grid */}
            <div className="glass-panel p-6">
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                            Format Script
                        </label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value as any)}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                        >
                            <option value="short" className="bg-midnight">Ringkas (20 detik)</option>
                            <option value="standard" className="bg-midnight">Standard (60 detik)</option>
                            <option value="whatsapp" className="bg-midnight">WhatsApp Format</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                            Bahasa
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                        >
                            <option value="id" className="bg-midnight">Bahasa Indonesia</option>
                            <option value="en" className="bg-midnight">English</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                            Tingkat Literasi
                        </label>
                        <select
                            value={literacyLevel}
                            onChange={(e) => setLiteracyLevel(e.target.value as any)}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                        >
                            <option value="basic" className="bg-midnight">Dasar (Sederhana)</option>
                            <option value="standard" className="bg-midnight">Standar</option>
                            <option value="advanced" className="bg-midnight">Lanjutan</option>
                        </select>
                    </div>
                </div>

                {/* Generate Button */}
                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full mt-6 h-14 bg-gradient-to-r from-aurora-500 to-purple-600 text-white shadow-lg shadow-aurora-500/20 hover:shadow-aurora-500/40 transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Generating with Gemini AI...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate Counseling Script
                        </>
                    )}
                </Button>
            </div>

            {/* Script Output */}
            <AnimatePresence>
                {script && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel p-6 space-y-5"
                    >
                        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-aurora-200">
                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Generated Script
                        </h3>

                        {/* Editable Textarea */}
                        <Textarea
                            value={script}
                            onChange={(e) => setScript(e.target.value)}
                            rows={14}
                            className="bg-white/5 border-white/10 text-white leading-relaxed font-sans"
                            placeholder="Your counseling script will appear here..."
                        />

                        {/* Key Points */}
                        {keyPoints.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Key Points:</h4>
                                <div className="grid gap-2">
                                    {keyPoints.map((point, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm text-white/80 leading-relaxed">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                            <Button
                                variant="secondary"
                                onClick={handleCopy}
                                className="bg-white/10 hover:bg-white/20"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy to Clipboard
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleDownloadPDF}
                                className="bg-white/10 hover:bg-white/20"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
