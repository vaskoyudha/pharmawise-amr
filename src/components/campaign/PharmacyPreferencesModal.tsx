'use client';

import { useState } from 'react';
import { PharmacyPreferences, savePharmacyPreferences } from '@/lib/firestore/campaignPreferences';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, X } from 'lucide-react';

interface PreferencesModalProps {
    currentPreferences: PharmacyPreferences | null;
    userId: string;
    onSave: (preferences: PharmacyPreferences) => void;
    onClose: () => void;
}

export function PharmacyPreferencesModal({
    currentPreferences,
    userId,
    onSave,
    onClose,
}: PreferencesModalProps) {
    const [pharmacyName, setPharmacyName] = useState(currentPreferences?.pharmacyName || 'Apotek Sehat');
    const [address, setAddress] = useState(currentPreferences?.address || 'Jl. Contoh No. 123, Jakarta');
    const [phone, setPhone] = useState(currentPreferences?.phone || '(021) 1234-5678');
    const [brandColor, setBrandColor] = useState(currentPreferences?.brandColor || '#5EFCE8');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);

        try {
            const preferences: Omit<PharmacyPreferences, 'lastUpdated'> = {
                userId,
                pharmacyName,
                address,
                phone,
                brandColor,
            };

            await savePharmacyPreferences(preferences);

            onSave({
                ...preferences,
                lastUpdated: new Date() as any,
            });

            onClose();
        } catch (error) {
            console.error('Failed to save preferences:', error);
            alert('Gagal menyimpan preferensi. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-panel max-w-md w-full p-6 border border-white/10 rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Preferensi Apotek</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                            Nama Apotek
                        </label>
                        <Input
                            value={pharmacyName}
                            onChange={(e) => setPharmacyName(e.target.value)}
                            placeholder="Apotek Sehat"
                            className="bg-white/5 border-white/10 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                            Alamat
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={2}
                            placeholder="Jl. Contoh No. 123, Jakarta"
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                            Telepon/WhatsApp
                        </label>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(021) 1234-5678"
                            className="bg-white/5 border-white/10 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                            Warna Brand
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer"
                            />
                            <Input
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="flex-1 bg-white/5 border-white/10 text-white font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 bg-gradient-to-r from-aurora-500 to-cyan-600"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Menyimpan...' : 'Simpan Preferensi'}
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="secondary"
                        className="px-4"
                    >
                        Batal
                    </Button>
                </div>

                <p className="text-xs text-white/40 mt-4 text-center">
                    Preferensi ini akan otomatis digunakan untuk semua template
                </p>
            </div>
        </div>
    );
}
