'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { CampaignTemplate, ExportOptions } from '@/types/campaign';
import { Button } from '@/components/ui/button';
import { exportTemplate } from '@/lib/campaign/exportUtils';
import {
    Download,
    Type,
    Palette,
    Undo,
    Redo,
    X,
    Loader2
} from 'lucide-react';

interface TemplateEditorProps {
    template: CampaignTemplate;
    onClose: () => void;
    userId?: string;
}

export function TemplateEditor({ template, onClose, userId = 'demo-user' }: TemplateEditorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [loading, setLoading] = useState(true);

    // Editable fields
    const [pharmacyName, setPharmacyName] = useState('Apotek Sehat');
    const [address, setAddress] = useState('Jl. Contoh No. 123, Jakarta');
    const [phone, setPhone] = useState('(021) 1234-5678');
    const [brandColor, setBrandColor] = useState('#5EFCE8');

    // Initialize canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: Math.min(template.width, 800),
            height: Math.min(template.height, 800 * (template.height / template.width)),
            backgroundColor: '#1a1a2e',
        });

        // Load base image (placeholder for now)
        const rect = new fabric.Rect({
            left: 0,
            top: 0,
            fill: '#2a2a4e',
            width: fabricCanvas.width!,
            height: fabricCanvas.height!,
            selectable: false,
        });
        fabricCanvas.add(rect);

        // Add sample text elements
        const zones = template.editableZones;

        if (zones.pharmacyName) {
            const text = new fabric.Text(pharmacyName, {
                left: (zones.pharmacyName.x / template.width) * fabricCanvas.width!,
                top: (zones.pharmacyName.y / template.height) * fabricCanvas.height!,
                fontSize: (zones.pharmacyName.fontSize! / template.width) * fabricCanvas.width!,
                fill: zones.pharmacyName.color || '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: 'bold',
            });
            fabricCanvas.add(text);
        }

        if (zones.address) {
            const text = new fabric.Text(address, {
                left: (zones.address.x / template.width) * fabricCanvas.width!,
                top: (zones.address.y / template.height) * fabricCanvas.height!,
                fontSize: (zones.address.fontSize! / template.width) * fabricCanvas.width!,
                fill: zones.address.color || '#CCCCCC',
                fontFamily: 'Inter',
            });
            fabricCanvas.add(text);
        }

        if (zones.phone) {
            const text = new fabric.Text(phone, {
                left: (zones.phone.x / template.width) * fabricCanvas.width!,
                top: (zones.phone.y / template.height) * fabricCanvas.height!,
                fontSize: (zones.phone.fontSize! / template.width) * fabricCanvas.width!,
                fill: zones.phone.color || brandColor,
                fontFamily: 'Inter',
            });
            fabricCanvas.add(text);
        }

        setCanvas(fabricCanvas);
        setLoading(false);

        return () => {
            fabricCanvas.dispose();
        };
    }, [template]);

    // Update text when inputs change
    useEffect(() => {
        if (!canvas) return;

        const objects = canvas.getObjects();
        objects.forEach((obj: any, index) => {
            if (obj.type === 'text') {
                if (index === 1) obj.set('text', pharmacyName);
                if (index === 2) obj.set('text', address);
                if (index === 3) obj.set('text', phone);
            }
        });

        canvas.renderAll();
    }, [pharmacyName, address, phone, canvas]);

    const handleExport = async (format: 'png' | 'jpg' | 'pdf', quality: 'web' | 'print') => {
        if (!canvas) return;

        const options: ExportOptions = { format, quality };

        try {
            await exportTemplate(canvas, template.title, options);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export gagal. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-auto p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{template.title}</h2>
                        <p className="text-white/60 text-sm">{template.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-[300px_1fr] gap-6">
                    {/* Left Panel: Controls */}
                    <div className="space-y-4">
                        {/* Pharmacy Name */}
                        <div className="glass-panel p-4 border border-white/10">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                                <Type className="w-4 h-4 inline mr-1" />
                                Nama Apotek
                            </label>
                            <input
                                type="text"
                                value={pharmacyName}
                                onChange={(e) => setPharmacyName(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none"
                                placeholder="Nama Apotek"
                            />
                        </div>

                        {/* Address */}
                        <div className="glass-panel p-4 border border-white/10">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                                Alamat
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none resize-none"
                                placeholder="Alamat apotek"
                            />
                        </div>

                        {/* Phone */}
                        <div className="glass-panel p-4 border border-white/10">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                                Telepon/WhatsApp
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none"
                                placeholder="(021) 1234-5678"
                            />
                        </div>

                        {/* Brand Color */}
                        <div className="glass-panel p-4 border border-white/10">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                                <Palette className="w-4 h-4 inline mr-1" />
                                Warna Brand
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={brandColor}
                                    onChange={(e) => setBrandColor(e.target.value)}
                                    className="w-12 h-12 rounded-lg cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={brandColor}
                                    onChange={(e) => setBrandColor(e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                                />
                            </div>
                        </div>

                        {/* Export Actions */}
                        <div className="glass-panel p-4 border border-white/10 space-y-2">
                            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                                <Download className="w-4 h-4 inline mr-1" />
                                Export
                            </p>

                            <Button
                                onClick={() => handleExport('png', 'web')}
                                className="w-full bg-gradient-to-r from-aurora-500 to-cyan-600"
                            >
                                PNG (Web)
                            </Button>

                            <Button
                                onClick={() => handleExport('png', 'print')}
                                variant="secondary"
                                className="w-full"
                            >
                                PNG (Print Quality)
                            </Button>

                            <Button
                                onClick={() => handleExport('jpg', 'web')}
                                variant="secondary"
                                className="w-full"
                            >
                                JPG
                            </Button>

                            <Button
                                onClick={() => handleExport('pdf', 'print')}
                                variant="secondary"
                                className="w-full"
                            >
                                PDF
                            </Button>
                        </div>
                    </div>

                    {/* Right Panel: Canvas Preview */}
                    <div className="glass-panel p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-white/70">Preview</p>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all">
                                    <Undo className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all">
                                    <Redo className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center h-96">
                                <Loader2 className="w-8 h-8 text-aurora-400 animate-spin" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <canvas ref={canvasRef} className="border border-white/10 rounded-lg shadow-2xl" />
                            </div>
                        )}

                        <p className="text-xs text-white/40 mt-4 text-center">
                            {template.width} x {template.height}px • {template.format.replace('-', ' ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
