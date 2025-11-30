'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, AlertCircle, Loader2, User, Mail, Lock, Building2, MapPin, ChevronRight } from 'lucide-react';
import type { UserRole } from '@/types/models';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        role: 'community' as UserRole,
        organization: '',
        region: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Password mismatch');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await registerUser(
                formData.email,
                formData.password,
                formData.displayName,
                formData.role,
                formData.organization,
                formData.region
            );

            router.push('/workspace');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-midnight flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-aurora-900/40 via-midnight to-midnight" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="glass-panel border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left Side - Hero/Info */}
                    <div className="md:w-1/3 bg-gradient-to-br from-aurora-900/50 to-purple-900/50 p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                        <div>
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                                <Pill className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white font-display mb-2">Join the Network</h2>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Connect with thousands of pharmacists fighting AMR together. Access AI-powered tools and real-time analytics.
                            </p>
                        </div>

                        <div className="space-y-4 mt-12">
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>Professional Profile</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Building2 className="w-4 h-4" />
                                </div>
                                <span>Workspace Access</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span>Regional Analytics</span>
                            </div>
                        </div>

                        <div className="mt-12 pt-6 border-t border-white/10">
                            <p className="text-xs text-white/40">
                                Already have an account?
                            </p>
                            <Link href="/auth/login" className="text-sm font-semibold text-white hover:text-aurora-300 flex items-center gap-2 mt-1 transition-colors group">
                                Sign In instead <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="md:w-2/3 p-8 md:p-10 bg-black/20">
                        <h1 className="text-2xl font-bold text-white font-display mb-6">Create Account</h1>

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <Input
                                            type="text"
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            placeholder="Dr. John Doe"
                                            className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="email@example.com"
                                            className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <Input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Min. 6 chars"
                                            className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Confirm</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <Input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            placeholder="Repeat password"
                                            className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Role</label>
                                    <div className="relative">
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 appearance-none"
                                            required
                                        >
                                            <option value="community" className="bg-midnight">Community Pharmacist</option>
                                            <option value="hospital" className="bg-midnight">Hospital Pharmacist</option>
                                            <option value="regulator" className="bg-midnight">Regulator</option>
                                        </select>
                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Organization</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <Input
                                            type="text"
                                            value={formData.organization}
                                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            placeholder="Pharmacy Name"
                                            className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">Region</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        type="text"
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                        placeholder="City, Province"
                                        className="pl-10 bg-white/5 border-white/10 focus:border-aurora-500/50"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-12 mt-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
