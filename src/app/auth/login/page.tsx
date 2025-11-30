'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, AlertCircle, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            router.push('/workspace');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-midnight flex items-center justify-center p-4 relative overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-aurora-900/40 via-midnight to-midnight" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-aurora-500/10 rounded-[100%] blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass-panel p-8 md:p-10 border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl rounded-3xl">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora-500 to-purple-600 shadow-lg shadow-aurora-500/20 mb-6 group"
                        >
                            <Pill className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-white font-display tracking-tight mb-2">
                            PharmaWise<span className="text-aurora-400">AMR</span>
                        </h1>
                        <p className="text-white/50 text-sm">
                            Advanced Antimicrobial Stewardship Platform
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-aurora-400 transition-colors" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="pharmacist@hospital.com"
                                    className="pl-12 bg-white/5 border-white/10 focus:border-aurora-500/50 focus:bg-white/10 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-semibold text-aurora-200 uppercase tracking-wider">
                                    Password
                                </label>
                                <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-aurora-400 transition-colors" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-12 bg-white/5 border-white/10 focus:border-aurora-500/50 focus:bg-white/10 transition-all duration-300"
                                    required
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
                            className="w-full h-12 text-base shadow-lg shadow-aurora-500/20 hover:shadow-aurora-500/40 transition-all duration-300 mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In to Workspace
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-white/40">
                            Don't have an account?{' '}
                            <Link href="/auth/register" className="text-aurora-400 hover:text-aurora-300 font-semibold transition-colors">
                                Register Now
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Demo Credentials
                        </div>
                        <code className="text-xs text-aurora-200 font-mono block space-y-1">
                            <div className="flex justify-between">
                                <span className="text-white/40">Email:</span>
                                <span>demo@pharmacist.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40">Password:</span>
                                <span>demo123456</span>
                            </div>
                        </code>
                    </div>
                </div>

                <p className="text-center text-white/20 text-xs mt-8">
                    © 2024 PharmaWise-AMR. Secure End-to-End Encryption.
                </p>
            </motion.div>
        </div>
    );
}
